import { BitcoinClient } from "@dojima-wallet/connection";
import { NetworkType } from "@dojima-wallet/types";

export default class BitcoinTransactions extends BitcoinClient {
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
  }

  async getTransactionsHistory(
    address: string,
    startIndex?: number,
    limit?: number
  ) {
    try {
      // getTransactions method output max 50 records.
      // 'limit': integer - No. of records we require of total 50. Default value 10.
      // 'offset': integer - No. from which record output should be generated
      let transactions = await this._client.getTransactions({
        address: address,
        offset: startIndex ? startIndex : 0,
        limit: limit ? limit : 10,
      });
      // console.log(transactions.txs.length);
      return transactions;
    } catch (error) {
      //   console.log("No transactions found");
      return new Error(error.message);
    }
  }

  async getTransactionData(txHash: string) {
    try {
      const txData = await this._client.getTransactionData(txHash);
      //   console.log(txData);
      return txData;
    } catch (error) {
      return new Error(error.message);
    }
  }
}
