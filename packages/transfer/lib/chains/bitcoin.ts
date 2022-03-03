import { NetworkType } from "@dojima-wallet/types/dist/lib/network";
import { Client } from "@xchainjs/xchain-bitcoin";
import { AssetBTC, baseAmount } from "@xchainjs/xchain-util";
import { BigNumber } from "bignumber.js";
import BitcoinClient from "lib/utils.ts/bitcoin_client";

export default class BitcoinChain extends BitcoinClient {
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
  }

  // Retrieve balance of the user
  async getBalance(client: Client) {
    const balanceObject = await client.getBalance(client.getAddress());
    const balance =
      balanceObject[0].amount.amount().toNumber() /
      Math.pow(10, balanceObject[0].amount.decimal);
    return balance;
  }

  // Transfer tokens to the receiver
  async createTransactionAndSend(
    toAddress: string,
    amount: number,
    client: Client
  ) {
    // Convert amount to BigNumber
    const toAmount = new BigNumber(amount * Math.pow(10, 8));
    // console.log('To amount : ', toAmount.toNumber().toFixed(2));

    // BaseAmount value
    const bsAmount = baseAmount(toAmount, 8);
    // console.log('Base amount : ', bsAmount.amount());

    // Transfer amount to recipient
    const transactionHash = await client.transfer({
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
