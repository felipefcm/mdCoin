
import sha256 from 'crypto-js/sha256';
import { Locking, OpCodes } from './locking';

export interface Input {
	outputRef: string,
	unlockingData: string[],
}

export interface Output {
	address: string,
	amount: number,
	lockingScript: (OpCodes | string)[],
}

export class Transaction {
	
	private id: string;
	private mustRecalculateId: boolean;

	private blockHeight: number;

	private inputs: Input[];
	private outputs: Output[];

	constructor(blockHeight: number) {
		
		this.inputs = [];
		this.outputs = [];
		this.blockHeight = blockHeight;
		
		this.id = this.calculateId();
		this.mustRecalculateId = false;
	}

	addInput(input: Input) {
		this.inputs.push(input);
		this.mustRecalculateId = true;
	}

	addOutput(output: Output) {
		this.outputs.push(output);
		this.mustRecalculateId = true;
	}

	getRaw() {
		
		const raw: string[] = [];

		raw.push('IN');
		raw.push(...this.inputs.map(input =>
			[ input.outputRef, ...input.unlockingData ].join()
		));

		raw.push('OUT');
		raw.push(...this.outputs.map(output =>
			[ output.address, Math.trunc(output.amount).toString(), output.lockingScript.get() ].join()
		));
		
		return raw.join('|');
	}

	getId() {
		
		if(this.mustRecalculateId) {
			this.id = this.calculateId();
			this.mustRecalculateId = false;
		}

		return this.id;
	}

	private calculateId() {
		return sha256(sha256(
			`${this.blockHeight}` + this.getRaw()
		)).toString();
	}
}
