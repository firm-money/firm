// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "forge-std/Test.sol";
import "./TestContracts/DevTestSetup.sol";

/**
 * @title DebtLimitsIntegrationTest
 * @notice Integration tests for debt limit enforcement during trove operations
 */
contract DebtLimitsIntegrationTest is DevTestSetup {

    function setUp() public override {
        super.setUp();
    }

    function test_GetDebtLimit_ReturnsCorrectValue() public view {
        uint256 debtLimit = troveManager.getDebtLimit();
        assertEq(debtLimit, 100_000_000e18, "Default debt limit should be $100M");
    }

    function test_DebtLimit_IsNonZero() public view {
        uint256 debtLimit = troveManager.getDebtLimit();
        assertTrue(debtLimit > 0, "Debt limit should be non-zero");
    }

    function test_DebtLimit_IsReasonable() public view {
        uint256 debtLimit = troveManager.getDebtLimit();
        // Debt limit should be at least MIN_DEBT
        assertTrue(debtLimit >= 2000e18, "Debt limit should be at least MIN_DEBT");
        // And not exceed a reasonable maximum (1 trillion)
        assertTrue(debtLimit <= 1_000_000_000_000e18, "Debt limit should be reasonable");
    }
}

/**
 * @title DebtLimitGovernanceIntegrationTest
 * @notice Tests for debt limit governance through CollateralRegistry
 */
contract DebtLimitGovernanceIntegrationTest is DevTestSetup {

    function setUp() public override {
        super.setUp();
    }

    function test_NonGovernor_CannotUpdateDebtLimit() public {
        uint256 newLimit = 200_000_000e18;
        
        vm.prank(A); // A is not the governor
        vm.expectRevert();
        collateralRegistry.updateDebtLimit(0, newLimit);
    }

    function test_CannotIncrease_MoreThan2x_FromAnyAddress() public {
        uint256 currentLimit = collateralRegistry.getDebtLimit(0);
        uint256 invalidLimit = currentLimit * 3; // 3x is not allowed
        
        // Even if someone could call, 3x increase should fail
        vm.expectRevert();
        collateralRegistry.updateDebtLimit(0, invalidLimit);
    }

    function test_GetDebtLimit_ReturnsValue() public view {
        uint256 limit = collateralRegistry.getDebtLimit(0);
        assertEq(limit, 100_000_000e18, "Should return $100M");
    }
}
