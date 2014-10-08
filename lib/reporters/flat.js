(function () {
  'use strict';

  module('flat', function () {
    var appendErrorMessage;
    var initializeLayout;
    var appendTotals;
    var counter = {};
    var appendTest;

    counter.failed = 0;
    counter.passed = 0;
    counter.time = 0;

    appendErrorMessage = function (testElem, error) {
      var errorElem;
      var stackElem;
      var rows;

      if (error.stack) {
        rows = error.stack.split('\n');

        errorElem = document.createElement('span');
        errorElem.className = 'error-text strong';
        errorElem.innerHTML = rows[0];

        testElem.innerHTML += errorElem.outerHTML;
        testElem.innerHTML += '<br />';

        stackElem = document.createElement('p');
        stackElem.className = 'error-stack';
        stackElem.style.display = 'none';
        
        for (var i = 1; i < rows.length; i++) {
          stackElem.innerHTML += rows[i];
          stackElem.innerHTML += '<br />';
        }

        testElem.innerHTML += stackElem.outerHTML;
      }
    };

    appendTest = function (test) {
      var testElem = document.createElement('li');
      var suiteElem;

      if (test.suite) {
        suiteElem = document.createElement('span');
        suiteElem.innerHTML = test.suite + ' ';
        suiteElem.className = 'strong';
        testElem.appendChild(suiteElem);
      }

      testElem.innerHTML += test.name + ' (' + test.duration + 'ms)';
      testElem.className = test.passed ? 'success' : 'failure';

      if (test.error) {
        counter.failed += 1;
        appendErrorMessage(testElem, test.error);
      } else {
        counter.passed += 1;
      }

      counter.time += test.duration;
      
      document.getElementById('tests').appendChild(testElem);
    };

    appendTotals = function () {
      var totalsElem = document.createElement('p');

      totalsElem.innerHTML = 'Passed: ' + counter.passed + ', ';
      totalsElem.innerHTML += 'failed: ' + counter.failed + ', ';
      totalsElem.innerHTML += 'duration: ' + counter.time + 'ms';
      totalsElem.className = 'totals strong';

      document.getElementById('assertiz').appendChild(totalsElem);
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
        var clickHandler;

        assertiz.on('run-finished', function () {
          appendTotals();
        });

        assertiz.on('test-error', function (test) {
          appendTest(test);
        });

        assertiz.on('test-finished', function (test) {
          appendTest(test);
        });

        clickHandler = function (e) {
          var elem; // <p> element with class .error-stack
          if (e.target && e.target.className === 'failure') {
            for (var i = 0; i < e.target.childNodes.length; i++) {
              if (e.target.childNodes[i].nodeName === 'P') {
                elem = e.target.childNodes[i];
                elem.style.display = elem.style.display === 'none' ? 'block' : 'none';
                e.preventDefault();
              }
            }
          } else if (e.target && e.target.className === 'error-stack') {
            e.target.style.display = 'none';
          }
        };

        initializeLayout();

        window.addEventListener('load', function () {
          document
            .getElementById('tests')
            .addEventListener('click', clickHandler, false);
        }, false);
      }

    };
  });
}());
