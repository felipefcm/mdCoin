
import ripemd160 from 'crypto-js/ripemd160';
import sha256 from 'crypto-js/sha256';

import ec from '../util/ec';

const keys = ec.genKeyPair();

console.log(`PRIVATE`, keys.getPrivate('hex'));
const publicHexUncompressed = keys.getPublic().encode('hex', false);
const publicHexCompressed = keys.getPublic().encodeCompressed('hex');
console.log(`PUBLIC (uncompressed)`, publicHexUncompressed);
console.log(`PUBLIC (compressed)`, publicHexCompressed);

console.log(`pub hash160`, ripemd160(sha256(publicHexCompressed)).toString());

const msg = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
const sig = keys.sign(msg);
console.log(`SIGNATURE`, sig.toDER('hex'));
console.log(`SIGNATURE-Base64`, Buffer.from(sig.toDER('hex'), 'hex').toString('base64'));

const valid = keys.verify(msg, sig);
console.log(`VALID`, valid);
