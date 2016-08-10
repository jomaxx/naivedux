var Store = require('../lib/naivedux').Store;
var deepEqual = require('assert').deepEqual;

describe('naivedux', function() {
  it('should dispatch @@INIT', function() {
    var targetState = { test: 1 };

    var store = new Store(function(state, action) {
      if (action.type === '@@INIT') {
        return targetState;
      }
    });

    deepEqual(
      store.getState(),
      targetState
    );
  });

  it('should have initialState', function() {
    var targetState = { test: 1 };

    var store = new Store(function (state) {
      return state;
    }, targetState);

    deepEqual(
      store.getState(),
      targetState
    );
  });



  it('should dispatch actions', function() {
    var targetState = { test: 1 };

    var testAction = {
      type: 'TEST',
      payload: targetState,
    };

    var store = new Store(function (state, action) {
      if (action.type === testAction.type) {
        return action.payload;
      }

      return state;
    });

    deepEqual(
      store.dispatch(testAction),
      testAction
    );

    deepEqual(
      store.getState(),
      testAction.payload
    );
  });

  it('should dispatch thunked actions', function() {
    var targetState = { test: 1 };

    var testAction = {
      type: 'TEST',
      payload: targetState,
    };

    var testActionThunk = function(dispatch) {
      return dispatch(testAction);
    };

    var store = new Store(function (state, action) {
      if (action.type === testAction.type) {
        return action.payload;
      }

      return state;
    });

    deepEqual(
      store.dispatch(testActionThunk),
      testAction
    );

    deepEqual(
      store.getState(),
      testAction.payload
    );
  });

  it('should subscribe and unsubscribe', function() {
    var i = 0;
    var store = new Store(function() {});
    var unsubscribe = store.subscribe(function() { i++; });

    store.dispatch({});
    store.dispatch({});
    unsubscribe();
    store.dispatch({});

    deepEqual(i, 2);
  });
});
