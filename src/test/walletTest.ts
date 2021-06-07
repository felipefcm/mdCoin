
import Wallet from "../wallet";

let wallet = Wallet.create();
const address = wallet.getAddress();

console.log(`Wallet ${address}`);
