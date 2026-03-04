// SPDX-License-Identifier: MIT

pragma solidity 0.8.24;

import "./MainnetPriceFeedBase.sol";

/**
 * @title LINEAPriceFeed
 * @notice Price feed for LINEA token
 * @dev Uses a single LINEA-USD oracle
 */
contract LINEAPriceFeed is MainnetPriceFeedBase {
    // TODO: Set the actual LINEA-USD oracle address on deployment
    // address constant LINEA_USD_ORACLE = address(0);

    constructor(
        address _lineaUsdOracleAddress,
        uint256 _lineaUsdStalenessThreshold,
        address _borrowerOperationsAddress
    )
        MainnetPriceFeedBase(_lineaUsdOracleAddress, _lineaUsdStalenessThreshold, _borrowerOperationsAddress)
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
        (uint256 lineaUsdPrice, bool lineaUsdOracleDown) = _getOracleAnswer(ethUsdOracle);

        // If the LINEA-USD oracle response was invalid, return the last good price
        if (lineaUsdOracleDown) return (_shutDownAndSwitchToLastGoodPrice(address(ethUsdOracle.aggregator)), true);

        lastGoodPrice = lineaUsdPrice;
        return (lineaUsdPrice, false);
    }
}
