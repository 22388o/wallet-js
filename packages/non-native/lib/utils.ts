export const contractAddress = {
  TETHER: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  BNB: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
  USDC: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  WRAPPED_LUNA: "0xd2877702675e6cEb975b4A1dFf9fb7BAF4C91ea9",
  HEX: "0x2b591e99afE9f32eAA6214f7B7629768c40Eeb39",
  BINANCE_USD: "0x4Fabb145d64652a948d72533023f6E7A623C7C53",
  WRAPPED_USD: "0xa47c8bf37f92aBed4A126BDA807A7b7498661acD",
  SHIBA_INU: "0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE",
  MATIC: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
  WRAPPED_UST: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
  CRONOS_COIN: "0xA0b73E1Ff0B80914AB6fe0444E65848C4C34450b",
};

export type tokensNames =
  | "TETHER"
  | "BNB"
  | "USDC"
  | "WRAPPED_LUNA"
  | "HEX"
  | "BINANCE_USD"
  | "WRAPPED_USD"
  | "SHIBA_INU"
  | "MATIC"
  | "WRAPPED_UST"
  | "CRONOS_COIN";

export const minABI = [
  //  balanceOf
  {
    constant: true,

    inputs: [{ name: "_owner", type: "address" }],

    name: "balanceOf",

    outputs: [{ name: "balance", type: "uint256" }],

    type: "function",
  },
];
