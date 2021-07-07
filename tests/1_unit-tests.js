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
  suite('Check return units', function(){
    test('gallon and Liter', function(){
      assert.equal(convertHandler.getReturnUnit('gal'), 'L')
      assert.equal(convertHandler.getReturnUnit('L'), 'gal')
    })
    test('mile and Kilometers', function(){
      assert.equal(convertHandler.getReturnUnit('mi'), 'km')
      assert.equal(convertHandler.getReturnUnit('km'), 'mi')
    })
    test('Kilogram and Pound', function(){
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs')
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg')
    })
  })
  test('Spell out units', function(){
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers')
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles')
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms')
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds')
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons')
    assert.equal(convertHandler.spellOutUnit('L'), 'liters')
  })
  test('Check init units', function(){
    assert.equal(convertHandler.getUnit('3.1mi'), 'mi')
  })
  suite('Check full example outputs', function(){
    function check_all(input, expectedNum, expectedInitUnit, expectedReturnNum, expectedReturnUnit, returnString){
      const num = convertHandler.getNum(input)
      const initUnit = convertHandler.getUnit(input)
      const returnNum = convertHandler.convert(num, initUnit)
      const returnUnit = convertHandler.getReturnUnit(initUnit)

      assert.strictEqual(num, expectedNum)
      assert.strictEqual(initUnit, expectedInitUnit)
      assert.strictEqual(returnNum, expectedReturnNum)
      assert.strictEqual(returnUnit, expectedReturnUnit)
      assert.strictEqual(convertHandler.getString(num, initUnit, returnNum, returnUnit), returnString)
    }
    test('Check example result', function(){
      check_all('3.1mi', 3.1, 'mi', 4.98895, 'km', '3.1 miles converts to 4.98895 kilometers')
    })
    test('Check custom inputs', function(){
      check_all('kg', 1, 'kg', 2.20462, 'lbs', '1 kilograms converts to 2.20462 pounds')
      check_all('2.3L', 2.3, 'L', 0.6076, 'gal', '2.3 liters converts to 0.60760 gallons')
    })
  })
});
