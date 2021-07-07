'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get(function(req, res){
    let invalidNum = false, invalidUnit = false;
    const input = req.query.input
    let initNum, initUnit;
    try{ initNum = convertHandler.getNum(input)}
    catch(err){invalidNum = true}

    try{ initUnit = convertHandler.getUnit(input)}
    catch (error) { invalidUnit = true}

    if(invalidNum && invalidUnit) return res.send('invalid number and unit')
    if(invalidNum) return res.send('invalid number')
    if(invalidUnit) return res.send('invalid unit')

    const returnNum = convertHandler.convert(initNum, initUnit)
    const returnUnit = convertHandler.getReturnUnit(initUnit)

    initUnit = (initUnit==='l')?'L':initUnit
    // console.log(initNum, initUnit, returnNum, returnUnit)
    const returnString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    res.json({initNum, initUnit, returnNum, returnUnit, string: returnString})
  })
};
