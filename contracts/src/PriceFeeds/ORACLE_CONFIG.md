# Price Feed Oracle Configuration

This document lists the oracle addresses needed for each price feed.
All addresses need to be filled in before deployment.

## Supported Collaterals

| Token | Price Feed Contract | Oracle Type | Oracle Address | Staleness Threshold |
|-------|-------------------|-------------|----------------|---------------------|
| ETH | WETHPriceFeed | ETH-USD | `TODO: address(0)` | 25 hours |
| wstETH | WSTETHPriceFeed | ETH-USD + STETH-USD + Exchange Rate | `TODO: address(0)` | 25 hours |
| rETH | RETHPriceFeed | ETH-USD + RETH-ETH + Exchange Rate | `TODO: address(0)` | 25 hours |
| SNT | SNTPriceFeed | SNT-USD | `TODO: address(0)` | 25 hours |
| LINEA | LINEAPriceFeed | LINEA-USD | `TODO: address(0)` | 25 hours |
| sGUSD | SGUSDPriceFeed | sGUSD-USD | `TODO: address(0)` | 25 hours |

## Collateral Parameters (from spec)

| Token | Initial Debt Limit | MCR | SCR | CCR | Liq Penalty |
|-------|-------------------|-----|-----|-----|-------------|
| ETH | $100,000,000 | 110% | 110% | 150% | 5% |
| wstETH | $100,000,000 | 110% | 110% | 160% | 5% |
| rETH | $100,000,000 | 110% | 110% | 160% | 5% |
| SNT | $2,000,000 | 160% | 160% | 185% | 5% |
| LINEA | $2,000,000 | TBD | TBD | TBD | 5% |
| sGUSD | $5,000,000 | 110% | 110% | 125% | 5% |

## Notes

1. **Staleness threshold**: All feeds use 25 hours (90000 seconds) as the staleness threshold, including rETH-ETH (fixed from 48h)
2. **SNT**: Status Network Token - may need a custom oracle or use Chainlink if available
3. **LINEA**: Linea token - oracle TBD
4. **sGUSD**: Staked GUSD - likely pegged close to $1, may use GUSD oracle

## Deployment Steps

1. Obtain oracle addresses for each token
2. Update the deployment script with the addresses
3. Deploy price feeds with correct staleness thresholds
4. Verify all oracles are returning valid prices before deployment
