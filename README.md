assertiz
========

Simple test runner with TDD like assertion library for the browser.

## Features
- Tests run serially (easier debugging)
- Async test support (never hangs out)
- Custom reporters support
- TDD like interface with only few assertions
- Reports test durations

## Planned Features
- More assertions (deepEqual, notDeepEqual)
- nodejs support

## Build
1. Make sure you have [node.js](http://nodejs.org/) installed
2. `> cd path/to/assertiz`
3. `> npm install gulp -g`
4. `> npm install`
5. `> gulp`
6. `assertiz.min.css` and `assertiz.min.js` will be placed in the `build` directory

## Interface
```html
﻿<!doctype html>
<html>
  <head>
    <title>assertiz</title>
    <meta charset="utf-8">
  </head>
  <body>
    <link rel="stylesheet" href="assertiz.min.css">
    <script src="assertiz.min.js"></script>

    <div id="assertiz"></div>

    <script src="tests.js"></script>
  </body>
</html>
```

```js
// tests.js

var assertiz = require('assertiz');
var assert = require('assert');
var flat = require('flat');
var suite = assertiz.suite;
var test = assertiz.test;

suite('Test Suite', function () {
  test('Synchronous test', function () {
    assert.true(true);
  });

  test('Asynchronous test', function (done) {
    setTimeout(function () {
      assert.equal(1, 1);
      done();
    }, 100);
  }, true);
});

flat.init(assertiz);
assertiz.run();
```
========

This project is not intended to serve as production level JavaScript test runner / testing framework. My goal was to create simple test runner and TDD like assertion library with clean and (as already mentioned) really simple API that I could use for personal projects. If you need robust framework with a lot of features, use Mocha or QUnit instead.
