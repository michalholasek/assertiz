(function () {
  'use strict';

  var assertiz = require('assertiz');
  var test = assertiz.test;
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

  test('assertiz#on should be able to add event listener on given event',
    function () {
      var token = assertiz.on('my-event', function () {});
      assertiz.off('2');
      assert.equal(token, '2');
    }
  );

  test('assertiz#on should be able to add multiple event listeners on ' +
       'given event', function () {
      var token = '';

      assertiz.on('my-event', function () {});
      token = assertiz.on('my-event', function () {});
      
      assertiz.off('2');
      assertiz.off('3');

      assert.equal(token, '3');
    }
  );

  test('assertiz#on should not add event listener if given event name ' +
       'is not a string', function () {
      var token = assertiz.on({}, function () {});
      assert.equal(token, undefined);
    }
  );

  test('assertiz#on should not add event listener if given callback ' +
       'is not a function', function () {
      var token = assertiz.on('my-event', {});
      assert.equal(token, undefined);
    }
  );

  test('assertiz#off should be able to remove event handler', function () {
    var token = assertiz.on('my-event', function () {});
    token = assertiz.off(token);
    assert.equal(token, '2');
  });

  test('assertiz#off should not remove event handler if given token ' +
       'is not a string', function () {
      var token = assertiz.off({});
      assert.equal(token, undefined);
    }
  );

  test('assertiz#off should return false if there is no event listener ' +
       'with given token', function () {
    var token = assertiz.off('1337');
    assert.equal(token, false);
  });
}());
