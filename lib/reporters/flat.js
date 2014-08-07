(function () {
  'use strict';

  module('flat', function () {
    var initializeLayout;
    var appendTest;

    appendTest = function (test) {
      var testElem = document.createElement('li');

      testElem.innerHTML = test.name + ' (' + test.duration + 'ms)';
      testElem.className = test.passed ? 'success' : 'failure';
      
      document.getElementById('tests').appendChild(testElem);
    };

    initializeLayout = function () {
      var headerElem = document.createElement('h1');
      var testsElem = document.createElement('ul');

      headerElem.innerHTML = 'assertiz';
      headerElem.id = 'header';

      testsElem.id = 'tests';

      document.getElementById('assertiz').appendChild(headerElem);
      document.getElementById('assertiz').appendChild(testsElem);
    };

    module.exports = {

      init: function (assertiz) {
        initializeLayout();

        assertiz.on('test-finished', function (test) {
          appendTest(test);
        });

        assertiz.on('test-error', function (test) {
          appendTest(test);
        });
      }

    };
  });
}());
