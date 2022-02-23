import { ApiPromise, WsProvider } from "@polkadot/api";

export class PolkadotApi {
  _endpointUrl: string;
  constructor(endpointUrl: string) {
    this._endpointUrl = endpointUrl;
  }

  wsProvider() {
    const wsProvider = new WsProvider(this._endpointUrl);
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
