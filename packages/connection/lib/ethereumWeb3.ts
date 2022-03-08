import Web3 from "web3";
import { NetworkType } from "@dojima-wallet/types";

export default class EthereumWeb3 {
  _network: NetworkType;
  _providerRpcUrl: string;
  constructor(network: NetworkType) {
    this._network = network;
    this._providerRpcUrl =
      "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
    if (this._network === "testnet") {
      // For testnet using ropsten network with infura. There are others like goerli, kovan and rinkeby netwoks
      this._providerRpcUrl =
        "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161";
    }
  }

  init() {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(this._providerRpcUrl)
    );
    return web3;
  }
}
