
import sha256 from 'crypto-js/sha256';
import { Locking } from './locking';

export interface Input {
	outputRef: string,
	signature: string,
}

export interface Output {
	address: string,
	amount: number,
	lockingScript: Locking,
}

export class Transaction {
	
	private id: string;
	private blockHeight: number;

	private inputs: Input[];
	private outputs: Output[];

	constructor(blockHeight: number, inputs: Input[] = [], outputs: Output[] = []) {
		
		this.inputs = inputs;
		this.outputs = outputs;
		this.blockHeight = blockHeight;
		
		this.id = '';
		this.calculateId();
	}

	addInput(input: Input) {
		this.inputs.push(input);
		this.calculateId();
	}

	addOutput(output: Output) {
		this.outputs.push(output);
		this.calculateId();
	}

	getId() {
		return this.id;
	}

	private calculateId() {
		this.id = sha256(sha256(
			`${this.blockHeight}` +
			this.inputs.map(i => `${i.outputRef}|${i.signature}`).join() +
			this.outputs.map(o => `${o.address}|${o.amount}`).join()
		)).toString();
	}
}
