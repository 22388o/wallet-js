import Arweave from "arweave";
import { NetworkType } from "@dojima-wallet/types/dist/lib/network";

export default class ArweaveInitialise {
  _mnemonic: string;
  _arweave: Arweave;

  constructor(mnemonic: string, network: NetworkType) {
    this._mnemonic = mnemonic;
    // Mainnet
    this._arweave = Arweave.init({
      host: "htts://arweave.net/",
      protocol: "https",
      timeout: 100000,
    });
    if (network === "testnet") {
      // Testnet
      this._arweave = Arweave.init({
        host: "localhost",
        port: "1984",
        protocol: "http",
        timeout: 100000,
      });
    }
  }
  async init() {
    const arweave = this._arweave;
    return arweave;
  }
}
