import Arweave from "arweave";
import { getKeyFromMnemonic } from "arweave-mnemonic-keys";
import { NetworkType } from "@dojima-wallet/types/dist/lib/network";

export default class ArweaveInitialise {
  _mnemonic: string;
  _arweave: Arweave;
  _network: NetworkType;

  constructor(mnemonic: string, network: NetworkType) {
    this._mnemonic = mnemonic;
    this._network = network;
    // Mainnet
    this._arweave = Arweave.init({
      host: "htts://arweave.net/",
      protocol: "https",
      timeout: 100000,
    });
    if (this._network === "testnet") {
      // Testnet
      this._arweave = Arweave.init({
        host: "localhost",
        port: "1984",
        protocol: "http",
        timeout: 100000,
      });
    }
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
  async init() {
    const arweave = this._arweave;
    return arweave;
  }
}
