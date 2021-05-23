
import Block from "./block";
import { Blockchain } from "./blockchain";

const blockchain = new Blockchain(6);

let blocksMined = 0;
while(blocksMined < 25) {

	const lastBlock = blockchain.getLastBlock();
	
	let nonce = 0;
	let block: Block;

	do {

		block = new Block(
			lastBlock.height + 1, 
			lastBlock.hash, 
			[],
			nonce++
		);
	}
	while(!blockchain.validateBlock(block));

	console.log(`Found block ${block.height}: hash: ${block.hash} nonce: ${block.nonce}`);
	blockchain.addBlock(block);

	++blocksMined;
}

console.log(`Finished mining`);
console.log(`BLOCKCHAIN`, JSON.stringify(blockchain, null, 4));
