(function () {
  'use strict';

  module(function () {
    var assert = require('assert');
    var paused = false;
    var onFinished;
    var queue = [];
    var runAsync;
    var addTest;
    var onError;
    var runSync;
    var next;
    var Test;
    var run;

    //----------------------------------------------------------------------
    // Runner
    //----------------------------------------------------------------------

    addTest = function (test) {
      queue.push(test);
    };

    onError = function (test) {
      // Publish 'test-error'
      console.log(test);
      next();
    };

    onFinished = function (test) {
      // Publish 'test-finished'
      console.log(test);
      next();
    };

    next = function () {
      paused = false;
      setTimeout(run, 1);
    };

    run = function () {
      var test;

      if (!paused && queue.length) {
        test = queue.shift();
        test.run(onFinished, onError);
      }
    };

    //----------------------------------------------------------------------
    // Test
    //----------------------------------------------------------------------

    Test = function (name, fn, async) {
      this.async = async || false;
      this.name = name;
      this.fn = fn;
    };

    Test.prototype.run = function (onFinished, onError) {
      if (this.async) {
        runAsync(this, onFinished, onError);
      } else {
        runSync(this, onFinished, onError);
      }
    };

    runAsync = function (test, onFinished, onError) {
      var start = Date.now();
      var timeout = 3000;
      var timer;

      timer = setTimeout(function canceled() {
          test.duration = Date.now() - start;
          test.error = new Error('test timed out');
          test.canceled = true;
          test.passed = false;
          
          onError(test);
        }, timeout);

      test.fn(function done() {
        if (test.canceled) { return; }

        clearTimeout(timer);

        test.duration = Date.now() - start;

        if (!assert.error) {
          test.passed = true;

          onFinished(test);

        } else {
          test.passed = false;
          test.error = assert.error;

          assert.clear();

          onError(test);
        }
      });
    };

    runSync = function (test, onFinished, onError) {
      var start = Date.now();

      test.fn();
      test.duration = Date.now() - start;

      if (!assert.error) {
        test.passed = true;
        onFinished(test);
      } else {
        test.passed = false;
        test.error = assert.error;

        assert.clear();
        onError(test);
      }
    };

    //----------------------------------------------------------------------
    // Public Interface
    //----------------------------------------------------------------------

    module.$name = 'assertiz';
    module.exports = (function () {
      
      var test = function (name, fn, async) {
        // Push only valid test
        if (!isString(name) || !isFunction(fn) ||
           (async && typeof async !== 'boolean')) {
          return;
        }
        addTest(new Test(name, fn, async));
      };

      return {
        test: test,
        run: run
      };
    }());
  });
}());
