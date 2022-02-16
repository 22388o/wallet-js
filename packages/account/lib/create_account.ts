import * as bip39 from 'bip39';
import { Keypair } from '@solana/web3.js';
import Arweave from 'arweave';
import { getKeyFromMnemonic } from 'arweave-mnemonic-keys';
import { Keyring } from '@polkadot/api';
import { mnemonicValidate } from '@polkadot/util-crypto';
import BIP32Factory from 'bip32';
import { payments, networks } from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';
import { hdkey } from 'ethereumjs-wallet';
import { NetworkType } from '@dojima-wallet/types/dist/lib/network';

export default class CreateAccount {
  _mnemonic: string;
  network: string;
  //arweave configuration to talk to blockchain
  arweave = Arweave.init({
    host: 'htts://arweave.net/',
    protocol: 'https',
    timeout: 100000,
  });
  bip32 = BIP32Factory(ecc);

  constructor(mnemonic: string, network: NetworkType) {
    this._mnemonic = mnemonic;
    this.network = network;
  }

  async getArweave(): Promise<string> {
    const keyPair = await getKeyFromMnemonic(this._mnemonic);
    for (const key in keyPair) {
      console.log(`${key} : ${keyPair[key]}`);
    }
    const address = await this.arweave.wallets.jwkToAddress(keyPair);
    return address;
  }

  getBitcoin(_network: networks.Network) {
    //Define the network
    const network = _network;

    // Derivation path
    const path = `m/49'/1'/0'/0`; // Use m/49'/0'/0'/0 for mainnet
    const seed = bip39.mnemonicToSeedSync(this._mnemonic);
    var root = this.bip32.fromSeed(seed, network);
    var account = root.derivePath(path);
    var node = account.derive(0).derive(0);
    var btcAddress = payments.p2pkh({
      pubkey: node.publicKey,
      network: network,
    }).address;
    // const btcAccount =
    //   'Wallet generated is : ' +
    //   '  - Address  : ' +
    //   btcAddress +
    //   '  - Key  : ' +
    //   node.toWIF() +
    //   '  - Mnemonic  : ' +
    //   this._mnemonic;
    return btcAddress;
  }

  async getEthereum() {
    // Create new account
    // var web3 = new Web3(Web3.givenProvider || 'https://rpc-mumbai.maticvigil.com/')
    // var ethAccount = web3.eth.accounts.create();

    var path = "m/44'/60'/0'/0/0";
    var key = await bip39.mnemonicToSeed(this._mnemonic);
    var hdwallet = hdkey.fromMasterSeed(key);
    var wallet = hdwallet.derivePath(path).getWallet();
    var address = '0x' + wallet.getAddress().toString('hex');
    return address;
  }

  getPolkadot() {
    const keyring = new Keyring(); // default type "ed25519"
    // For specific type of keyring
    // const keyring = new Keyring({ type: "sr25519" });

    // Create mnemonic string
    // const mnemonic = mnemonicGenerate();

    const isValidMnemonic = mnemonicValidate(this._mnemonic);
    if (!isValidMnemonic) {
      throw Error('Invalid Mnemonic');
    }

    // Add an account derived from the mnemonic
    const account = keyring.addFromUri(this._mnemonic);
    const address = account.address;
    const jsonWallet = JSON.stringify(keyring.toJson(address), null, 2);
    return jsonWallet;
  }

  getSolana() {
    const seed = bip39.mnemonicToSeedSync(this._mnemonic).slice(0, 32);
    const solanaAccount = Keypair.fromSeed(seed);
    const publicKey = solanaAccount.publicKey.toString();
    const privateKey = Buffer.from(solanaAccount.secretKey).toString('base64');
    console.log([publicKey, privateKey]);
    return solanaAccount;
  }

  async create() {
    const network = this.network ?? 'mainnet';

    const bitcoinNetwork =
      network === 'mainnet' ? networks.bitcoin : networks.testnet;

    const aacc = await this.getArweave();
    const bacc = this.getBitcoin(bitcoinNetwork);
    const eacc = await this.getEthereum();
    const pacc = this.getPolkadot();
    const sacc = this.getSolana();

    return [aacc, bacc, eacc, pacc, [sacc.publicKey, sacc.secretKey]];
  }
}
