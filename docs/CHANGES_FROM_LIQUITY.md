# Firm Money — Changes from Liquity V2

Firm Money is a friendly fork of [Liquity V2](https://github.com/liquity/bold) deployed on the Status L2 chain. Its stablecoin **$USF** is a 1.00 USD pegged stablecoin minted against ETH and Status Network core tokens.

## Overview

Firm Money is integrated deeply into the Status L2 economic engine:

- Unlocks native asset capital productivity
- USF liquidity anchors core pairs on Orvex (the native DEX)
- Using FIRM earns Karma (the L2 reputation and governance token)
- Community governance can boost FIRM yields with L2 native yield

## Technical Changes from Liquity V2

### New Collateral Types

Liquity V2 supports WETH, wstETH, and rETH. Firm Money extends this with Status L2 native assets:

| Collateral | Description | Price Feed |
|------------|-------------|------------|
| ETH | Standard ETH collateral | ETH-USD oracle |
| wstETH | Wrapped staked ETH | STETH-USD oracle + exchange rate |
| rETH | Rocket Pool ETH | RETH-ETH oracle + exchange rate |
| **SNT** | Status Network Token | `SNTPriceFeed.sol` (new) |
| **LINEA** | Linea token | `LINEAPriceFeed.sol` (new) |
| **sGUSD** | Status Guaranteed USD | `SGUSDPriceFeed.sol` (new) |

### New Price Feed Contracts

Three new PriceFeed contracts were created for the Status L2 collateral types:

- **`SNTPriceFeed.sol`** — Price feed for Status Network Token
- **`LINEAPriceFeed.sol`** — Price feed for Linea token
- **`SGUSDPriceFeed.sol`** — Price feed for Status Guaranteed USD

### Updated Parameters for Status L2

| Parameter | Liquity V2 (Mainnet) | Firm Money (Status L2) |
|-----------|---------------------|----------------------|
| Gas deposit (trove creation) | 0.0375 WETH | **$0** (gasless L2) |
| Minimum debt | 2,000 BOLD | **$200 USF** |

### Governance Features

- **Dynamic collateral branches** — Ability to add new collateral branches via governance (Liquity V2 has a fixed set at deployment)
- **Debt limits** — Governed by a governor address with safety features:
  - Governor can set debt limits to control new debt issuance
  - Max 2x increase per `updateDebtLimit` call (repeatable across transactions)
  - Interest and fee accrual intentionally bypasses the limit for live positions

### Reward System

- Revamped reward system that benefits real users
- Customizable portion of protocol revenues directed to Status community treasury
- Gas comp points for protocol users

### Branding

- Stablecoin: **USF** (not BOLD)
- Protocol: **Firm Money** (not Liquity)
- NFT metadata updated to reflect Firm branding

### Deployment Script

`DeployLiquity2.s.sol` updated to support:
- New collateral types (SNT, LINEA, sGUSD)
- Status L2 chain configuration
- Governance-enabled collateral registry

## What Remains the Same

Firm Money inherits the full Liquity V2 architecture:

- **Multi-collateral system** with per-branch TroveManager, StabilityPool, and BorrowerOperations
- **User-set interest rates** with simple (non-compounding) interest accrual
- **Yield from interest** paid to Stability Pool and LP router
- **Redemption routing** across branches proportional to "outside" debt
- **Redemption ordering** by annual interest rate (lowest first)
- **Zombie Troves** — redeemed Troves left open, tagged as zombie below MIN_DEBT
- **Troves as NFTs** — freely transferable
- **Individual and batch delegation** for interest rate management
- **Collateral branch shutdown** at TCR < SCR or oracle failure
- **No Recovery Mode** — liquidations only when ICR < MCR
- **Liquidation penalties** with potential collateral surplus for borrowers
- **Stability Pool** with Product-Sum algorithm for O(1) reward distribution
- **Redistribution** via corrected stakes when SP is empty
- **CCR restrictions** on borrowing when TCR < CCR

## Security

- **Audit:** Cyfrin (February 2026) — 0 Critical, 0 High, 0 Medium, 5 Low, 3 Informational
- **Full audit report:** [AUDIT.md](./AUDIT.md) | [PDF](./Firm_Money_Audit_Report_Cyfrin_v2.pdf)
- **CI Security Bot:** Claude Code security review on every PR via GitHub Actions
