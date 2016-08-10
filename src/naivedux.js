export function Store(reducer, initialState) {
  let state = initialState;
  let listeners = [];

  this.getState = () => state;

  this.dispatch = (action) => {
    if (typeof action === 'function') return action(this.dispatch);
    state = reducer(state, action);
    listeners.forEach(listener => listener());
    return action;
  };

  this.subscribe = (fn) => {
    listeners.push(fn);

    return () => {
      listeners = listeners.filter(listener => listener !== fn);
    };
  };

  this.dispatch({ type: '@@INIT'});
}
