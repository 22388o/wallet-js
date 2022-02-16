import * as bip39 from 'bip39'
// import Web3 from 'web3'
// import { Account } from 'web3-core'
import BIP32Factory from 'bip32'
import {payments, networks} from 'bitcoinjs-lib'
import * as ecc from 'tiny-secp256k1';
import { Keypair } from '@solana/web3.js'
import { Keyring } from '@polkadot/api';
import { mnemonicValidate } from '@polkadot/util-crypto';
import Arweave from 'arweave'
import { getKeyFromMnemonic } from "arweave-mnemonic-keys"
import { hdkey } from "ethereumjs-wallet"

const arweave = Arweave.init({});
const bip32 = BIP32Factory(ecc);

async function getArweave(mnemonic: string) {
    // Generate new account
    // const key = arweave.wallets.generate()

    const keyPair = await getKeyFromMnemonic(mnemonic)

    for(var key in keyPair) {
        console.log(`${key} : ${keyPair[key]}`);
    }

    const address = await arweave.wallets.jwkToAddress(keyPair)

    return address
}

function getPolkadot(mnemonic: string) {
    const keyring = new Keyring() // default type "ed25519"
    // For specific type of keyring
    // const keyring = new Keyring({ type: "sr25519" });

    // Create mnemonic string
    // const mnemonic = mnemonicGenerate();
    // console.log(`Generated mnemonic: ${mnemonic}`);

    const isValidMnemonic = mnemonicValidate(mnemonic);
    if (!isValidMnemonic) {
      throw Error('Invalid Mnemonic')
    }

    // Add an account derived from the mnemonic
    const account = keyring.addFromUri(mnemonic);
    const address = account.address;
    const jsonWallet = JSON.stringify(keyring.toJson(address), null, 2)

    return jsonWallet
    
}

function getSolana(mnemonic: string) {
    // For 64-byte Uint8Array
    // const seed = bip39.mnemonicToSeedSync(mnemonic)

    // For 32-byte Uint8Array
    const seed = bip39.mnemonicToSeedSync(mnemonic).slice(0,32)

    const solanaAccount = Keypair.fromSeed(seed)

    // To get keypair from already having secretkey
    
    // let secretkey = Uint8Array.from(solanaAccount.secretKey)
    // let keypair = Keypair.fromSecretKey(secretkey)

    const publicKey = solanaAccount.publicKey.toString()
    const privateKey = solanaAccount.secretKey.toString()
    
    console.log([publicKey, privateKey]);

    return solanaAccount
}

function getBitcoin(mnemonic: string) {
    //Define the network
    const network = networks.testnet //use networks.bitcoin for mainnet

    // Derivation path
    const path = `m/49'/1'/0'/0` // Use m/49'/0'/0'/0 for mainnet

    const seed = bip39.mnemonicToSeedSync(mnemonic)
    var root = bip32.fromSeed(seed, network)

    var account = root.derivePath(path)
    var node = account.derive(0).derive(0)
    
    var btcAddress = payments.p2pkh({
        pubkey: node.publicKey,
        network: network,
    }).address

    const btcAccount = 'Wallet generated is : '+'  - Address  : '+btcAddress+'  - Key  :' + node.toWIF()+'  -Mnemonic  :' + mnemonic
    return btcAccount
}

async function getEthereum(mnemonic: string) {
    // Create new account
    // var web3 = new Web3(Web3.givenProvider || 'https://rpc-mumbai.maticvigil.com/')
    // var ethAccount = web3.eth.accounts.create();

    var path = "m/44'/60'/0'/0/0";
    var key = await bip39.mnemonicToSeed(mnemonic)
    var hdwallet = hdkey.fromMasterSeed(key);
    var wallet = hdwallet.derivePath(path).getWallet();
    var address = "0x" + wallet.getAddress().toString("hex");
    return address;
}

export default async function createAccount() {
    
    const mnemonic = bip39.generateMnemonic()

    console.log("Mnemonic generated : " + mnemonic);
    console.log("_________Bitcoin Account_________");
    console.log(getBitcoin(mnemonic));
    console.log("_________Solana Account_________");
    console.log(getSolana(mnemonic));
    console.log("_________Polkadot Account_________");
    console.log(getPolkadot(mnemonic));
    console.log("_________Arweave Account_________");
    try {
        let res = await getArweave(mnemonic);
        console.log("Result is -- "+res);
    } catch (error) {
        console.log(error);
    }
    console.log("_________Ethereum Mnemonic Account_________");
    try {
        let res = await getEthereum(mnemonic);
        console.log("Result -- "+res);
    } catch (error) {
        console.log(error);
    }
}