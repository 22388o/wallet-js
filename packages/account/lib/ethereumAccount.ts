import * as ethers from "ethers";

export default class EthereumAccount {
  _mnemonic: string;
  constructor(mnemonic: string) {
    this._mnemonic = mnemonic;
  }

  create(): string {
    const account = ethers.Wallet.fromMnemonic(this._mnemonic);
    const address = account.address;
    return address;
  }
}
