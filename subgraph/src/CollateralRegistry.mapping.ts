import { CollateralRegistry as CollateralRegistryContract } from "../generated/BoldToken/CollateralRegistry";
import { CollateralAdded as CollateralAddedEvent } from "../generated/templates/CollateralRegistry/CollateralRegistry";
import { addCollateral } from "./shared/collateral";

export function handleCollateralAdded(event: CollateralAddedEvent): void {
  let registry = CollateralRegistryContract.bind(event.address);
  let totalCollaterals: i32 = registry.totalCollaterals().toI32();

  addCollateral(
    event.params._index.toI32(),
    totalCollaterals,
    event.params._token,
    event.params._troveManager,
  );
}

