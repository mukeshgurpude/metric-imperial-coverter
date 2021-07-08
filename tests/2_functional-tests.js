const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('Test page render', function(done){
    chai.request(server)
    .get('/').end(function(err, res){
      assert.equal(res.status, 200)
      done()
    })
  })
  test('Test correct response', function(done){
    chai.request(server)
    .get('/api/convert?input=3.1mi')
    .end(function(err, res){
      assert.equal(res.type, 'application/json')
      assert.deepStrictEqual(res.body, {"initNum":3.1,"initUnit":"mi","returnNum":4.98895,"returnUnit":"km","string":"3.1 miles converts to 4.98895 kilometers"})
      done()
    })
  })
});

const Browser = require('zombie')
Browser.site = 'http://localhost:3000'
const input = '[name=input]'
const button = '#convert'

suite("Functional Tests with Zombie.js", function () {
  const browser = new Browser();
  suiteSetup(function(done){
    return browser.visit('/', done);
  })

  suite('Test page render', function () {
    // #5
    test('input form exists', function (done) {
      browser.assert.element(input)
      browser.assert.text('#result', '')
      browser.assert.text('#jsonResult', '')
      done()
    });
    test('Response for valid input', function(done){
      browser.fill(input, '3.1mi')
      browser.pressButton(button, function(){
        browser.assert.success()
        browser.assert.text('#result', '3.1 miles converts to 4.98895 kilometers')
        browser.assert.text('#jsonResult', '{"initNum":3.1,"initUnit":"mi","returnNum":4.98895,"returnUnit":"km","string":"3.1 miles converts to 4.98895 kilometers"}')
        done()
      })
    })
    test('Response for invalid unit', function(done){
      browser.fill(input, '1min')
      browser.pressButton(button, function(){
        browser.assert.success()
        browser.assert.text('#result', 'invalid unit')
        browser.assert.text('#jsonResult', '"invalid unit"')
        done()
      })
    })
    test('Response for invalid number', function(done){
      browser.fill(input, '2/4/gal')
      browser.pressButton(button, function(){
        browser.assert.success()
        browser.assert.text('#result', 'invalid number')
        browser.assert.text('#jsonResult', '"invalid number"')
        done()
      })
    })
    test('Response for invalid number and unit', function(done){
      browser.fill(input, '2/4/6min')
      browser.pressButton(button, function(){
        browser.assert.success()
        browser.assert.text('#result', 'invalid number and unit')
        browser.assert.text('#jsonResult', '"invalid number and unit"')
        done()
      })
    })
  })
})
