import Web3 from "web3";
import Wallet from "ethereumjs-wallet";

export default class EthereumChain {
  _wallet: Wallet;
  _web3: Web3;
  pubKey: string;
  pvtKey: string;
  constructor(web3: Web3, wallet: Wallet) {
    this._web3 = web3;
    this._wallet = wallet;
    this.pubKey = wallet.getAddressString();
    this.pvtKey = wallet.getPrivateKeyString();
  }

  async getBalance() {
    const gweiBalance = await this._web3.eth.getBalance(this.pubKey);
    // console.log("Balance in gwei is : ", gweiBalance); // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)

    const ethBalance = this._web3.utils.fromWei(gweiBalance);
    // console.log("Balance in Eth is : ", ethBalance); // Results balance in gwei, 1 eth = 10^9 gwei(1,000,000,000)

    return ethBalance;
  }

  async createTransactionAndSend(toAddress: string, amount: number) {
    const transaction = await this._web3.eth.accounts.signTransaction(
      {
        from: this.pubKey,
        to: toAddress,
        value: this._web3.utils.toWei(amount.toString(), "ether"), // Amount in Eth, 1 eth = 10^9 gwei(1,000,000,000)
        gas: 21000, // Minimum / base gas fee is 21,000
      },
      this.pvtKey
    );
    // console.log("Transaction : ", transaction);

    const transactionResult = await this._web3.eth.sendSignedTransaction(
      transaction.rawTransaction as string
    );
    // console.log("Transaction details : ", transactionResult);

    return {
      transaction,
      transactionResult,
    };
  }
}
