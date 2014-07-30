(function () {
  'use strict';

  var defined = {};
  var isFunction;
  var addModule;
  var isString;
  var isArray;
  var require;
  var module;
  var clear;

  addModule = function () {
    if (module.$name && typeof isString(module.$name)) {
      if (!defined[module.$name]) {
        defined[module.$name] = module.exports;
      } else {
        throw new Error('module ' + module.$name + ' already exists');
      }
    } else {
      throw new Error('module.$name is not a string');
    }
  };

  clear = function () {
    delete module.$name;
    delete module.exports;
  };

  isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  isFunction = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
  };

  isString = function (value) {
    return typeof value === 'string';
  };

  module = function (fn) {
    if (fn && isFunction(fn)) {
      fn();
      addModule();
      clear();
    }
  };

  require = function (name) {
    if (name && isString(name)) {
      if (defined[name]) {
        return defined[name];
      } else {
        throw new Error('module ' + name + ' was not defined');
      }
    } else {
      throw new Error('input module name is not a string');
    }
  };
 
  window.isFunction = isFunction;
  window.isString = isString;
  window.isArray = isArray;
  
  window.require = require;
  window.module = module;
}());
