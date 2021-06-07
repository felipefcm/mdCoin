
import Block from "./block";
import { Blockchain } from "./blockchain";
import { P2PKH } from "./locking";
import { Transaction } from "./transaction";
import Wallet from "./wallet";

const minerWallet = Wallet.create();
const blockchain = new Blockchain(5);

let blocksMined = 0;
while(blocksMined < 10) {

	const lastBlock = blockchain.getLastBlock();

	const rewardTransaction = new Transaction(lastBlock.height + 1);
	rewardTransaction.addOutput({ 
		address: minerWallet.getAddress(), 
		amount: 10,
		lockingScript: P2PKH(minerWallet.getPublicKeyHash())
	});
	
	let nonce = 0;
	let block: Block;

	do {

		block = new Block(
			lastBlock.height + 1,
			lastBlock.hash,
			[ rewardTransaction	],
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
