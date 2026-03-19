const sum = require('../src/sum');

const result = sum(2, 3);
if (result !== 5) {
  console.error(`expected 5, got ${result}`);
  process.exit(1);
}

console.log('all tests passed');
process.exit(0);
