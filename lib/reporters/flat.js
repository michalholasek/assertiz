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
      var stackInnerHTML;
      var testInnerHTML;
      var rows;

      if (error.stack) {
        rows = error.stack.split('\n');

        testInnerHTML = '<span class="error-text strong">' + rows[0] + '</span><br>';
        
        for (var i = 1; i < rows.length; i++) {
          stackInnerHTML += rows[i] + '<br>';
        }

        testInnerHTML += '<p class="error-stack" style="display:none;">';
        testInnerHTML += stackInnerHTML + '</p>';

        testElem.insertAdjacentHTML('beforeend', testInnerHTML);
      }
    };

    appendTest = function (test) {
      var testElem = document.createElement('li');

      if (test.suite) {
        testElem.insertAdjacentHTML(
          'afterbegin',
          '<span class="strong">' + test.suite + ' </span>'
        );
      }

      testElem.insertAdjacentHTML(
        'beforeend',
        test.name + ' (' + test.duration + 'ms)'
      );
      
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
      var totalsInnerHTML;

      totalsInnerHTML = 'Passed: ' + counter.passed + ', ';
      totalsInnerHTML += 'failed: ' + counter.failed + ', ';
      totalsInnerHTML += 'duration: ' + counter.time + 'ms';
      
      totalsElem.innerHTML = totalsInnerHTML;
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

        // Uncaught error can occur during runtime if there is some
        // typo / wrong code (most likely) in the test() function 
        window.addEventListener('error', function (evt) {
          var msg = evt.message + ' Please check console for more information.';
          var errorElem = document.createElement('li');
          errorElem.className = 'strong';
          errorElem.innerHTML = msg;
          
          document.getElementById('tests').appendChild(errorElem);
        }, false);
      }

    };
  });
}());
