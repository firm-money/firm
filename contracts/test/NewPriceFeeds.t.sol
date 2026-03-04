// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "forge-std/Test.sol";
import "../src/PriceFeeds/SNTPriceFeed.sol";
import "../src/PriceFeeds/LINEAPriceFeed.sol";
import "../src/PriceFeeds/SGUSDPriceFeed.sol";
import "../src/PriceFeeds/MainnetPriceFeedBase.sol";
import "../src/Dependencies/AggregatorV3Interface.sol";

/**
 * @title MockAggregator
 * @notice Mock Chainlink aggregator for testing
 */
contract MockAggregator is AggregatorV3Interface {
    int256 private _price;
    uint8 private _decimals;
    uint256 private _updatedAt;

    constructor(int256 initialPrice, uint8 decimals_) {
        _price = initialPrice;
        _decimals = decimals_;
        _updatedAt = block.timestamp;
    }

    function setPrice(int256 newPrice) external {
        _price = newPrice;
        _updatedAt = block.timestamp;
    }

    function setStale() external {
        _updatedAt = 1; // Set to very old timestamp to make stale
    }

    function decimals() external view override returns (uint8) {
        return _decimals;
    }

    function latestRoundData()
        external
        view
        override
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        )
    {
        return (1, _price, block.timestamp, _updatedAt, 1);
    }
}

/**
 * @title MockBorrowerOperations
 * @notice Mock for BorrowerOperations to test shutdown
 */
contract MockBorrowerOperations {
    bool public isShutdown;

    function shutdownFromOracleFailure() external {
        isShutdown = true;
    }
}

/**
 * @title SNTPriceFeedTest
 * @notice Tests for SNT price feed
 */
contract SNTPriceFeedTest is Test {
    SNTPriceFeed priceFeed;
    MockAggregator mockOracle;
    MockBorrowerOperations mockBorrowerOps;

    int256 constant INITIAL_PRICE = 0.05e8; // $0.05 with 8 decimals
    uint256 constant STALENESS_THRESHOLD = 25 hours;

    function setUp() public {
        mockOracle = new MockAggregator(INITIAL_PRICE, 8);
        mockBorrowerOps = new MockBorrowerOperations();
        
        priceFeed = new SNTPriceFeed(
            address(mockOracle),
            STALENESS_THRESHOLD,
            address(mockBorrowerOps)
        );
    }

    function test_InitialPrice() public {
        (uint256 price, bool oracleFailure) = priceFeed.fetchPrice();
        
        assertEq(price, 0.05e18); // Scaled to 18 decimals
        assertFalse(oracleFailure);
    }

    function test_PriceUpdate() public {
        // Update price to $0.10
        mockOracle.setPrice(0.10e8);
        
        (uint256 price, bool oracleFailure) = priceFeed.fetchPrice();
        
        assertEq(price, 0.10e18);
        assertFalse(oracleFailure);
    }

    function test_StaleOracleTriggersShutdown() public {
        // Warp to a reasonable time
        vm.warp(100 hours);
        
        // Make oracle stale
        mockOracle.setStale();
        
        (uint256 price, bool oracleFailure) = priceFeed.fetchPrice();
        
        // Should return last good price and signal failure
        assertTrue(oracleFailure);
        assertTrue(mockBorrowerOps.isShutdown());
    }
}

/**
 * @title LINEAPriceFeedTest
 * @notice Tests for LINEA price feed
 */
contract LINEAPriceFeedTest is Test {
    LINEAPriceFeed priceFeed;
    MockAggregator mockOracle;
    MockBorrowerOperations mockBorrowerOps;

    int256 constant INITIAL_PRICE = 1e8; // $1.00 with 8 decimals
    uint256 constant STALENESS_THRESHOLD = 25 hours;

    function setUp() public {
        mockOracle = new MockAggregator(INITIAL_PRICE, 8);
        mockBorrowerOps = new MockBorrowerOperations();
        
        priceFeed = new LINEAPriceFeed(
            address(mockOracle),
            STALENESS_THRESHOLD,
            address(mockBorrowerOps)
        );
    }

    function test_InitialPrice() public {
        (uint256 price, bool oracleFailure) = priceFeed.fetchPrice();
        
        assertEq(price, 1e18); // Scaled to 18 decimals
        assertFalse(oracleFailure);
    }

    function test_RedemptionPriceSameAsNormal() public {
        (uint256 normalPrice,) = priceFeed.fetchPrice();
        (uint256 redemptionPrice,) = priceFeed.fetchRedemptionPrice();
        
        assertEq(normalPrice, redemptionPrice);
    }
}

/**
 * @title SGUSDPriceFeedTest
 * @notice Tests for sGUSD price feed (stablecoin)
 */
contract SGUSDPriceFeedTest is Test {
    SGUSDPriceFeed priceFeed;
    MockAggregator mockOracle;
    MockBorrowerOperations mockBorrowerOps;

    int256 constant INITIAL_PRICE = 1e8; // $1.00 - stablecoin
    uint256 constant STALENESS_THRESHOLD = 25 hours;

    function setUp() public {
        mockOracle = new MockAggregator(INITIAL_PRICE, 8);
        mockBorrowerOps = new MockBorrowerOperations();
        
        priceFeed = new SGUSDPriceFeed(
            address(mockOracle),
            STALENESS_THRESHOLD,
            address(mockBorrowerOps)
        );
    }

    function test_StablecoinPrice() public {
        (uint256 price, bool oracleFailure) = priceFeed.fetchPrice();
        
        // sGUSD should be ~$1
        assertEq(price, 1e18);
        assertFalse(oracleFailure);
    }

    function test_LastGoodPriceUpdates() public {
        // Initial fetch
        priceFeed.fetchPrice();
        assertEq(priceFeed.lastGoodPrice(), 1e18);
        
        // Update price
        mockOracle.setPrice(1.01e8); // Small depeg
        priceFeed.fetchPrice();
        assertEq(priceFeed.lastGoodPrice(), 1.01e18);
    }

    function test_ZeroPriceTriggersShutdown() public {
        // Set price to 0 (invalid)
        mockOracle.setPrice(0);
        
        (uint256 price, bool oracleFailure) = priceFeed.fetchPrice();
        
        assertTrue(oracleFailure);
        assertTrue(mockBorrowerOps.isShutdown());
        // Should return last good price
        assertEq(price, 1e18);
    }

    function test_NegativePriceTriggersShutdown() public {
        // Set negative price (invalid)
        mockOracle.setPrice(-1e8);
        
        (uint256 price, bool oracleFailure) = priceFeed.fetchPrice();
        
        assertTrue(oracleFailure);
        assertTrue(mockBorrowerOps.isShutdown());
    }
}
