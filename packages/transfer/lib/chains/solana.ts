import * as web3 from "@solana/web3.js";

export class SolanaChain {
  _wallet: web3.Keypair;
  _connection: web3.Connection;
  _airdropSignature: string;

  constructor(
    wallet: web3.Keypair,
    connection: web3.Connection,
    airdropSignature: string
  ) {
    this._wallet = wallet;
    this._connection = connection;
    this._airdropSignature = airdropSignature;
  }

  async getBalance() {
    // Retrieve user token balance
    let balance = await this._connection.getBalance(this._wallet.publicKey);
    console.log("Balance is : " + balance);

    return balance;
  }

  async createTransactionAndSend(toAddress: string, amount: number) {
    // Convert toAddress string to PublicKey
    const to = new web3.PublicKey(toAddress);

    // Add transaction for the required amount
    let transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: this._wallet.publicKey,
        toPubkey: to,
        lamports: amount,
      })
    );

    // Sign the transaction
    let signature = await web3.sendAndConfirmTransaction(
      this._connection,
      transaction,
      [this._wallet]
    );
    console.log("Transaction details: " + JSON.stringify(transaction));
    console.log("Transaction hash : " + signature);

    return {
      signature,
      transaction,
    };
  }
}
