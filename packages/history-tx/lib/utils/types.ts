export type SortType = "desc" | "asc";

export type ActionType =
  | "balance"
  | "balancemulti"
  | "txlist"
  | "txlistinternal"
  | "tokentx"
  | "tokennfttx"
  | "getminedblocks"
  | "eth_getTransactionByHash";

export type TxHistoryParams = {
  apiKey: string;
  address: string;
  page?: number;
  limit?: number;
  sort?: SortType;
  startBlock?: number;
  endBlock?: number;
};

export type EthTxDetailsResult = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
};

export type TransactionHistoryResult = {
  status: string;
  message: string;
  result: EthTxDetailsResult[];
};

export type TxHashDataParams = {
  hash: string;
  apiKey: string;
};

export type EthTxHashDataResult = {
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  value: string;
  type: string;
  v: string;
  r: string;
  s: string;
};

export type TransactionHashDataResult = {
  jsonrpc: string;
  id: string;
  result: EthTxHashDataResult;
};

export type SolTxDataResult = {
  timeStamp: Date;
  gasFee: number;
  amount: number;
  status: string;
  block: number;
  from: string;
  to: string;
  recentBlockHash: string;
  instructionData: string;
};
