
import sha256 from 'crypto-js/sha256';
import ripemd160 from 'crypto-js/ripemd160';

export enum OpCodes {
	DUP = 0x02, // duplicate top of the stack
	HASH160 = 0x03, // hash160 the input and pushes it in the stack
	VERIFY = 0x04, // check if the script succeeded, i.e. the stack only contains a '1'
	EQUAL = 0x05, // check if the two elements at the top of the stack are equal, and pushes '0' or '1' in the stack
	CHECKSIG = 0x06, // check if the element at the top produced the signature below, and pushes '0' or '1' in the stack
}

// Pay to public key
export const P2PK = (pubKey: string) => {
	return [ pubKey, OpCodes.CHECKSIG ];
};

// Pay to public key hash
export const P2PKH = (pubKeyHash: string) => {
	return [ OpCodes.DUP, OpCodes.HASH160, pubKeyHash, OpCodes.EQUAL, OpCodes.VERIFY, OpCodes.CHECKSIG ];
};

export class Locking {

	private stack: string[] = [];

	get() {
		return '';
	}

	verify() {
		return this.stack.length === 1 && this.stack[0] === '1';
	}

	pushUnlockingScript(unlocking: string[]) {
		this.stack.push(...unlocking);
	}

	execute(op: string, ...inputs: string[]) {

		switch(op) {

			case 'DUP': { //duplicate top of the stack
				
				const top = this.stack.pop();
				if(!top) throw new Error('Invalid DUP');
				
				this.stack.push(top, top);

				break;
			}

			case 'HASH160': {
				return ripemd160(sha256(inputs[0])).toString();
			}

			case 'VERIFY': { 
				break
			}

			case 'EQUALVERIFY': {
				if(inputs[0] !== inputs[1]) 
				break;
			}
		}

		return '';
	}
}
