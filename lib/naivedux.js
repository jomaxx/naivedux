'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function Store(reducer, initialState) {
  var _this = this;

  var state = initialState;
  var listeners = [];

  this.getState = function () {
    return state;
  };

  this.dispatch = function (action) {
    if (typeof action === 'function') return action(_this.dispatch);
    state = reducer(state, action);
    listeners.forEach(function (listener) {
      return listener();
    });
    return action;
  };

  this.subscribe = function (fn) {
    listeners.push(fn);

    return function () {
      listeners = listeners.filter(function (listener) {
        return listener !== fn;
      });
    };
  };

  this.dispatch({ type: '@@INIT' });
}

exports.Store = Store;