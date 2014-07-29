(function () {
  'use strict';

  var test = require('assertiz').test;
  var assert = require('assert');
  var message = '';

  test('assertiz#run should be able to run sync test', function () {
    assert.true(true);
  });

  test('assertiz#run should be able to run async test', function (done) {
    setTimeout(function () {
      assert.true(true);
      done();
    }, 100);
    
  }, true);

  test('assertiz#run should be able to handle failed sync test', function () {
    assert.true(false);
    message = assert.error.message;
    assert.clear();
    assert.equal(message, 'value is not true');
  });
  
  test('assertiz#run should be able to handle failed async test',
    function (done) {
      setTimeout(function () {
        assert.true(false);
        message = assert.error.message;
        assert.clear();
        assert.equal(message, 'value is not true');
        done();
      }, 100);
    }, true
  );

  test('assertiz#run should be able to handle timed out async test',
    function (done) {
      // If you uncomment lines below, test fails because it times out.
      // This is correct behaviour, since we want the runner (assertiz)
      // to continue with next test, not to hang
      // 
      // setTimeout(function () {
      //   assert.true(true);
      //   done();
      // }, 5000);
      done(); // Comment this if you uncommented lines above
    }, true
  );
}());
