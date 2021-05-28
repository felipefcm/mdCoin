
import sha256 from 'crypto-js/sha256';

import { Transaction } from "./transaction";

class Block {

	readonly version = 1;

	height: number;
	previousBlockHash: string;

	timestamp: string;
	txns: Transaction[] = [];
	nonce: number;
	hash: string;

	constructor(height: number, previousBlockHash: string, txns: Transaction[], nonce: number) {
		
		this.height = height;
		this.previousBlockHash = previousBlockHash;
		this.txns = txns;
		this.nonce = nonce;
		
		this.timestamp = new Date().toISOString();
		this.hash = this.calculateHash();
	}

	calculateHash() {
		
		const hashInput = 
			`${this.height}` +
			`${this.previousBlockHash}` +
			`${this.txns.map(txn => txn.getId()).join()}` +
			`${this.nonce}`;

		return sha256(sha256(hashInput)).toString();
	}
}

export default Block;
