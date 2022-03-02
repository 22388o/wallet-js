import Web3 from "web3";
import * as bip39 from "bip39";
import { hdkey } from "ethereumjs-wallet";

export default class EthereumWeb3 {
  _mnemonic: string;
  constructor(mnemonic: string) {
    this._mnemonic = mnemonic;
  }

  async init() {
    // For testing using ropsten network with infura
    // HttpProvider ---> (goerli url with infura - /https://ropsten.infura.io/v3') / (infura project id - f37faaf5ddeb4e589d6f26300ed673a6)
    // const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/f37faaf5ddeb4e589d6f26300ed673a6'));
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
      )
    );

    // Generate wallet details
    var path = "m/44'/60'/0'/0/0";
    var key = await bip39.mnemonicToSeed(this._mnemonic);
    var hdwallet = hdkey.fromMasterSeed(key);
    var walletDetails = hdwallet.derivePath(path).getWallet();

    return {
      web3,
      walletDetails,
    };
  }
}
