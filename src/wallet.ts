
import { ec as EC } from 'elliptic';
import ec from './util/ec';

import sha256 from 'crypto-js/sha256';
import ripemd160 from 'crypto-js/ripemd160';

import base58 from './util/base58';

class Wallet {

	static readonly prefix = 'M';

	private keyPair: EC.KeyPair;

	constructor(keyPair: EC.KeyPair) {
		this.keyPair = keyPair;
	}

	static create() {
		const keyPair = ec.genKeyPair();
		return new Wallet(keyPair);
	}

	static load(privateKey: string) {
		return new Wallet(ec.keyFromPrivate(privateKey, 'hex'));
	}

	sign(msg: Buffer) {
		const hexSignature = this.keyPair.sign(msg).toDER('hex') as string;
		return Buffer.from(hexSignature, 'hex').toString('base64');
	}

	getPublicKey() {
		return this.keyPair.getPublic().encodeCompressed('hex');
	}

	getPublicKeyHash() { // also known as `hash160`
		const publicHex = this.getPublicKey();
		return ripemd160(sha256(publicHex)).toString();
	}

	private checksum(pubKeyHash: string) {
		return sha256(sha256(pubKeyHash)).toString().slice(0, 8);
	}

	getAddress() {
		
		const pubKeyHash = this.getPublicKeyHash();
	
		return Wallet.prefix + base58.encode(
			Buffer.from(pubKeyHash + this.checksum(pubKeyHash), 'hex')
		);
	}

	static findWalletWithPrefix(prefix: string) {

		let found = false;
		let attempts = 0;

		while(!found && attempts < 100000) {
			
			const wallet = Wallet.create();
			const address = wallet.getAddress();
			
			if(address.startsWith(Wallet.prefix + prefix)) {
				found = true;
				console.log(address);
				console.log(wallet.keyPair.getPrivate('hex'));
			}

			++attempts;
		}
	}
}

export default Wallet;
