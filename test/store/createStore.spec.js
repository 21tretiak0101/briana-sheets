import {createStore} from '@store/createStore';

const initialState = {
  count: 0
};

const reducer = (state = {}, action) => {
  if (action.type === 'ADD') {
    return {...state, count: state.count + 1};
  }
  return state;
};

describe('createStore', () => {
  let store;
  let handler;
  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });

  test('returns store object', () => {
    const store = createStore(reducer);
    expect(store).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).not.toBeUndefined();
  });

  test('returns object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test('returns an initial state', () => {
    expect(store.getState()).toEqual(initialState);
  });

  test('changes state if action exists', () => {
    store.dispatch({type: 'ADD'});
    expect(store.getState().count).toBe(1);
  });

  test('does not change state if action does not exist', () => {
    store.dispatch({type: 'NOT_EXIST'});
    expect(store.getState().count).toBe(initialState.count);
  });

  test('calls subscribe function', () => {
    store.subscribe(handler);
    store.dispatch({type: 'ADD'});
    expect(handler).toHaveBeenCalled();
  });

  test('does not call sub function if unsubscribe', () => {
    const sub = store.subscribe(handler);
    sub.unsubscribe();
    store.dispatch({type: 'ADD'});
    expect(handler).not.toHaveBeenCalled();
  });

  test('dispatches async', () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({type: 'ADD'});
      }, 500);
      setTimeout(() => {
        expect(store.getState().count).toBe(1);
        resolve();
      }, 1000);
    });
  });
});
