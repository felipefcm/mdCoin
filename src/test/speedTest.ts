
import sha1 from 'crypto-js/sha1';
import md5 from 'crypto-js/md5';
import sha256 from 'crypto-js/sha256';
import ripemd160 from 'crypto-js/ripemd160';

const num = 500000;

let start;

// SHA1
start = new Date().valueOf();

for(let i = 0; i < num; ++i)
	sha1(`Data${i}`).toString();

const sha1Time = new Date().valueOf() - start;
const sha1Rate = Math.trunc(num / sha1Time);
console.log(`SHA1 hashes took ${sha1Time}ms | ${sha1Rate}kH/s`);

// MD5
start = new Date().valueOf();

for(let i = 0; i < num; ++i)
	md5(`Data${i}`).toString();

const md5Time = new Date().valueOf() - start;
const md5Rate = Math.trunc(num / md5Time);
console.log(`MD5 hashes took ${md5Time}ms | ${md5Rate}kH/s`);

// SHA256
start = new Date().valueOf();

for(let i = 0; i < num; ++i)
	sha256(`Data${i}`).toString();

const sha256Time = new Date().valueOf() - start;
const sha256Rate = Math.trunc(num / sha256Time);
console.log(`SHA256 hashes took ${sha256Time}ms | ${sha256Rate}kH/s`);

// ripemd160
start = new Date().valueOf();

for(let i = 0; i < num; ++i)
	ripemd160(`Data${i}`).toString();

const ripemd160Time = new Date().valueOf() - start;
const ripemd160Rate = Math.trunc(num / ripemd160Time);
console.log(`ripemd160 hashes took ${ripemd160Time}ms | ${ripemd160Rate}kH/s`);
