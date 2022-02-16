import * as web3 from '@solana/web3.js';

export default async function solana() {
  var connection = new web3.Connection(
    web3.clusterApiUrl('devnet'),
    'confirmed'
  );

  // Generate a new wallet keypair and airdrop SOL
  var wallet = web3.Keypair.generate();
  var airdropSignature = await connection.requestAirdrop(
    wallet.publicKey,
    web3.LAMPORTS_PER_SOL
  );
  console.log(wallet.publicKey);

  //wait for airdrop confirmation
  await connection.confirmTransaction(airdropSignature);

  // Get account balance
  var balance = await connection.getBalance(wallet.publicKey);
  console.log(balance);

  // get account info
  // account data is bytecode that needs to be deserialized
  // serialization and deserialization is program specific
  let account = await connection.getAccountInfo(wallet.publicKey);
  console.log(account);

  var to = web3.Keypair.generate();

  // Add transfer instruction to transaction
  var transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: to.publicKey,
      lamports: web3.LAMPORTS_PER_SOL / 100,
    })
  );

  // Sign transaction, broadcast, and confirm
  var signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [wallet]
  );
  console.log('SIGNATURE', signature);
}
