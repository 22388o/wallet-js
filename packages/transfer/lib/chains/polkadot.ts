import { ApiPromise } from "@polkadot/api";
import { Keyring } from "@polkadot/keyring";
import { KeyringPair } from "@polkadot/keyring/types";
import "@polkadot/api-augment";

export class PolkadotChain {
  _mnemonic: string;
  _account: KeyringPair;
  _api: ApiPromise;
  constructor(mnemonic: string, api: ApiPromise) {
    this._mnemonic = mnemonic;

    // Constuct the keyring after the API
    const keyring = new Keyring({ type: "sr25519" });
    // const keyring = new Keyring({ type: 'ed25519' }); // default type 'ed25519'

    // Account details
    this._account = keyring.addFromMnemonic(this._mnemonic);

    this._api = api;
  }

  // Get balance of the user
  async getBalance() {
    let balance = (
      await this._api.derive.balances.all(this._account.address)
    ).availableBalance.toNumber();
    balance = balance / Math.pow(10, 12); // Balance is retrieved as >12 number so converted to original WSD tokens
    console.log(balance);
    return balance;
  }

  // Create transaction and send tokens.
  async createTransactionAndSend(toAddress: string, amount: number) {
    // Get a random number between 1 and 10000000000
    const randomAmount = Math.floor(Math.random() * 10000000000 + 1);
    console.log("Random Amount : " + randomAmount);

    const { nonce: nonce } = await this._api.query.system.account(
      this._account.address
    );
    console.log("Nonce : " + nonce);

    // Create transaction
    const transferDetails = this._api.tx.balances.transfer(
      toAddress,
      randomAmount
    ); // randomAmount is just for testing. Use 'number' for mainnet

    // Add signature for transaction
    const signer = this._api.createType(
      "SignerPayload",
      {
        method: transferDetails,
        nonce: nonce.toHex(),
        runtimeVersion: this._api.runtimeVersion,
        genesisHash: this._api.genesisHash,
        blockHash: this._api.genesisHash,
      },
      { version: this._api.extrinsicVersion }
    );
    // console.log('Signer : '+signer);

    const { signature } = this._api
      .createType("ExtrinsicPayload", signer.toPayload(), {
        version: this._api.extrinsicVersion,
      })
      .sign(this._account);
    // console.log('Signature is : '+signature);

    transferDetails.addSignature(
      this._account.address,
      signature,
      signer.toPayload()
    );

    try {
      const transactionDetails = await transferDetails.send();
      console.log("Transaction details : " + transactionDetails);
      return transactionDetails;
    } catch (error) {
      console.log("Error : " + error);
    }
  }
}
