const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Check input types', function(){
    test('Correctly read whole number input', function(){
      assert.equal(convertHandler.getNum("2kg"), 2);
      assert.equal(convertHandler.getNum("1lbs"), 1)
    })
    test('Decimal number input', function(){
      assert.strictEqual(convertHandler.getNum("3.1mi"), 3.1)
      assert.strictEqual(convertHandler.getNum("5.4kmmi"), 5.4)
    })
    test('Fractional number input', function(){
      assert.equal(convertHandler.getNum('1/2km'), .5)
      assert.approximately(convertHandler.getNum('2/3L'), .66666, .00001)
    })
    test('Fractional input with decimal', function(){
      assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8)
    })
    test('Error on double fraction', function(){
      assert.throws(() => convertHandler.getNum('3/2/3mi'))
      assert.throws(() => convertHandler.getNum('3/24/3mi'))
      assert.doesNotThrow(() => convertHandler.getNum('3/24 + 1/3mi'))
    })
    test('Test empty number', function(){
      assert.equal(convertHandler.getNum('km'), 1)
    })
  })
});
