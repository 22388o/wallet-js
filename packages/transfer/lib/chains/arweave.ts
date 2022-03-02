import Arweave from "arweave";

export class ArweaveChain {
  _arweave: Arweave;
  _key: any;
  _address: string;

  constructor(arweave: Arweave, pvtKey: any, pubKey: string) {
    this._arweave = arweave;
    this._key = pvtKey;
    this._address = pubKey;
  }

  async getBalance() {
    // testnet tokens in winston
    const test_ar_amount = 1000000000000;

    // Mint balance in Arlocal for testing
    await this._arweave.api.get(`/mint/${this._address}/${test_ar_amount}`);
    await this._arweave.api.get("/mine");

    // Get balance
    let wnstBalance = await this._arweave.wallets.getBalance(this._address);
    // console.log("Winston balance is : ", wnstBalance);

    // Convert balance from Winston to Ar. (1 Ar = 10^12)
    const arBalance = this._arweave.ar.winstonToAr(wnstBalance);
    // console.log("Ar balance is : ", arBalance);

    return arBalance;
  }

  async createTransactionAndSend(toAddress: string, amount: number) {
    // Create transaction
    const transaction = await this._arweave.createTransaction(
      {
        target: toAddress, // Receiver address
        quantity: this._arweave.ar.arToWinston(amount.toString()), // Amount to transfer in Ar
      },
      this._key
    );

    // Sign transaction and retreive status
    await this._arweave.transactions.sign(transaction, this._key);
    const status = await this._arweave.transactions.post(transaction);
    await this._arweave.api.get("/mine");
    // console.log("transfer status", status);

    if (status.status == 200) {
      // console.log("Transaction Hash / Id is : " + transaction.id);
      // Get status data using transaction hash / id
      const statusData = await this._arweave.transactions.getStatus(
        transaction.id
      );

      // console.log(JSON.stringify(statusData));

      return {
        transaction,
        statusData,
      };
    } else {
      console.log("Error in status");
    }
  }
}
