import { NetworkType } from "@dojima-wallet/types";
import { Client } from "@xchainjs/xchain-bitcoin";
import { BitcoinClient } from "@dojima-wallet/connection";

export default class BitcoinAccount {
  _mnemonic: string;
  _network: NetworkType;
  _client: Client;
  constructor(mnemonic: string, network: NetworkType) {
    this._mnemonic = mnemonic;
    this._network = network;
    this._client = new BitcoinClient(this._mnemonic, this._network).init();
  }

  create(): string {
    const address = this._client.getAddress();
    return address;
  }
}
