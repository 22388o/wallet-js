import Web3 from "web3";
import { NetworkType } from "@dojima-wallet/types";

export default class EthereumWeb3 {
  _network: NetworkType;
  _mnemonic: string;
  _providerRpcUrl: string;
  public _web3: Web3;
  constructor(mnemonic: string, network: NetworkType) {
    this._network = network;
    this._mnemonic = mnemonic;
    if (this._network === "testnet" || this._network === "devnet") {
      // For testnet using ropsten network with infura. There are others like goerli, kovan and rinkeby netwoks
      this._providerRpcUrl =
        "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
    } else {
      this._providerRpcUrl =
        "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
    }
    this._web3 = new Web3(
      new Web3.providers.HttpProvider(this._providerRpcUrl)
    );
  }
}
