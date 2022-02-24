import Arweave from "arweave";

export class ArweaveChain {
  _mnemonic: string;
  _key: any;
  _address: string;
  // Testnet
  arweave = Arweave.init({
    host: "localhost",
    port: "1984",
    protocol: "http",
    timeout: 100000,
  });
  // Mannet
  // arweave = Arweave.init({
  //     host: "htts://arweave.net/",
  //     protocol: "https",
  //     timeout: 100000,
  // });
  constructor(mnemonic: string, pvtKey: any, pubKey: string) {
    this._mnemonic = mnemonic;
    this._key = pvtKey;
    this._address = pubKey;
  }

  async getBalance() {
    // testnet tokens in winston
    const test_ar_amount = 1000000000000;

    // Mint balance in Arlocal for testing
    await this.arweave.api.get(`/mint/${this._address}/${test_ar_amount}`);
    await this.arweave.api.get("/mine");

    // Get balance
    let wnstBalance = await this.arweave.wallets.getBalance(this._address);
    console.log("Winston balance is : " + wnstBalance);

    // Convert balance from Winston to Ar. (1 Ar = 10^12)
    const arBalance = this.arweave.ar.winstonToAr(wnstBalance);
    console.log("Ar balance is : " + arBalance);

    return arBalance;
  }

  async createTransactionAndSend(toAddress: string, amount: number) {
    // Create transaction
    const transaction = await this.arweave.createTransaction(
      {
        target: toAddress, // Receiver address
        quantity: this.arweave.ar.arToWinston(amount.toString()), // Amount to transfer in Ar
      },
      this._key
    );

    // Sign transaction and retreive status
    await this.arweave.transactions.sign(transaction, this._key);
    const status = await this.arweave.transactions.post(transaction);
    await this.arweave.api.get("/mine");
    console.log("Transfer status", status);

    if (status.status == 200) {
      console.log("Transaction Hash / Id is : " + transaction.id);

      const statusData = await this.arweave.transactions.getStatus(
        transaction.id
      );

      console.log(JSON.stringify(statusData));

      return {
        transaction,
        statusData,
      };
    } else {
      console.log("Error in status");
    }
  }
}
