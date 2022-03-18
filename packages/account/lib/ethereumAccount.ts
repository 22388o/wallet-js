import { EthereumWeb3 } from "@dojima-wallet/connection";
import { NetworkType } from "@dojima-wallet/types";
import * as ethers from "ethers";

export default class EthereumAccount extends EthereumWeb3 {
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
  }

  getAddress(): string {
    const account = ethers.Wallet.fromMnemonic(this._mnemonic);
    const address = account.address;
    return address;
  }
}
