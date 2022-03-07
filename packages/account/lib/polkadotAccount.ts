import { NetworkType } from "@dojima-wallet/types";
import { Keyring } from "@polkadot/api";
import { cryptoWaitReady } from "@polkadot/util-crypto";
import { KeypairType } from "@polkadot/util-crypto/types";

export default class PolkadotAccount {
  _mnemonic: string;
  _network: NetworkType;
  constructor(mnemonic: string, network: NetworkType) {
    this._mnemonic = mnemonic;
    this._network = network;
  }

  async create(type: KeypairType): Promise<string> {
    await cryptoWaitReady();
    const keyring = new Keyring({ type: type });
    const account = keyring.addFromMnemonic(this._mnemonic);
    const address = account.address;

    return address;
  }
}
