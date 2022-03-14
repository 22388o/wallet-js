import Web3 from "web3";
import * as ethers from "ethers";
import { NetworkType } from "@dojima-wallet/types/dist/lib/network";
import { EthereumWeb3 } from "@dojima-wallet/connection";
import { BigNumber } from "bignumber.js";
import { TransactionConfig } from "web3-core";

export default class EthereumChain extends EthereumWeb3 {
  _pubKey: string;
  _pvtKey: string;
  constructor(mnemonic: string, network: NetworkType) {
    super(network);

    // Wallet details
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    this._pubKey = wallet.address;
    this._pvtKey = wallet.privateKey;
    // console.log('Key details : ', this._pvtKey);
    // console.log('Address details : ', this._pubKey);
  }

  async getBalance(web3: Web3) {
    const gweiBalance = await web3.eth.getBalance(this._pubKey);
    // console.log('Balance in gwei is : ', gweiBalance);     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)

    const ethBalance = web3.utils.fromWei(gweiBalance);
    // console.log('Balance in Eth is : ', ethBalance);     // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)

    return ethBalance;
  }

  // Calculate 'gasFee' based on multiplier
  calculateFee(baseGasFee: number, multiplier: number) {
    const fee = new BigNumber(baseGasFee)
      .times(new BigNumber(multiplier))
      .toNumber();
    return fee;
  }

  // Calculate gasFee required for transaction
  async getGasFee(web3: Web3) {
    const baseGasFee = await web3.eth.getGasPrice();
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
  createTransaction(
    toAddress: string,
    amount: number,
    web3: Web3,
    feeRate: number
  ) {
    let rawTxDetails = {
      from: this._pubKey,
      to: toAddress,
      value: web3.utils.toWei(amount.toString(), "ether"), // Amount in Eth, 1 eth = 10^9 gwei(1,000,000,000)
      gas: 21000, // Minimum / base gas fee is 21,000
      gasPrice: feeRate,
    };
    // console.log('Raw Transaction : ', rawTxDetails);
    return rawTxDetails;
  }

  async signAndSend(rawTxDetails: TransactionConfig, web3: Web3) {
    const transaction = await web3.eth.accounts.signTransaction(
      rawTxDetails,
      this._pvtKey
    );
    // console.log('Transaction : ', transaction);

    const transactionResult = await web3.eth.sendSignedTransaction(
      transaction.rawTransaction as string
    );
    // console.log('Transaction details : ', transactionResult);
    return transactionResult.transactionHash;
  }
}
