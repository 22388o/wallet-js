import { NetworkType } from "@dojima-wallet/types";
import * as web3 from "@solana/web3.js";

export default class SolanaConnection {
  _network: NetworkType;
  _cluster: web3.Cluster;
  constructor(network: NetworkType) {
    this._network = network;
    this._cluster = "mainnet-beta";
    if (this._network === "devnet") {
      this._cluster = "devnet";
    } else if (this._network === "testnet") {
      this._cluster = "testnet";
    }
  }

  init() {
    const connection = new web3.Connection(
      web3.clusterApiUrl(this._cluster),
      "confirmed"
    );
    return connection;
  }
}
