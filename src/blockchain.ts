
import Block from "./block";

export class Blockchain {

	private difficulty;

	private chain: Block[] = [
		this.createGenesisBlock()
	];

	constructor(difficulty: number) {
		this.difficulty = difficulty;
	}

	createGenesisBlock() {
		return new Block(0, '', [], 8);
	}

	getBlock(height: number) {
		return this.chain[height];
	}

	getLastBlock() {
		return this.getBlock(this.chain.length - 1);
	}

	addBlock(block: Block) {
		
		const valid = this.validateBlock(block);
		if(!valid) throw new Error('Invalid block');
		
		this.chain.push(block);
	}

	validateBlock(block: Block) {
		
		const lastBlock = this.chain[this.chain.length - 1];
		if(block.previousBlockHash !== lastBlock.hash)
			return false;

		if(block.calculateHash() !== block.hash)
			return false;

		if(!block.hash.startsWith('0'.repeat(this.difficulty)))
			return false;

		return true;
	}
}
