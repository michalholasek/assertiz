(function () {
  'use strict';

  var assertiz = require('assertiz');
  var assert = require('assert');
  var suite = assertiz.suite;
  var test = assertiz.test;
  var message = '';
  var token = '';

  test('run() - test without a suite', function () {
    assert.true(true);
  });

  suite('assertiz', function () {
    test('run() - test with a suite', function () {
      assert.true(true);
    });
  });

  suite('assertiz', function () {
    test('run() - synchronous test', function () {
      assert.true(true);
    });

    test('run() - asynchronous test', function (done) {
      setTimeout(function () {
        assert.true(true);
        done();
      }, 100);
    }, true);

    test('run() - failed synchronous test', function () {
      assert.true(false);
      message = assert.error.message;
      assert.clear();
      assert.equal(message, 'value is not true');
    });

    test('run() - failed asynchronous test', function (done) {
      setTimeout(function () {
        assert.true(false);
        message = assert.error.message;
        assert.clear();
        assert.equal(message, 'value is not true');
        done();
      }, 100);
    }, true);

    test('run() - timed out asynchronous test', function (done) {
      // If you uncomment lines below, test fails because it
      // times out. This is correct behaviour, since we want
      // the runner (assertiz) to continue with next test,
      // not to hang
      // setTimeout(function () {
      //   assert.true(true);
      //   done();
      // }, 5000);
      done(); // Comment this
    }, true);
  });

  suite('assertiz', function () {
    test('on() - event listener for given event', function () {
      token = assertiz.on('my-event', function () {});
      assertiz.off('2');
      assert.equal(token, '2');
    });

    test('on() - multiple event listeners for given event', function () {
      assertiz.on('my-event', function () {});
      token = assertiz.on('my-event', function () {});
      
      assertiz.off('2');
      assertiz.off('3');

      assert.equal(token, '3');
    });

    test('on() - event name is not a string', function () {
      token = assertiz.on({}, function () {});
      assert.equal(token, undefined);
    });

    test('on() - callback is not a function', function () {
      token = assertiz.on('my-event', {});
      assert.equal(token, undefined);
    });
  });

  suite('assertiz', function () {
    test('off() - remove event handler', function () {
      token = assertiz.on('my-event', function () {});
      token = assertiz.off(token);
      assert.equal(token, '2');
    });

    test('off() - token is not a string', function () {
      token = assertiz.off({});
      assert.equal(token, undefined);
    });

    test('off() - no event listener for given token', function () {
      var token = assertiz.off('1337');
      assert.equal(token, false);
    });
  });
}());
