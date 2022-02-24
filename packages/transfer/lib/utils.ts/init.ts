import Arweave from "arweave";
import { getKeyFromMnemonic } from "arweave-mnemonic-keys";

export class ArweaveInit {
  _mnemonic: string;
  // Testnet
  _arweave = Arweave.init({
    host: "localhost",
    port: "1984",
    protocol: "http",
    timeout: 100000,
  });
  // Mainnet
  // arweave = Arweave.init({
  //     host: "htts://arweave.net/",
  //     protocol: "https",
  //     timeout: 100000,
  // });

  constructor(mnemonic: string) {
    this._mnemonic = mnemonic;
  }

  async init() {
    const privateKeyJson = await getKeyFromMnemonic(this._mnemonic);

    // for(var key in keyPair) {
    //     console.log(`${key} : ${keyPair[key]}`);
    // }
    console.log(JSON.stringify(privateKeyJson));

    const publicAddress = await this._arweave.wallets.jwkToAddress(
      privateKeyJson
    );
    const arweave = this._arweave;
    return {
      arweave,
      privateKeyJson,
      publicAddress,
    };
  }
}
