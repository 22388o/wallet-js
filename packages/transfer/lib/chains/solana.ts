import { SolanaAccount } from "@dojima-wallet/account";
import { NetworkType } from "@dojima-wallet/types";
import * as web3 from "@solana/web3.js";

export default class SolanaChain extends SolanaAccount {
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
  }

  async getBalance(): Promise<number> {
    // Get account details
    const pubKey = new web3.PublicKey(await this.getAddress());

    // Retrieve user token balance
    let balance = await this._connection.getBalance(pubKey);
    balance = balance / Math.pow(10, 9);
    return balance;
  }

  // Get recent block hash for calculating gas fee
  async getRecentBlockHash() {
    const blockHash = await this._connection.getRecentBlockhash();
    return blockHash;
  }

  // Calculate Gas fee based in recent block hash
  async getFees() {
    const { feeCalculator } = await this.getRecentBlockHash();
    return {
      slow: {
        fee: feeCalculator.lamportsPerSignature,
      },
      average: {
        fee: feeCalculator.lamportsPerSignature,
      },
      fast: {
        fee: feeCalculator.lamportsPerSignature,
      },
    };
  }

  // Create transaction details based on user input
  async createTransaction(
    toAddress: string,
    amount: number
  ): Promise<web3.Transaction> {
    // Get account address
    const pubKey = new web3.PublicKey(await this.getAddress());

    // Convert toAddress string to PublicKey
    const to = new web3.PublicKey(toAddress);

    const toAmount = amount * Math.pow(10, 9);
    // console.log('To Amount : ' , toAmount);

    // Add transaction for the required amount
    let rawTx = new web3.Transaction().add(
      web3.SystemProgram.transfer({
        fromPubkey: pubKey,
        toPubkey: to,
        lamports: toAmount,
      })
    );

    return rawTx;
  }

  async signAndSend(rawTx: web3.Transaction): Promise<string> {
    // Get account details
    const account = await this.solAcc();

    // Sign the transaction
    let signature = await web3.sendAndConfirmTransaction(
      this._connection,
      rawTx,
      [account[0]]
    );

    return signature;
  }
}
