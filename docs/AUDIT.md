# Firm Money — Security Audit

## Cyfrin Audit Report v2.0

- **Auditor:** [Cyfrin](https://cyfrin.io)
- **Lead Auditors:** SBSecurity (Blckhv, Slavcheww), Arnie
- **Date:** March 9, 2026
- **Audit Period:** February 23–27, 2026
- **Method:** Manual Review
- **Audit Commit:** `1a4691226fe5...`
- **Fix Commit:** `48dd5791b22a...`
- **Full Report:** [Firm_Money_Audit_Report_Cyfrin_v2.pdf](./Firm_Money_Audit_Report_Cyfrin_v2.pdf)

## Scope

The audit covered changes made to the following files (diff from Liquity V2 base):

- `contracts/script/DeployLiquity2.s.sol`
- `contracts/src/AddressesRegistry.sol`
- `contracts/src/BorrowerOperations.sol`
- `contracts/src/CollateralRegistry.sol`
- `contracts/src/Dependencies/Constants.sol`
- `contracts/src/PriceFeeds/LINEAPriceFeed.sol`
- `contracts/src/PriceFeeds/SGUSDPriceFeed.sol`
- `contracts/src/PriceFeeds/SNTPriceFeed.sol`
- `contracts/src/TroveManager.sol`

## Executive Summary

| Severity       | Count |
|----------------|-------|
| Critical       | 0     |
| High           | 0     |
| Medium         | 0     |
| **Low**        | **5** |
| **Informational** | **3** |
| **Total**      | **8** |

## Findings

### Low Severity

#### L-1: Deployment script missing new collateral support
The deployment script did not account for the new collateral types added by Firm.

#### L-2: Debt-limit enforcement inconsistent with stated requirement
The requirement states "being at or over the limit means debt can only be repaid or redeemed," but the implementation allowed debt limit bypass through interest and fee accrual. The `updateDebtLimit` function may also be DOSed under rare overflow conditions when `currentDebtLimit` is large enough to overflow when multiplied by 2.

#### L-3: Oracle fallback is inefficient and may choose staler price
The oracle fallback logic could select a price that is more stale than necessary.

#### L-4: Empty SP removes entire liquidator incentive
When the Stability Pool is empty, liquidators receive zero compensation during redistributions, leaving the protocol reliant solely on trove owners self-liquidating to prevent bad debt — an unreliable incentive during the most critical moments.

#### L-5: Insufficient liquidator incentive on non-ETH branches
The collateral gas compensation cap is set to a universal `0.1 ether` (0.1e18 token units) for all collateral branches. Liquidators of sGUSD, SNT, and LINEA troves receive effectively zero compensation even when the SP offset path is used.

### Informational

#### I-1: Imported constants remain unused
Some imported constants are not used in the codebase.

#### I-2: rETH staleness configuration does not match documentation
The rETH staleness threshold in code does not align with what the documentation states.

#### I-3: MetadataNFT reuses wrong protocol branding
The NFT metadata still references the original Liquity branding instead of Firm Money.

## Centralization Risks (noted in report)

- Once the governor is set in `CollateralRegistry`, there is no function to update this value — a compromised key could be problematic.
- The governor can arbitrarily set the debt limit to block new debt issuance.
- The "max 2x per increase" debt limit restriction can be bypassed over multiple transactions.
