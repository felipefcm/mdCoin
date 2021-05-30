
import sha256 from 'crypto-js/sha256';
import ripemd160 from 'crypto-js/ripemd160';

export const OpCodes = {
	OP_DUP: 0x02,
	OP_HASH160: 0x03,
	OP_VERIFY: 0x04,
	OP_EQUAL: 0x05,
	OP_CHECKSIG: 0x06,
};

export class Locking {

	private stack: string[] = [];

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
