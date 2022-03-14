import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { contractAddress, tokensNames, minABI } from "./utils";
export default class Balance {
  _provrider: string;
  _web3Client: Web3;
  constructor(provider: string) {
    this._provrider = provider;
    this._web3Client = new Web3(this._provrider);
  }

  async getBalance(token: tokensNames, walletAddress: string) {
    const contract = new this._web3Client.eth.Contract(
      minABI as AbiItem[],
      contractAddress[token]
    );
    const weiBalance = await contract.methods.balanceOf(walletAddress).call(); // 29803630997051883414242659

    const balance = this._web3Client.utils.fromWei(weiBalance); // 29803630.997051883414242659

    console.log(balance);
    return balance;
  }
}
