(function () {
  'use strict';

  var defined = {};
  var module = {};
  var addModule;
  var require;

  addModule = function (name, mod) {
    if (!defined[name]) {
      defined[name] = mod;
    } else {
      throw new Error('module ' + name + ' already exists');
    }
  };

  module.register = function (name, mod) {
    if (name && isString(name) && mod) {
      addModule(name, mod);
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
      throw new Error('module name is not a string');
    }
  };

  if (!isUndefined(window)) {
    window.require = require;
    window.module = module;  
  }
}());
