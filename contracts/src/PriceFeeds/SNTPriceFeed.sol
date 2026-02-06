// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "./MainnetPriceFeedBase.sol";

/**
 * @title SNTPriceFeed
 * @notice Price feed for Status Network Token (SNT)
 * @dev Uses a single SNT-USD oracle
 */
contract SNTPriceFeed is MainnetPriceFeedBase {
    // TODO: Set the actual SNT-USD oracle address on deployment
    // address constant SNT_USD_ORACLE = address(0);

    constructor(
        address _sntUsdOracleAddress,
        uint256 _sntUsdStalenessThreshold,
        address _borrowerOperationsAddress
    )
        MainnetPriceFeedBase(_sntUsdOracleAddress, _sntUsdStalenessThreshold, _borrowerOperationsAddress)
    {
        _fetchPricePrimary();

        // Check the oracle didn't already fail
        assert(priceSource == PriceSource.primary);
    }

    function fetchPrice() public returns (uint256, bool) {
        // If branch is live and the primary oracle setup has been working, try to use it
        if (priceSource == PriceSource.primary) return _fetchPricePrimary();

        // Otherwise if branch is shut down and already using the lastGoodPrice, continue with it
        assert(priceSource == PriceSource.lastGoodPrice);
        return (lastGoodPrice, false);
    }

    function fetchRedemptionPrice() external returns (uint256, bool) {
        // Use same price for redemption as all other ops
        return fetchPrice();
    }

    function _fetchPricePrimary() internal returns (uint256, bool) {
        assert(priceSource == PriceSource.primary);
        (uint256 sntUsdPrice, bool sntUsdOracleDown) = _getOracleAnswer(ethUsdOracle);

        // If the SNT-USD oracle response was invalid, return the last good price
        if (sntUsdOracleDown) return (_shutDownAndSwitchToLastGoodPrice(address(ethUsdOracle.aggregator)), true);

        lastGoodPrice = sntUsdPrice;
        return (sntUsdPrice, false);
    }
}
