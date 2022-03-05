import Web3 from "web3";
import * as ethers from "ethers";
import { NetworkType } from "@dojima-wallet/types/dist/lib/network";
import EthereumWeb3 from "../utils/ethereum_web3";

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

  async createTransactionAndSend(
    toAddress: string,
    amount: number,
    web3: Web3
  ) {
    const transaction = await web3.eth.accounts.signTransaction(
      {
        from: this._pubKey,
        to: toAddress,
        value: web3.utils.toWei(amount.toString(), "ether"), // Amount in Eth, 1 eth = 10^9 gwei(1,000,000,000)
        gas: 21000, // Minimum / base gas fee is 21,000
      },
      this._pvtKey
    );
    // console.log('Transaction : ', transaction);

    const transactionResult = await web3.eth.sendSignedTransaction(
      transaction.rawTransaction as string
    );
    // console.log('Transaction details : ', transactionResult);

    return {
      transaction,
      transactionResult,
    };
  }
}
