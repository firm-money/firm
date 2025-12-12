/**
 * WHITE-LABEL CONFIGURATION
 * 
 * This is the master configuration file for customizing the platform for different clients.
 * When creating a new fork, update all values in this file according to the client's requirements.
 */

export const WHITE_LABEL_CONFIG = {
  brandColors: {
    primary: "gold:500" as const,
    primaryContent: "burgundy:800" as const,
    primaryContentAlt: "burgundy:800" as const,
    
    secondary: "beige:300" as const,
    secondaryContent: "burgundy:800" as const,
    secondaryContentAlt: "gold:500" as const,
    
    accent1: "burgundy:800" as const,  
    accent1Content: "white" as const,
    accent1ContentAlt: "beige:100" as const,
    
    accent2: "gold:500" as const,
    accent2Content: "burgundy:800" as const,
    accent2ContentAlt: "burgundy:700" as const,
  },

  // ===========================
  // TYPOGRAPHY
  // ===========================
  typography: {
    fontFamily: "'Work Sans', sans-serif",
    fontImport: "WorkSans" as const,
    headingFontFamily: "'Nunito', sans-serif",
  },

  // ===========================
  // UNIFIED TOKENS CONFIGURATION
  // ===========================
  tokens: {
    // Main protocol stablecoin
    mainToken: {
      name: "USF",
      symbol: "USF" as const, 
      ticker: "USF",
      decimals: 18,
      description: "USD-pegged stablecoin by Firm Protocol",
      icon: "main-token",
      // Core protocol contracts (deployment addresses TBD)
      deployments: {
        1660990954: { // Status Network Sepolia
          token: "0x0000000000000000000000000000000000000000",
          collateralRegistry: "0x0000000000000000000000000000000000000000",
          governance: "0x0000000000000000000000000000000000000000",
          hintHelpers: "0x0000000000000000000000000000000000000000",
          multiTroveGetter: "0x0000000000000000000000000000000000000000",
          exchangeHelpers: "0x0000000000000000000000000000000000000000",
        },
      },
    },

    // Governance token (exists but no functionality at launch)
    governanceToken: {
      name: "SNT",
      symbol: "SNT" as const,
      ticker: "SNT",
      icon: "governance-token",
      // Only used as collateral, no governance features
      deployments: {
        1660990954: {
          token: "0x0000000000000000000000000000000000000000",
          staking: "0x0"
        },
      },
    },

    // Collateral tokens (for borrowing) - Multi-chain support
    collaterals: [
      // === ETH-based collaterals (110% MCR, 90.91% max LTV) ===
      {
        symbol: "ETH" as const,
        name: "ETH",
        icon: "eth",
        collateralRatio: 1.1, // 110% MCR
        maxDeposit: "100000000", // $100M initial debt limit
        maxLTV: 0.9091, // 90.91% max LTV
        // Deployment info (per chain)
        deployments: {
          1660990954: {
            collToken: "0x0000000000000000000000000000000000000000",
            leverageZapper: "0x0000000000000000000000000000000000000000",
            stabilityPool: "0x0000000000000000000000000000000000000000",
            troveManager: "0x0000000000000000000000000000000000000000",
          },
        },
      },
      {
        symbol: "wstETH" as const,
        name: "Wrapped Staked ETH",
        icon: "wsteth",
        collateralRatio: 1.1,
        maxDeposit: "100000000",
        maxLTV: 0.9091,
        deployments: {
          1660990954: {
            collToken: "0x0000000000000000000000000000000000000000",
            leverageZapper: "0x0000000000000000000000000000000000000000",
            stabilityPool: "0x0000000000000000000000000000000000000000",
            troveManager: "0x0000000000000000000000000000000000000000",
          },
        },
      },
      {
        symbol: "rETH" as const,
        name: "Rocket Pool ETH",
        icon: "reth",
        collateralRatio: 1.1,
        maxDeposit: "100000000",
        maxLTV: 0.9091,
        deployments: {
          1660990954: {
            collToken: "0x0000000000000000000000000000000000000000",
            leverageZapper: "0x0000000000000000000000000000000000000000",
            stabilityPool: "0x0000000000000000000000000000000000000000",
            troveManager: "0x0000000000000000000000000000000000000000",
          },
        },
      },
      {
        symbol: "SNT" as const,
        name: "Status Network Token", 
        icon: "snt",
        collateralRatio: 1.6,
        maxDeposit: "5000000",
        maxLTV: 0.625,
        deployments: {
          1660990954: {
            collToken: "0x0000000000000000000000000000000000000000",
            leverageZapper: "0x0000000000000000000000000000000000000000",
            stabilityPool: "0x0000000000000000000000000000000000000000",
            troveManager: "0x0000000000000000000000000000000000000000",
          },
        },
      },
      {
        symbol: "LINEA" as const,
        name: "Linea", 
        icon: "linea",
        collateralRatio: 1.5,
        maxDeposit: "10000000",
        maxLTV: 0.666,
        deployments: {
          1660990954: {
            collToken: "0x0000000000000000000000000000000000000000",
            leverageZapper: "0x0000000000000000000000000000000000000000",
            stabilityPool: "0x0000000000000000000000000000000000000000",
            troveManager: "0x0000000000000000000000000000000000000000",
          },
        },
      },
      {
        symbol: "sGUSD" as const,
        name: "Staked GUSD",
        icon: "sgusd",
        collateralRatio: 1.2,
        maxDeposit: "10000000",
        maxLTV: 0.833,
        deployments: {
          1660990954: {
            collToken: "0x0000000000000000000000000000000000000000",
            leverageZapper: "0x0000000000000000000000000000000000000000",
            stabilityPool: "0x0000000000000000000000000000000000000000",
            troveManager: "0x0000000000000000000000000000000000000000",
          },
        },
      },
    ],

    // Other tokens in the protocol
    otherTokens: {
      // ETH for display purposes
      eth: {
        symbol: "ETH" as const,
        name: "ETH",
        icon: "eth",
      },
      // SBOLD - yield-bearing version of the main token
      sbold: {
        symbol: "SBOLD" as const,
        name: "sYOUR Token",
        icon: "sbold",
      },
      // Staked version of main token
      staked: {
        symbol: "sYOUR" as const,
        name: "Staked YOUR",
        icon: "staked-main-token",
      },
      lusd: {
        symbol: "LUSD" as const,
        name: "LUSD",
        icon: "legacy-stablecoin",
      },
    },
  },

  // ===========================
  // BRANDING & CONTENT
  // ===========================
  branding: {
    appName: "Firm Protocol",
    brandName: "Firm",
    appTagline: "Decentralized stablecoin protocol",
    appDescription: "Borrow USF against multiple collateral types",
    appUrl: "https://firm.org/",
    
    // External links
    links: {
      docs: {
        base: "https://docs.firm.org/",
        redemptions: "https://docs.firm.org/redemptions",
        liquidations: "https://docs.firm.org/liquidations",
        delegation: "https://docs.firm.org/delegation",
        interestRates: "https://docs.firm.org/interest-rates",
        earn: "https://docs.firm.org/earn",
        staking: "https://docs.firm.org/staking",
      },
      dune: "https://dune.com/firm",
      discord: "https://discord.gg/firm",
      github: "https://github.com/firm/protocol",
      x: "https://x.com/firmprotocol",
      friendlyForkProgram: "https://firm.org/ecosystem",
    },
    
    // Feature flags and descriptions
    features: {
      showV1Legacy: false, // No V1 legacy content
      friendlyFork: {
        enabled: true,
        title: "Learn more about the Friendly Fork Program",
        description: "A program for collaborative protocol development",
      },
    },
    
    // Navigation configuration  
    navigation: {
      showBorrow: true,
      showMultiply: false,
      showEarn: true,
      showStake: false,
    },
    
    // Menu labels (can be customized per deployment)
    menu: {
      dashboard: "Dashboard",
      borrow: "Borrow",
      multiply: "Multiply", 
      earn: "Earn",
      stake: "Stake"
    },
    
    // Common UI text
    ui: {
      connectWallet: "Connect",
      wrongNetwork: "Wrong network",
      loading: "Loading...",
      error: "Error",
    },
  },

  // ===========================
  // EARN POOLS CONFIGURATION
  // ===========================
  earnPools: {
    enableStakedMainToken: false,
    
    // Enable/disable stability pools for collaterals
    enableStabilityPools: true,
    
    // Custom pools configuration (beyond collateral stability pools)
    customPools: [] as Array<{
      symbol: string;
      name: string;
      enabled: boolean;
    }>,
  },
};

// Type exports for TypeScript support
export type WhiteLabelConfig = typeof WHITE_LABEL_CONFIG;

// Utility functions for dynamic configuration
export function getAvailableEarnPools() {
  const pools: Array<{ symbol: string; name: string; type: 'stability' | 'staked' | 'custom' }> = [];
  
  // Add stability pools for enabled collaterals
  if (WHITE_LABEL_CONFIG.earnPools.enableStabilityPools) {
    WHITE_LABEL_CONFIG.tokens.collaterals.forEach(collateral => {
      pools.push({
        symbol: collateral.symbol,
        name: `${collateral.name} Stability Pool`,
        type: 'stability',
      });
    });
  }
  
  // Add custom pools
  WHITE_LABEL_CONFIG.earnPools.customPools.forEach(pool => {
    if (pool.enabled) {
      pools.push({
        symbol: pool.symbol,
        name: pool.name,
        type: 'custom',
      });
    }
  });
  
  return pools;
}

export function getEarnPoolSymbols() {
  return getAvailableEarnPools().map(pool => pool.symbol);
}

export function getCollateralSymbols() {
  return WHITE_LABEL_CONFIG.tokens.collaterals.map(collateral => collateral.symbol);
}