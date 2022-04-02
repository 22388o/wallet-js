import { EthereumAccount } from "@dojima-wallet/account";
import { NetworkType } from "@dojima-wallet/types";
import {
  EthTxDetailsResult,
  EthTxHashDataResult,
  TransactionHashDataResult,
  TransactionHistoryResult,
  TxHashDataParams,
  TxHistoryParams,
} from "./utils/types";
import axios from "axios";

export default class EthereumTransactions extends EthereumAccount {
  _api: string;
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
    if (network === "mainnet" || network === "devnet") {
      this._api = "https://api.etherscan.io/api";
    } else if (network === "testnet") {
      this._api = "https://api-ropsten.etherscan.io/api";
    }
  }

  async getTransactionsHistory(params: TxHistoryParams) {
    let requestUrl = `${this._api}?module=account&action=txlist`;

    if (params.address) {
      requestUrl += `&address=${params.address}`;
    }
    if (params.apiKey) {
      requestUrl += `&api=${params.apiKey}`;
    }
    if (params.limit) {
      requestUrl += `&offset=${params.limit}`;
    } else {
      requestUrl += `&offset=10`;
    }
    if (params.page) {
      requestUrl += `&page=${params.page}`;
    } else {
      requestUrl += `&page=1`;
    }
    if (params.sort) {
      requestUrl += `&sort=${params.sort}`;
    } else {
      requestUrl += `&sort=desc`;
    }
    if (params.startBlock) {
      requestUrl += `&startblock=${params.startBlock}`;
    } else {
      requestUrl += `&startblock=0`;
    }
    if (params.endBlock) {
      requestUrl += `&endblock=${params.endBlock}`;
    } else {
      requestUrl += `&endblock=99999999`;
    }

    try {
      let response: TransactionHistoryResult = (await axios.get(requestUrl))
        .data;
      let result: EthTxDetailsResult[] = response.result;
      console.log(result);
      return {
        txs: (result || []).map((res) => ({
          blockNumber: Number(res.blockNumber),
          timeStamp: new Date(Number(res.timeStamp) * 1000),
          hash: res.hash,
          nonce: Number(res.nonce),
          blockHash: res.blockHash,
          transactionIndex: Number(res.transactionIndex),
          from: res.from,
          to: res.to,
          value: Number(res.value) / Math.pow(10, 18),
          gas: res.gas,
          gasPrice: Number(res.gasPrice) / Math.pow(10, 18),
          isError: res.isError,
          txreceipt_status: res.txreceipt_status,
          input: res.input,
          contractAddress: res.contractAddress,
          cumulativeGasUsed: res.cumulativeGasUsed,
          gasUsed: res.gasUsed,
          confirmations: Number(res.confirmations),
        })),
      };
    } catch (error) {
      return new Error(error.message);
    }
  }

  remove0x(string: string) {
    if (string.startsWith("0x")) {
      const removed0xString = string.substring(2);
      return removed0xString;
    }
  }

  convertHexToInt(hexValue: string) {
    const intValue = parseInt(hexValue, 16);
    return intValue;
  }

  async getTransactionData(params: TxHashDataParams) {
    let requestUrl = `${this._api}?module=proxy&action=eth_getTransactionByHash`;
    if (params.hash) {
      requestUrl += `&txhash=${params.hash}`;
    }
    if (params.apiKey) {
      requestUrl += `&api=${params.apiKey}`;
    }

    try {
      let response: TransactionHashDataResult = await (
        await axios.get(requestUrl)
      ).data;
      let result: EthTxHashDataResult = response.result;
      return {
        blockHash: result.blockHash,
        blockNumber: this.convertHexToInt(this.remove0x(result.blockNumber)),
        from: this.remove0x(result.from),
        gas: this.convertHexToInt(this.remove0x(result.gas)),
        gasPrice:
          this.convertHexToInt(this.remove0x(result.gasPrice)) /
          Math.pow(10, 18),
        hash: result.hash,
        input: this.remove0x(result.input),
        nonce: this.convertHexToInt(this.remove0x(result.nonce)),
        to: this.remove0x(result.to),
        transactionIndex: this.convertHexToInt(
          this.remove0x(result.transactionIndex)
        ),
        value:
          this.convertHexToInt(this.remove0x(result.value)) / Math.pow(10, 18),
        type: this.remove0x(result.type),
        v: result.v,
        r: result.r,
        s: result.s,
      };
    } catch (error) {
      return new Error(error.message);
    }
  }
}
