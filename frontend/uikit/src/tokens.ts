import tokenMainToken from "./token-icons/main-token.svg";
import tokenSbold from "./token-icons/sbold.svg";
import tokenSnt from "./token-icons/snt.svg";
import tokenGusd from "./token-icons/gusd.png";
import tokenLinea from "./token-icons/linea.webp";
import { WHITE_LABEL_CONFIG } from "../../app/src/white-label.config";

import tokenEth from "./token-icons/eth.svg";
import tokenReth from "./token-icons/reth.svg";
import tokenWsteth from "./token-icons/wsteth.svg";

// Map of available token icons by icon name from config
const tokenIconMap: Record<string, string> = {
  "main-token": tokenMainToken,
  "governance-token": tokenSnt,
  "sbold": tokenSbold,
  "eth": tokenEth,
  "reth": tokenReth,
  "wsteth": tokenWsteth,
  "snt": tokenSnt,
  "linea": tokenLinea,
  "sgusd": tokenGusd,
};

// any external token, without a known symbol
export type ExternalToken = {
  icon: string;
  name: string;
  symbol: string;
};

// a token with a known symbol (TokenSymbol)
export type Token = ExternalToken & {
  icon: string;
  name: string;
  symbol: TokenSymbol;
};

// Generate types from config
type ConfigCollateralSymbol = typeof WHITE_LABEL_CONFIG.tokens.collaterals[number]["symbol"];

export type TokenSymbol =
  | typeof WHITE_LABEL_CONFIG.tokens.mainToken.symbol
  | typeof WHITE_LABEL_CONFIG.tokens.governanceToken.symbol
  | typeof WHITE_LABEL_CONFIG.tokens.otherTokens.eth.symbol
  | typeof WHITE_LABEL_CONFIG.tokens.otherTokens.sbold.symbol
  | typeof WHITE_LABEL_CONFIG.tokens.otherTokens.staked.symbol
  | typeof WHITE_LABEL_CONFIG.tokens.otherTokens.lusd.symbol
  | ConfigCollateralSymbol;

export type CollateralSymbol = ConfigCollateralSymbol;

export function isTokenSymbol(symbolOrUrl: string): symbolOrUrl is TokenSymbol {
  return (
    symbolOrUrl === WHITE_LABEL_CONFIG.tokens.mainToken.symbol
    || symbolOrUrl === WHITE_LABEL_CONFIG.tokens.governanceToken.symbol
    || symbolOrUrl === WHITE_LABEL_CONFIG.tokens.otherTokens.eth.symbol
    || symbolOrUrl === WHITE_LABEL_CONFIG.tokens.otherTokens.sbold.symbol
    || symbolOrUrl === WHITE_LABEL_CONFIG.tokens.otherTokens.staked.symbol
    || symbolOrUrl === WHITE_LABEL_CONFIG.tokens.otherTokens.lusd.symbol
    || WHITE_LABEL_CONFIG.tokens.collaterals.some(c => c.symbol === symbolOrUrl)
  );
}

export function isCollateralSymbol(symbol: string): symbol is CollateralSymbol {
  return WHITE_LABEL_CONFIG.tokens.collaterals.some(c => c.symbol === symbol);
}

export type CollateralToken = Token & {
  collateralRatio: number;
  symbol: CollateralSymbol;
};

// Generate all tokens from unified config
const MAIN_TOKEN: Token = {
  icon: tokenIconMap[WHITE_LABEL_CONFIG.tokens.mainToken.icon],
  name: WHITE_LABEL_CONFIG.tokens.mainToken.name,
  symbol: WHITE_LABEL_CONFIG.tokens.mainToken.symbol,
} as const;

const GOVERNANCE_TOKEN: Token = {
  icon: tokenIconMap[WHITE_LABEL_CONFIG.tokens.governanceToken.icon],
  name: WHITE_LABEL_CONFIG.tokens.governanceToken.name,
  symbol: WHITE_LABEL_CONFIG.tokens.governanceToken.symbol,
} as const;


const ETH_TOKEN: Token = {
  icon: tokenIconMap[WHITE_LABEL_CONFIG.tokens.otherTokens.eth.icon],
  name: WHITE_LABEL_CONFIG.tokens.otherTokens.eth.name,
  symbol: WHITE_LABEL_CONFIG.tokens.otherTokens.eth.symbol,
} as const;

const SBOLD_TOKEN: Token = {
  icon: tokenIconMap[WHITE_LABEL_CONFIG.tokens.otherTokens.sbold.icon],
  name: WHITE_LABEL_CONFIG.tokens.otherTokens.sbold.name,
  symbol: WHITE_LABEL_CONFIG.tokens.otherTokens.sbold.symbol,
} as const;

// Generate collaterals from config using dynamic icons
export const COLLATERALS: CollateralToken[] = WHITE_LABEL_CONFIG.tokens.collaterals.map(collateral => {
  const iconUrl = tokenIconMap[collateral.icon];
  if (!iconUrl) {
    console.warn(`Missing icon mapping for "${collateral.icon}" (${collateral.symbol}), using fallback`);
  }
  return {
    collateralRatio: collateral.collateralRatio,
    icon: iconUrl || tokenIconMap["main-token"], // fallback to main token icon
    name: collateral.name,
    symbol: collateral.symbol,
  };
});

const tokensMap: Record<string, Token | CollateralToken> = {
  [WHITE_LABEL_CONFIG.tokens.mainToken.symbol]: MAIN_TOKEN,
  [WHITE_LABEL_CONFIG.tokens.governanceToken.symbol]: GOVERNANCE_TOKEN,
  [WHITE_LABEL_CONFIG.tokens.otherTokens.eth.symbol]: ETH_TOKEN,
  [WHITE_LABEL_CONFIG.tokens.otherTokens.sbold.symbol]: SBOLD_TOKEN,
};

COLLATERALS.forEach(collateral => {
  tokensMap[collateral.symbol] = collateral;
});

export const TOKENS_BY_SYMBOL = tokensMap as Record<TokenSymbol, Token | CollateralToken>;
