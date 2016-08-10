# naivedux
Naive [redux](https://github.com/reactjs/redux) clone

## Install
```
npm i naivedux --save
```

## Usage
```js
import { Store } from 'naivedux';

const reducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'UPDATE_MESSAGE': {
      return Object.assign({}, state, {
        msg: payload,
      });
    }
    default: {
      return state;
    }
  }
}

const initialState = {
  msg: 'Hello World!',
};

const store = new Store(reducer, initialState);

store.subscribe(() => {
  const { msg } = store.getState();
  document.body.innerText = msg;
});

store.dispatch({
  type: 'UPDATE_MESSAGE',
  payload: 'Goodbye World!',
});
```
