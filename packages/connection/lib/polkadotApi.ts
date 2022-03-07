import { ApiPromise, WsProvider } from "@polkadot/api";
import { NetworkType } from "@dojima-wallet/types";

export default class PolkadotApi {
  _endpointUrl: string;
  constructor(network: NetworkType) {
    this._endpointUrl = "wss://rpc.polkadot.io";
    if (network === "testnet") {
      this._endpointUrl = "wss://westend-rpc.polkadot.io";
    } else if (network === "mainnet") {
      this._endpointUrl = "wss://rpc.polkadot.io";
    }
  }

  wsProvider() {
    const wsProvider = new WsProvider(this._endpointUrl);
    return wsProvider;
  }

  async init() {
    const api = new ApiPromise({ provider: this.wsProvider() });
    await api.isReady;
    return api;
  }
}
