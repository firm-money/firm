# CLAUDE.md — Firm Money Repo Instructions

## Project
Firm Money is a Liquity V2 fork deploying the USF stablecoin on Status L2.

## Tech Stack
- Solidity ^0.8.x
- Foundry (forge, cast)
- OpenZeppelin contracts
- Chainlink + custom oracles

## Security Review Focus
When reviewing PRs, prioritize Solidity security:
- This is a lending/borrowing protocol — liquidation logic is critical
- Oracle staleness and manipulation are high-priority concerns
- The protocol handles collateral (ETH, rETH, SNT, LINEA, sGUSD)
- Stability Pool and redistribution mechanics must be airtight
- All arithmetic involving debt, collateral ratios, and interest must be checked for precision loss

## Build & Test
```bash
cd contracts
forge build
forge test
```
