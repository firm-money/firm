// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "./MainnetPriceFeedBase.sol";

/**
 * @title SGUSDPriceFeed
 * @notice Price feed for sGUSD (staked GUSD)
 * @dev Uses a single sGUSD-USD oracle. sGUSD is expected to track $1 closely.
 */
contract SGUSDPriceFeed is MainnetPriceFeedBase {
    // TODO: Set the actual sGUSD-USD oracle address on deployment
    // address constant SGUSD_USD_ORACLE = address(0);
    
    // sGUSD is a stablecoin, expected to be ~$1
    // May use a fixed price or GUSD oracle as fallback

    constructor(
        address _sgusdUsdOracleAddress,
        uint256 _sgusdUsdStalenessThreshold,
        address _borrowerOperationsAddress,
        address _governor
    ) MainnetPriceFeedBase(_sgusdUsdOracleAddress, _sgusdUsdStalenessThreshold, _borrowerOperationsAddress, _governor)
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
        (uint256 sgusdUsdPrice, bool sgusdUsdOracleDown) = _getOracleAnswer(ethUsdOracle);

        // If the sGUSD-USD oracle response was invalid, return the last good price
        if (sgusdUsdOracleDown) return (_shutDownAndSwitchToLastGoodPrice(address(ethUsdOracle.aggregator)), true);

        lastGoodPrice = sgusdUsdPrice;
        return (sgusdUsdPrice, false);
    }
}
