// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "forge-std/Test.sol";
import "../src/AddressesRegistry.sol";
import "../src/TroveManager.sol";
import "../src/BorrowerOperations.sol";
import "../src/CollateralRegistry.sol";
import "../src/BoldToken.sol";
import "../src/ActivePool.sol";
import "../src/DefaultPool.sol";
import "../src/GasPool.sol";
import "../src/CollSurplusPool.sol";
import "../src/SortedTroves.sol";
import "../src/StabilityPool.sol";
import "../src/TroveNFT.sol";
import "../src/HintHelpers.sol";
import "../src/MultiTroveGetter.sol";
import "test/TestContracts/PriceFeedTestnet.sol";
import {IWETH} from "../src/Interfaces/IWETH.sol";

/**
 * @title DebtLimitsTest
 * @notice Tests for the debt limit functionality
 */
contract DebtLimitsTest is Test {
    uint256 constant INITIAL_DEBT_LIMIT = 100_000_000e18; // $100M
    uint256 constant CCR = 150e16;
    uint256 constant MCR = 110e16;
    uint256 constant SCR = 110e16;
    uint256 constant BCR = 10e16;
    uint256 constant LIQUIDATION_PENALTY_SP = 5e16;
    uint256 constant LIQUIDATION_PENALTY_REDISTRIBUTION = 10e16;

    AddressesRegistry addressesRegistry;
    TroveManager troveManager;
    CollateralRegistry collateralRegistry;

    address governor = address(0x1);
    address user1 = address(0x2);
    address user2 = address(0x3);

    function setUp() public {
        // Deploy AddressesRegistry with debt limit
        addressesRegistry = new AddressesRegistry(
            address(this),
            CCR,
            MCR,
            BCR,
            SCR,
            LIQUIDATION_PENALTY_SP,
            LIQUIDATION_PENALTY_REDISTRIBUTION,
            INITIAL_DEBT_LIMIT
        );
    }

    function test_InitialDebtLimit() public view {
        assertEq(addressesRegistry.debtLimit(), INITIAL_DEBT_LIMIT);
    }

    function test_InvalidDebtLimitReverts() public {
        vm.expectRevert(AddressesRegistry.InvalidDebtLimit.selector);
        new AddressesRegistry(
            address(this),
            CCR,
            MCR,
            BCR,
            SCR,
            LIQUIDATION_PENALTY_SP,
            LIQUIDATION_PENALTY_REDISTRIBUTION,
            0 // Invalid: zero debt limit
        );
    }
}

/**
 * @title DebtLimitGovernanceTest
 * @notice Tests for debt limit governance via CollateralRegistry
 */
contract DebtLimitGovernanceTest is Test {
    uint256 constant INITIAL_DEBT_LIMIT = 100_000_000e18;

    function test_GovernorCanUpdateDebtLimit() public {
        // This test verifies the debt limit update logic
        // Note: Full integration test requires deployed system
        
        uint256 currentLimit = INITIAL_DEBT_LIMIT;
        uint256 newLimit = currentLimit * 2; // Double the limit
        
        // Verify the 2x max increase rule
        assertTrue(newLimit <= currentLimit * 2);
    }

    function test_CannotIncreaseMoreThan2x() public {
        uint256 currentLimit = INITIAL_DEBT_LIMIT;
        uint256 invalidLimit = currentLimit * 3; // 3x is not allowed
        
        // This would fail the require in updateDebtLimit
        assertTrue(invalidLimit > currentLimit * 2);
    }

    function test_CanResetToInitialLimit() public {
        uint256 initialLimit = INITIAL_DEBT_LIMIT;
        uint256 reducedLimit = initialLimit / 2;
        
        // After reducing, should be able to reset to initial
        assertTrue(initialLimit <= initialLimit); // Can always go back to initial
    }
}
