import { SolanaAccount } from "@dojima-wallet/account";
import { SolanaConnection } from "@dojima-wallet/connection";
import { NetworkType } from "@dojima-wallet/types";
import * as web3 from "@solana/web3.js";

export class SolanaChain extends SolanaConnection {
  _mnemonic: string;

  constructor(mnemonic: string, network: NetworkType) {
    super(network);
    this._mnemonic = mnemonic;
  }

  async getBalance(connection: web3.Connection) {
    // Get account details
    const account = await new SolanaAccount(this._mnemonic).solAcc();
    const pubKey = new web3.PublicKey(account[0].publicKey.toString());

    // Retrieve user token balance
    let balance = await connection.getBalance(pubKey);
    balance = balance / Math.pow(10, 9);
    // console.log('Balance is : ', balance);

    return balance;
  }

  async createTransactionAndSend(
    toAddress: string,
    amount: number,
    connection: web3.Connection
  ) {
    // Get account details
    const account = await new SolanaAccount(this._mnemonic).solAcc();
    const pubKey = new web3.PublicKey(account[0].publicKey.toString());

    // Convert toAddress string to PublicKey
    const to = new web3.PublicKey(toAddress);

    const toAmount = amount * Math.pow(10, 9);
    // console.log('To Amount : ' , toAmount);

    // Add transaction for the required amount
    let transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: pubKey,
        toPubkey: to,
        lamports: toAmount,
      })
    );

    // Sign the transaction
    let signature = await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [account[0]]
    );
    // console.log('Transaction details: ', JSON.stringify(transaction));
    // console.log('Transaction hash : ', signature);

    return {
      signature,
      transaction,
    };
  }
}
