import { NetworkType } from "@dojima-wallet/types";
// import { Client } from "@xchainjs/xchain-bitcoin";
import { BitcoinClient } from "@dojima-wallet/connection";

export default class BitcoinAccount extends BitcoinClient {
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
  }

  getAddress(): string {
    const address = this._client.getAddress();
    return address;
  }
}
