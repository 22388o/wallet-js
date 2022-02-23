import { ApiPromise, WsProvider } from "@polkadot/api";

export class PolkadotApi {
  _rpcUrl: string;
  constructor(rpcUrl: string) {
    this._rpcUrl = rpcUrl;
  }

  wsProvider() {
    const wsProvider = new WsProvider(this._rpcUrl);
    return wsProvider;
  }

  apiPromise() {
    const apiProvider = new ApiPromise({ provider: this.wsProvider() });
    return apiProvider;
  }

  async init() {
    const api = new ApiPromise({ provider: this.wsProvider() });
    await api.isReady;
    return api;
  }
}
