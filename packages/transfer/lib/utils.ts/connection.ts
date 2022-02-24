import * as web3 from "@solana/web3.js";

export class SolanaConnection {
  _wallet: web3.Keypair;
  constructor(wallet: web3.Keypair) {
    this._wallet = wallet;
  }

  async init() {
    const connection = new web3.Connection(
      web3.clusterApiUrl("devnet"),
      "confirmed"
    );
    const airdropSignature = await connection.requestAirdrop(
      this._wallet.publicKey,
      web3.LAMPORTS_PER_SOL // Initial one dummy sol token
    );
    return {
      connection,
      airdropSignature,
    };
  }
}
