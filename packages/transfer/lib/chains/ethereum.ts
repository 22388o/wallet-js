import * as ethers from "ethers";
import { NetworkType } from "@dojima-wallet/types/dist/lib/network";
import { BigNumber } from "bignumber.js";
import { TransactionConfig } from "web3-core";
import { EthereumAccount } from "@dojima-wallet/account";

export default class EthereumChain extends EthereumAccount {
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
  }

  async getBalance(): Promise<number> {
    const gweiBalance = await this._web3.eth.getBalance(this.getAddress());
    // console.log('Balance in gwei is : ', gweiBalance);     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)

    const ethBalance = this._web3.utils.fromWei(gweiBalance);
    // console.log('Balance in Eth is : ', ethBalance);     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)

    return Number(ethBalance);
  }

  // Calculate 'gasFee' based on multiplier
  calculateFee(baseGasFee: number, multiplier: number): number {
    const fee = new BigNumber(baseGasFee)
      .times(new BigNumber(multiplier))
      .toNumber();
    return fee;
  }

  // Calculate gasFee required for transaction
  async getGasFee() {
    const baseGasFee = await this._web3.eth.getGasPrice();
    return {
      slow: {
        fee: this.calculateFee(parseFloat(baseGasFee), 1),
      },
      average: {
        fee: this.calculateFee(parseFloat(baseGasFee), 1.5),
      },
      fast: {
        fee: this.calculateFee(parseFloat(baseGasFee), 2),
      },
    };
  }

  // Create transaction details based on user input
  createTransaction(toAddress: string, amount: number, feeRate: number) {
    let rawTxDetails = {
      from: this.getAddress(),
      to: toAddress,
      value: this._web3.utils.toWei(amount.toString(), "ether"), // Amount in Eth, 1 eth = 10^9 gwei(1,000,000,000)
      gas: 21000, // Minimum / base gas fee is 21,000
      gasPrice: feeRate,
    };
    // console.log('Raw Transaction : ', rawTxDetails);
    return rawTxDetails;
  }

  async signAndSend(rawTxDetails: TransactionConfig) {
    const wallet = ethers.Wallet.fromMnemonic(this._mnemonic);
    const pvtKey = wallet.privateKey;
    const transaction = await this._web3.eth.accounts.signTransaction(
      rawTxDetails,
      pvtKey
    );
    // console.log('Transaction : ', transaction);

    const transactionResult = await this._web3.eth.sendSignedTransaction(
      transaction.rawTransaction as string
    );
    // console.log('Transaction details : ', transactionResult);
    return transactionResult.transactionHash;
  }
}
