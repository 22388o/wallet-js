import * as web3 from "@solana/web3.js";
import { SolanaAccount } from "@dojima-wallet/account";
import { NetworkType } from "@dojima-wallet/types";
import { SolTxDataResult } from "./utils/types";

export default class SolanaTransaction extends SolanaAccount {
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
  }

  async getTransactionData(
    hash: string,
    state?: web3.Finality
  ): Promise<SolTxDataResult | Error> {
    try {
      let txData = await this._connection.getTransaction(hash, {
        commitment: state ? state : "confirmed",
      });
      let amount = txData.meta.postBalances[1] - txData.meta.preBalances[1];
      return {
        timeStamp: new Date(Number(txData.blockTime) * 1000),
        gasFee: txData.meta.fee / Math.pow(10, 9),
        amount: amount / Math.pow(10, 9),
        status: "",
        block: txData.slot,
        from: txData.transaction.message.accountKeys[0].toString(),
        to: txData.transaction.message.accountKeys[0].toString(),
        recentBlockHash: txData.transaction.message.recentBlockhash,
        instructionData: txData.transaction.message.instructions[0].data,
      };
    } catch (error) {
      return new Error(error.message);
    }
  }

  async getTransactionsHistory(
    address: string,
    offset?: number,
    beforeHash?: string,
    untilHash?: string
  ) {
    try {
      const pubKey = new web3.PublicKey(address);
      let signatures = await this._connection.getConfirmedSignaturesForAddress2(
        pubKey,
        {
          limit: offset ? offset : 10,
          before: beforeHash ? beforeHash : null,
          until: untilHash ? untilHash : null,
        }
      );
      return signatures;
    } catch (error) {
      return new Error(error.message);
    }
  }
}
