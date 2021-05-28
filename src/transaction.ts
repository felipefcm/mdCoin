
import sha256 from 'crypto-js/sha256';

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
		return sha256(sha256(
			[ ...this.inputs, ...this.outputs ].map(i => i.address).join()
		)).toString();
	}
}
