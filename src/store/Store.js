import {rootReducer} from '@/store/rootReducer';

export class Store {
  constructor(rootReducer, initialState) {
    this.state = rootReducer({...initialState}, {type: '__INIT__'});
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
    return {
      unsubscribe() {
        this.subscribers = this.subscribers.filter(sub => sub !== callback);
      }
    };
  }

  dispatch(action) {
    this.state = rootReducer(this.state, action);
    this.subscribers.forEach(sub => sub(this.state));
  }

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }
}
