
import ripemd160 from 'crypto-js/ripemd160';
import sha256 from 'crypto-js/sha256';

import ec from '../util/ec';

const keys = ec.genKeyPair();

console.log(`PRIVATE`, keys.getPrivate('hex'));
const publicHex = keys.getPublic().encodeCompressed('hex');
console.log(`PUBLIC`, publicHex);

const msg = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
const sig = keys.sign(msg);
console.log(`SIGNATURE`, sig.toDER('hex'));
console.log(`SIGNATURE-Base64`, Buffer.from(sig.toDER('hex'), 'hex').toString('base64'));

console.log(`pub hash160`, ripemd160(sha256(publicHex)).toString());

const valid = keys.verify(msg, sig);
console.log(`VALID`, valid);
