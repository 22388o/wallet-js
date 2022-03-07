import { NetworkType } from "@dojima-wallet/types";
import Arweave from "arweave";
import { getKeyFromMnemonic } from "arweave-mnemonic-keys";
import { ArweaveInitialise } from "@dojima-wallet/connection";

export default class ArweaveAccount {
  _mnemonic: string;
  _network: NetworkType;
  _arweave: Arweave;
  constructor(mnemonic: string, network: NetworkType) {
    this._mnemonic = mnemonic;
    this._network = network;
    this._arweave = new ArweaveInitialise(this._mnemonic, this._network).init();
  }

  async create(): Promise<string> {
    const keyPair = await getKeyFromMnemonic(this._mnemonic);
    const address = await this._arweave.wallets.jwkToAddress(keyPair);
    return address;
  }
}
