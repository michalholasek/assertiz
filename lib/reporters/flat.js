(function () {
  'use strict';

  var initializeLayout;
  var appendTest;

  appendTest = function (test) {
    var testElem = document.createElement('li');
    var suiteElem;

    if (test.suite) {
      suiteElem = document.createElement('span');
      suiteElem.innerHTML = test.suite + ' ';
      suiteElem.className = 'suite';
      testElem.appendChild(suiteElem);
    }

    testElem.innerHTML += test.name + ' (' + test.duration + 'ms)';
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

  module.register('flat', {
    init: function (assertiz) {
      initializeLayout();

      assertiz.on('test-finished', function (test) {
        appendTest(test);
      });

      assertiz.on('test-error', function (test) {
        appendTest(test);
      });
    }
  });
}());
