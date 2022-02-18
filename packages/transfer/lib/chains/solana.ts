import * as web3 from "@solana/web3.js";

export class SolanaChain {
  _wallet: web3.Keypair;
  constructor(wallet: web3.Keypair) {
    this._wallet = wallet;
  }

  connection = new web3.Connection(web3.clusterApiUrl("devnet"), "confirmed");

  async airdropSignature() {
    const airdropSignature = await this.connection.requestAirdrop(
      this._wallet.publicKey,
      web3.LAMPORTS_PER_SOL // Initial one dummy sol token
    );
    return airdropSignature;
  }

  async getBalance() {
    let balance = await this.connection.getBalance(this._wallet.publicKey);
    return balance;
  }

  // get account info
  // account data is bytecode that needs to be deserialized
  // serialization and deserialization is program specific
  async getAccountInfo() {
    let account = await this.connection.getAccountInfo(this._wallet.publicKey);
    return account;
  }

  // Add transfer instruction to transaction
  transferTokens(to: web3.Keypair, amount: number) {
    const toAddress = to.publicKey;
    const _amount = amount;
    let transaction = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: this._wallet.publicKey,
        toPubkey: toAddress,
        lamports: _amount,
      })
    );
    return transaction;
  }

  // Sign transaction, broadcast, and confirm
  async confirmTransaction(transaction: web3.Transaction) {
    let signature = await web3.sendAndConfirmTransaction(
      this.connection,
      transaction,
      [this._wallet]
    );
    return signature;
  }

  async getSolanaDetails() {
    // Provide receiver address
    const to = web3.Keypair.generate();

    const airdrop = await this.airdropSignature();

    await this.connection.confirmTransaction(airdrop);

    let balance = await this.getBalance();
    const accountInfo = await this.getAccountInfo();
    const transactionDetails = this.transferTokens(to, 1000000000 / 500); // Send SOL tokens for example
    const signAddress = await this.confirmTransaction(transactionDetails); // transaction hash

    // console.log(this._wallet.publicKey.toString());
    // console.log(balance);
    // console.log(accountInfo);
    // console.log(transactionDetails);
    // console.log(signAddress);

    return {
      balance,
      accountInfo,
      transactionDetails,
      signAddress,
    };
  }
}
