import Arweave from "arweave";
import { NetworkType } from "@dojima-wallet/types";

export default class ArweaveInitialise {
  _mnemonic: string;
  public _arweave: Arweave;
  _network: NetworkType;

  constructor(mnemonic: string, network: NetworkType) {
    this._mnemonic = mnemonic;
    this._network = network;
    if (this._network === "testnet" || this._network === "devnet") {
      // Testnet
      this._arweave = Arweave.init({
        host: "localhost",
        port: "1984",
        protocol: "http",
        timeout: 100000,
      });
    } else if (this._network === "mainnet") {
      // Mainnet
      this._arweave = Arweave.init({
        host: "arweave.net",
        protocol: "https",
        timeout: 100000,
      });
    }
  }

  init() {
    const arweave = this._arweave;
    return arweave;
  }
}
