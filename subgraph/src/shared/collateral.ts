import { Address, DataSourceContext } from "@graphprotocol/graph-ts";
import { BorrowerOperations as BorrowerOperationsContract } from "../../generated/BoldToken/BorrowerOperations";
import { TroveManager as TroveManagerContract } from "../../generated/BoldToken/TroveManager";
import { Collateral, CollateralAddresses } from "../../generated/schema";
import { TroveManager as TroveManagerTemplate, TroveNFT as TroveNFTTemplate } from "../../generated/templates";

/**
 * Create Collateral + CollateralAddresses and template data sources
 * for a given collateral.
 */
export function addCollateral(
  collIndex: i32,
  totalCollaterals: i32,
  tokenAddress: Address,
  troveManagerAddress: Address,
): void {
  let collId = collIndex.toString();

  // Collateral is immutable in the schema: only create if missing.
  let existing = Collateral.load(collId);
  if (existing) return;

  let collateral = new Collateral(collId);
  collateral.collIndex = collIndex;

  let troveManagerContract = TroveManagerContract.bind(troveManagerAddress);

  let addresses = new CollateralAddresses(collId);
  addresses.collateral = collId;
  addresses.borrowerOperations = troveManagerContract.borrowerOperations();
  addresses.sortedTroves = troveManagerContract.sortedTroves();
  addresses.stabilityPool = troveManagerContract.stabilityPool();
  addresses.token = tokenAddress;
  addresses.troveManager = troveManagerAddress;
  addresses.troveNft = troveManagerContract.troveNFT();
  
  // minCollRatio derived from BorrowerOperations.MCR()
  collateral.minCollRatio = BorrowerOperationsContract.bind(
    Address.fromBytes(addresses.borrowerOperations),
  ).MCR();
  
  collateral.save();
  addresses.save();

  // Create TroveManager + TroveNFT templates with context.
  let context = new DataSourceContext();
  context.setBytes("address:borrowerOperations", addresses.borrowerOperations);
  context.setBytes("address:sortedTroves", addresses.sortedTroves);
  context.setBytes("address:stabilityPool", addresses.stabilityPool);
  context.setBytes("address:token", addresses.token);
  context.setBytes("address:troveManager", addresses.troveManager);
  context.setBytes("address:troveNft", addresses.troveNft);
  context.setString("collId", collId);
  context.setI32("collIndex", collIndex);
  context.setI32("totalCollaterals", totalCollaterals);

  TroveManagerTemplate.createWithContext(troveManagerAddress, context);
  TroveNFTTemplate.createWithContext(Address.fromBytes(addresses.troveNft), context);
}

