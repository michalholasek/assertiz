(function () {
  'use strict';

  module('assertiz', function () {
    var isFunction = require('utils').isFunction;
    var isString = require('utils').isString;
    var assert = require('assert');
    var listenerId = -1;
    var listeners = {};
    var paused = false;
    var onFinished;
    var suite = '';
    var queue = [];
    var assertiz;
    var runAsync;
    var addTest;
    var onError;
    var runSync;
    var runTest;
    var emit;
    var next;
    var Test;

    //----------------------------------------------------------------------
    // Runner
    //----------------------------------------------------------------------

    addTest = function (test) {
      queue.push(test);
    };

    emit = function (event, test) {
      if (!listeners[event]) return;

      for (var i = 0; i < listeners[event].length; i++) {
        listeners[event][i].fn(test);
      }
    };

    onError = function (test) {
      emit('test-error', test);
      if (queue.length) next();
    };

    onFinished = function (test) {
      emit('test-finished', test);
      if (queue.length) next();
    };

    next = function () {
      paused = false;
      setTimeout(assertiz.run, 1);
    };

    runTest = function () {
      var test;

      if (!paused && queue.length) {
        test = queue.shift();
        test.run(onFinished, onError);
      }

      if (!queue.length) {
        emit('run-finished');
      }
    };

    //----------------------------------------------------------------------
    // Test
    //----------------------------------------------------------------------

    Test = function (suite, name, fn, async) {
      this.async = async || false;
      this.suite = suite;
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

    assertiz = {

      off: function (token) {
        if (!isString(token)) return;

        for (var event in listeners) {
          if (listeners[event]) {
            for (var i = 0; i < listeners[event].length; i++) {
              if (listeners[event][i].token === token) {
                listeners[event].splice(i, 1);
                listenerId--;
                return token;
              }
            }
          }
        }

        return false;
      },

      on: function (event, fn) {
        var token = '';

        if (!isString(event) || !isFunction(fn)) return;

        if (!listeners[event]) {
          listeners[event] = [];
        }

        token = (++listenerId).toString();
        listeners[event].push({
          token: token,
          fn: fn
        });

        return token;
      },
      
      run: function () {
        runTest();
      },

      suite: function (name, fn) {
        suite = isString(name) ? name : '';
        fn();
        suite = '';
      },

      test: function (name, fn, async) {
        // Push only valid test
        if (!isString(name) || !isFunction(fn) ||
           (async && typeof async !== 'boolean')) {
          return;
        }
        
        addTest(new Test(suite, name, fn, async));
      }

    };

    module.exports = assertiz;
  });
}());
