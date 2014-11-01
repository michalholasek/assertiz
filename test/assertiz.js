(function () {
  'use strict';

  var assertiz = require('assertiz');
  var assert = require('assert');
  var suite = assertiz.suite;
  var test = assertiz.test;

  test('run() - test without a suite', function () {
    assert.true(true, 'Cannot run a test.');
  });

  suite('assertiz', function () {
    test('run() - test with a suite', function () {
      assert.true(true, 'Cannot run a test.');
    });
  });

  suite('assertiz', function () {
    test('run() - synchronous test', function () {
      assert.true(true, 'Cannot run a synchronous test.');
    });

    test('run() - asynchronous test', function (done) {
      setTimeout(function () {
        assert.true(true, 'Cannot run an asynchronous test.');
        done();
      }, 100);
    }, true);

    test('run() - failed synchronous test', function () {
      assert.true(false, 'Unable to handle failed test.');
      if (assert.error) assert.clear();
      else assert.true(false, 'Unable to handle failed sync test.');
    });

    test('run() - failed asynchronous test', function (done) {
      setTimeout(function () {
        assert.true(false, 'Unable to handle failed async test.');
        if (assert.error) assert.clear();
        else assert.true(false, 'Unable to handle failed async test.');
        done();
      }, 100);
    }, true);

    test('run() - timed out asynchronous test', function (done) {
      // If you uncomment lines below, test fails because it
      // times out. This is correct behaviour, since we want
      // the runner (assertiz) to continue with next test,
      // not to hang
      // setTimeout(function () {
      //   assert.true(true, 'Unable to handle timed out test.');
      //   done();
      // }, 5000);
      done(); // Comment this
    }, true);
  });

  suite('assertiz', function () {
    test('on() - add event listener for \'my-event\'', function () {
      var token = assertiz.on('my-event', function () {});
      assertiz.off('3');
      assert.equal(token, '3', 'Cannot add event listener.');
    });

    test('on() - add multiple event listeners for \'my-event\'', function () {
      var token = assertiz.on('my-event', function () {});
      token = assertiz.on('my-event', function () {});
      
      assertiz.off('3');
      assertiz.off('4');

      assert.equal(token, '4', 'Cannot add multiple event listeners.');
    });

    test('on() - event name is not a string', function () {
      var token = assertiz.on({}, function () {});
      assert.equal(token, undefined, 'Can add listener to invalid event name.');
    });

    test('on() - callback is not a function', function () {
      var token = assertiz.on('my-event', {});
      assert.equal(token, undefined, 'Can add invalid event handler.');
    });
  });

  suite('assertiz', function () {
    test('off() - remove event handler', function () {
      var token = assertiz.on('my-event', function () {});
      token = assertiz.off(token);
      assert.equal(token, '3', 'Cannot remove event listener.');
    });

    test('off() - token is not a string', function () {
      var token = assertiz.off({});
      assert.equal(token, undefined, 'Returned token value is not \'undefined\'.');
    });

    test('off() - no event listener for given token', function () {
      var token = assertiz.off('1337');
      assert.equal(token, false, 'Returned token value is not false.');
    });
  });
}());
