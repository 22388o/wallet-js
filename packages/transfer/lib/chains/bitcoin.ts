import { BitcoinAccount } from "@dojima-wallet/account";
import { NetworkType } from "@dojima-wallet/types/dist/lib/network";
import { AssetBTC, baseAmount } from "@xchainjs/xchain-util";
import { BigNumber } from "bignumber.js";

export default class BitcoinChain extends BitcoinAccount {
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
  }

  // Retrieve balance of the user
  async getBalance(): Promise<number> {
    const balanceObject = await this._client.getBalance(
      this._client.getAddress()
    );
    const balance =
      balanceObject[0].amount.amount().toNumber() /
      Math.pow(10, balanceObject[0].amount.decimal);
    return balance;
  }

  // Get gasFeeRate for transaction
  // getFeeRates() returns gas fee generated by
  // 'thorchain' else 'sochain'
  // Note: For 'fast' transaction we are making use of gasFee same as 'average'
  async getGasFee() {
    const feeRates = await this._client.getFeeRates();
    return {
      slow: {
        fee: feeRates.average,
      },
      average: {
        fee: feeRates.fast,
      },
      fast: {
        fee: feeRates.fast,
      },
    };
  }

  // Transfer tokens to the receiver
  async createTransactionAndSend(
    toAddress: string,
    amount: number,
    feeRate?: number
  ): Promise<string> {
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
      feeRate: feeRate ? feeRate : 1, // 1 is for testing purpose
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
