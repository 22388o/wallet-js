import { Client } from "@xchainjs/xchain-bitcoin";
import { AssetBTC, baseAmount } from "@xchainjs/xchain-util";
import { BigNumber } from "bignumber.js";

export default class BitcoinChain {
  _mnemonic: string;
  _client: Client;
  constructor(mnemonic: string) {
    this._mnemonic = mnemonic;
    this._client = new Client({ phrase: this._mnemonic });
  }

  // Retrieve balance of the user
  async getBalance() {
    const balanceObject = await this._client.getBalance(
      this._client.getAddress()
    );
    const balance =
      balanceObject[0].amount.amount().toNumber() /
      Math.pow(10, balanceObject[0].amount.decimal);
    return balance;
  }

  // Transfer tokens to the receiver
  async createTransactionAndSend(toAddress: string, amount: number) {
    // Convert amount to BigNumber
    const toAmount = new BigNumber(amount * Math.pow(10, 8));
    // console.log('To amount : ', toAmount.toNumber().toFixed(2));

    // BaseAmount value
    const bsAmount = baseAmount(toAmount, 8);
    // console.log('Base amount : ', bsAmount.amount());

    // Transfer amount to recipient
    const transactionHash = await this._client.transfer({
      walletIndex: 0,
      asset: AssetBTC,
      recipient: toAddress,
      amount: bsAmount,
      memo: "SWAP:BTC.BTC",
      feeRate: 1,
    });
    // console.log('Transaction id : ', transactionHash);
    return transactionHash;

    // Get transaction details using transaction hash.
    // Display details only for confirmed transactions else status error
    // try {
    //     const transactionDetails = await this._client.getTransactionData(transactionHash);
    //     console.log('Transaction Details : ', transactionDetails);
    //     return {
    //         transactionDetails,
    //         transactionHash
    //     }
    // } catch (error) {
    //     console.log('Error is : ', error);
    // }
  }
}
