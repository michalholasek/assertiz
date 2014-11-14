(function () {
  'use strict';

  module('utils', function () {
    var utils = {};

    utils.isArray = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Array]';
    };

    utils.isBoolean = function (value) {
      return typeof value === 'boolean';
    };

    utils.isFunction = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Function]';
    };

    utils.isNaN = function (value) {
      return typeof value === 'number' && isNaN(value);
    };

    utils.isNull = function (value) {
      return Object.prototype.toString.call(value) === '[object Null]';
    };

    utils.isNumber = function (value) {
      return typeof value === 'number' && !isNaN(value);
    };

    utils.isObject = function (obj) {
      return Object.prototype.toString.call(obj) === '[object Object]';
    };

    utils.isPrimitive = function (value) {
      var type = '';
      var match;

      if (utils.isUndefined(value)) {
        return true;
      }

      match = Object.prototype.toString.call(value).match(/^\[object\s(.*)\]$/);
      type = match && match[1] || '';

      switch (type) {
        case 'Number':
        case 'Boolean':
        case 'Null':
        case 'String':
          return true;
      }
    };

    utils.isString = function (value) {
      return typeof value === 'string';
    };

    utils.isUndefined = function (value) {
      return typeof value === 'undefined';
    };

    utils.objectType = function (obj) {
      var type = '';
      var match;
      
      if (utils.isUndefined(obj)) {
        return 'undefined';
      }

      if (utils.isObject(obj)) {
        return 'object';
      }

      if (utils.isNaN(obj)) {
        return 'nan';
      }

      match = Object.prototype.toString.call(obj).match(/^\[object\s(.*)\]$/);
      type = match && match[1] || '';

      switch (type) {
        case 'Array':
        case 'Boolean':
        case 'Function':
        case 'Number':
        case 'Null':
        case 'String':
          return type.toLowerCase();
      }
    };
    
    module.exports = utils;
  });
}());
