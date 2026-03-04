// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "forge-std/Test.sol";
import "../src/Dependencies/Constants.sol";

/**
 * @title CollateralParamsTest
 * @notice Tests for collateral parameter constants
 */
contract CollateralParamsTest is Test {
    
    // =============================================================
    //                      ETH PARAMETERS
    // =============================================================
    
    function test_ETH_CCR() public pure {
        assertEq(CCR_WETH, 150e16, "ETH CCR should be 150%");
    }
    
    function test_ETH_MCR() public pure {
        assertEq(MCR_WETH, 110e16, "ETH MCR should be 110%");
    }
    
    function test_ETH_SCR() public pure {
        assertEq(SCR_WETH, 110e16, "ETH SCR should be 110%");
    }
    
    function test_ETH_LiquidationPenalty() public pure {
        assertEq(LIQUIDATION_PENALTY_SP_WETH, 5e16, "ETH SP penalty should be 5%");
        assertEq(LIQUIDATION_PENALTY_REDISTRIBUTION_WETH, 10e16, "ETH redistribution penalty should be 10%");
    }

    // =============================================================
    //                    STAKED ETH (wstETH, rETH)
    // =============================================================
    
    function test_SETH_CCR() public pure {
        assertEq(CCR_SETH, 160e16, "SETH CCR should be 160%");
    }
    
    function test_SETH_MCR() public pure {
        assertEq(MCR_SETH, 110e16, "SETH MCR should be 110%");
    }
    
    function test_SETH_SCR() public pure {
        assertEq(SCR_SETH, 110e16, "SETH SCR should be 110%");
    }
    
    function test_SETH_LiquidationPenalty() public pure {
        assertEq(LIQUIDATION_PENALTY_SP_SETH, 5e16, "SETH SP penalty should be 5%");
        assertEq(LIQUIDATION_PENALTY_REDISTRIBUTION_SETH, 20e16, "SETH redistribution penalty should be 20%");
    }

    // =============================================================
    //                         SNT
    // =============================================================
    
    function test_SNT_CCR() public pure {
        assertEq(CCR_SNT, 185e16, "SNT CCR should be 185%");
    }
    
    function test_SNT_MCR() public pure {
        assertEq(MCR_SNT, 160e16, "SNT MCR should be 160%");
    }
    
    function test_SNT_SCR() public pure {
        assertEq(SCR_SNT, 160e16, "SNT SCR should be 160%");
    }
    
    function test_SNT_LiquidationPenalty() public pure {
        assertEq(LIQUIDATION_PENALTY_SP_SNT, 5e16, "SNT SP penalty should be 5%");
        assertEq(LIQUIDATION_PENALTY_REDISTRIBUTION_SNT, 10e16, "SNT redistribution penalty should be 10%");
    }

    // =============================================================
    //                        LINEA
    // =============================================================
    
    function test_LINEA_CCR() public pure {
        assertEq(CCR_LINEA, 185e16, "LINEA CCR should be 185%");
    }
    
    function test_LINEA_MCR() public pure {
        assertEq(MCR_LINEA, 160e16, "LINEA MCR should be 160%");
    }
    
    function test_LINEA_SCR() public pure {
        assertEq(SCR_LINEA, 160e16, "LINEA SCR should be 160%");
    }
    
    function test_LINEA_LiquidationPenalty() public pure {
        assertEq(LIQUIDATION_PENALTY_SP_LINEA, 5e16, "LINEA SP penalty should be 5%");
        assertEq(LIQUIDATION_PENALTY_REDISTRIBUTION_LINEA, 10e16, "LINEA redistribution penalty should be 10%");
    }

    // =============================================================
    //                        sGUSD
    // =============================================================
    
    function test_SGUSD_CCR() public pure {
        assertEq(CCR_SGUSD, 125e16, "sGUSD CCR should be 125%");
    }
    
    function test_SGUSD_MCR() public pure {
        assertEq(MCR_SGUSD, 110e16, "sGUSD MCR should be 110%");
    }
    
    function test_SGUSD_SCR() public pure {
        assertEq(SCR_SGUSD, 110e16, "sGUSD SCR should be 110%");
    }
    
    function test_SGUSD_LiquidationPenalty() public pure {
        assertEq(LIQUIDATION_PENALTY_SP_SGUSD, 5e16, "sGUSD SP penalty should be 5%");
        assertEq(LIQUIDATION_PENALTY_REDISTRIBUTION_SGUSD, 10e16, "sGUSD redistribution penalty should be 10%");
    }

    // =============================================================
    //                      DEBT LIMITS
    // =============================================================
    
    function test_DebtLimit_ETH() public pure {
        assertEq(DEBT_LIMIT_ETH, 100_000_000e18, "ETH debt limit should be $100M");
    }
    
    function test_DebtLimit_wstETH() public pure {
        assertEq(DEBT_LIMIT_WSTETH, 100_000_000e18, "wstETH debt limit should be $100M");
    }
    
    function test_DebtLimit_rETH() public pure {
        assertEq(DEBT_LIMIT_RETH, 100_000_000e18, "rETH debt limit should be $100M");
    }
    
    function test_DebtLimit_SNT() public pure {
        assertEq(DEBT_LIMIT_SNT, 2_000_000e18, "SNT debt limit should be $2M");
    }
    
    function test_DebtLimit_LINEA() public pure {
        assertEq(DEBT_LIMIT_LINEA, 2_000_000e18, "LINEA debt limit should be $2M");
    }
    
    function test_DebtLimit_sGUSD() public pure {
        assertEq(DEBT_LIMIT_SGUSD, 5_000_000e18, "sGUSD debt limit should be $5M");
    }

    // =============================================================
    //                    GLOBAL PARAMETERS
    // =============================================================
    
    function test_ETH_GasCompensation() public pure {
        assertEq(ETH_GAS_COMPENSATION, 0.0375 ether, "Gas compensation should be 0.0375 ETH");
    }
    
    function test_MinDebt() public pure {
        assertEq(MIN_DEBT, 2000e18, "Minimum debt should be 2000 BOLD");
    }
    
    function test_CollGasCompensationCap() public pure {
        assertEq(COLL_GAS_COMPENSATION_CAP, 2 ether, "Coll gas compensation cap should be 2 ETH");
    }
    
    function test_BatchCRBuffer() public pure {
        assertEq(BCR_ALL, 10e16, "Batch CR buffer should be 10%");
    }
}
