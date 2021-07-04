const mappings = {km: 'mi', mi: 'km', gal: 'L', L: 'gal', lbs: 'kg', kg: 'lbs'}
const changer = {km: 1/1.60934, mi: 1.60934, lbs: 0.453592, kg: 1/0.453592, gal: 3.78541, L: 1/3.78541}

function getMid(input){
  const char = input.match(/[a-z]/);
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
    let result;

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };

}

module.exports = ConvertHandler;
