import { CreateAccount } from "./create_account";
import * as bip39 from 'bip39'

let mnemonic = bip39.generateMnemonic()

export const account = new CreateAccount(mnemonic)