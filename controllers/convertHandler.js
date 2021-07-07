const mappings = {km: 'mi', mi: 'km', gal: 'L', l: 'gal', lbs: 'kg', kg: 'lbs'}
const changer = {km: 1/1.60934, mi: 1.60934, lbs: 0.453592, kg: 1/0.453592, gal: 3.78541, l: 1/3.78541}
const spells = {km: 'kilometers', mi: 'miles', lbs: 'pounds', gal: 'gallons', kg: 'kilograms', l: 'liters'}

function getMid(input){
  const char = input.match(/[a-z]/i);
  return input.indexOf(char)
}

function ConvertHandler() {
  this.getNum = function(input) {
    const num_string = input.slice(0, getMid(input))
    if(num_string.match(/\/\d*\//)) throw new Error('invalid number')
    if(num_string === '') return 1;
    return Math.round(eval(num_string)*100000)/100000;
  };

  this.getUnit = function(input) {
    const unit = input.slice(getMid(input))
    if(!(unit.toLowerCase() in mappings)) throw new Error('invalid unit');
    return mappings[mappings[unit.toLowerCase()].toLowerCase()];
  };

  this.getReturnUnit = function(initUnit) {
    return mappings[initUnit.toLowerCase()]
  };

  this.spellOutUnit = function(unit) {
    return spells[unit.toLowerCase()];
  };

  this.convert = function(initNum, initUnit) {
    return Math.round(initNum*changer[initUnit.toLowerCase()]*100000)/100000;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const decimals = (String(returnNum).match(/(?<=\.)\d*/)[0] || "00000").length
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum}${'0'.repeat(5-decimals)} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
