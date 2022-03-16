import { NetworkType } from "@dojima-wallet/types";
import { getKeyFromMnemonic } from "arweave-mnemonic-keys";
import { ArweaveInitialise } from "@dojima-wallet/connection";
import Arweave from "arweave";

export default class ArweaveAccount extends ArweaveInitialise {
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
  }

  async create(): Promise<string> {
    const keyPair = await getKeyFromMnemonic(this._mnemonic);
    const address = await this._arweave.wallets.jwkToAddress(keyPair);
    return address;
  }

  async mintArTokens(arweave: Arweave) {
    const pvtKey = await getKeyFromMnemonic(this._mnemonic);
    // console.log('Pvt key is : ' + pvtKey);
    const pubAddress = await this._arweave.wallets.jwkToAddress(pvtKey);
    // console.log('Pub Address is : ' + pubAddress);

    // testnet tokens in winston
    const test_ar_amount = 5000000000000;

    // Mint balance in Arlocal for testing
    await arweave.api.get(`/mint/${pubAddress}/${test_ar_amount}`);
    await arweave.api.get("/mine");
  }
}
