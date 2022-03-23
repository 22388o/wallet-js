import { AbiItem } from "web3-utils";
import { contractData, tokenList, minABI } from "./utils";
import { EthereumAccount } from "@dojima-wallet/account";
import { NetworkType } from "@dojima-wallet/types";

export default class Erc20TokenBalance extends EthereumAccount {
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
  }

  async getBalance(token: tokenList, walletAddress?: string): Promise<string> {
    const contract = new this._web3.eth.Contract(
      minABI as AbiItem[],
      contractData[`${token}`].contractAddress
    );
    var balance: number =
      (await contract.methods
        .balanceOf(walletAddress ? walletAddress : this.getAddress())
        .call()) / Math.pow(10, contractData[`${token}`].decimal);
    return (
      Number(balance).toFixed(4) + " " + contractData[`${token}`].tokenSymbol
    );
  }
}
