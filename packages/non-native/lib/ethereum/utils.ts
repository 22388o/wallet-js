export const contractData: {
  [key: string]: {
    contractAddress: string;
    tokenSymbol: string;
    decimal: number;
  };
} = {
  BINANCE_USD: {
    contractAddress: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
    tokenSymbol: "BUSD",
    decimal: 18,
  },
  BNB: {
    contractAddress: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
    tokenSymbol: "BNB",
    decimal: 18,
  },
  CHAINLINK_TOKEN: {
    contractAddress: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    tokenSymbol: "LINK",
    decimal: 18,
  },
  CRONOS_COIN: {
    contractAddress: "0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b",
    tokenSymbol: "CRO",
    decimal: 8,
  },
  DAI_STABLECOIN: {
    contractAddress: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    tokenSymbol: "DAI",
    decimal: 18,
  },
  FANTOM: {
    contractAddress: "0x4E15361FD6b4BB609Fa63C81A2be19d873717870",
    tokenSymbol: "FTM",
    decimal: 18,
  },
  MAKER_DAO: {
    contractAddress: "0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2",
    tokenSymbol: "MKR",
    decimal: 18,
  },
  MATIC: {
    contractAddress: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    tokenSymbol: "MATIC",
    decimal: 18,
  },
  SHIBA_INU: {
    contractAddress: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
    tokenSymbol: "SHIB",
    decimal: 18,
  },
  TETHER: {
    contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    tokenSymbol: "USDT",
    decimal: 6,
  },
  UNISWAP: {
    contractAddress: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    tokenSymbol: "UNI",
    decimal: 18,
  },
  USDC: {
    contractAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    tokenSymbol: "USDC",
    decimal: 6,
  },
  VE_CHAIN: {
    contractAddress: "0xD850942eF8811f2A866692A623011bDE52a462C1",
    tokenSymbol: "VEN",
    decimal: 18,
  },
  WRAPPED_BTC: {
    contractAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    tokenSymbol: "WBTC",
    decimal: 8,
  },
  WRAPPED_LUNA: {
    contractAddress: "0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9",
    tokenSymbol: "LUNA",
    decimal: 18,
  },
  WRAPPED_UST: {
    contractAddress: "0xa47c8bf37f92aBed4A126BDA807A7b7498661acD",
    tokenSymbol: "UST",
    decimal: 18,
  },
};

export type tokenList =
  | "BINANCE_USD"
  | "BNB"
  | "CHAINLINK_TOKEN"
  | "CRONOS_COIN"
  | "DAI_STABLECOIN"
  | "FANTOM"
  | "MAKER_DAO"
  | "MATIC"
  | "SHIBA_INU"
  | "TETHER"
  | "UNISWAP"
  | "USDC"
  | "VE_CHAIN"
  | "WRAPPED_BTC"
  | "WRAPPED_LUNA"
  | "WRAPPED_UST";

export const minABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
];
