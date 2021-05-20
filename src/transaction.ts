
import sha1 from 'crypto-js/sha1';

export interface TransactionItem {
	address: string;
	amount: number;
}

export class Transaction {
	
	inputs: TransactionItem[];
	outputs: TransactionItem[];

	constructor(inputs: TransactionItem[] = [], outputs: TransactionItem[] = []) {
		this.inputs = inputs;
		this.outputs = outputs;
	}

	addInput(input: TransactionItem) {
		this.inputs.push(input);
	}

	addOutput(output: TransactionItem) {
		this.outputs.push(output);
	}

	getId() {
		return sha1(sha1(
			[ ...this.inputs, ...this.outputs ].map(i => i.address).join()
		)).toString();
	}
}
