import {isEqual} from '@components/table/table.utils';

export class StoreSubscriber {
  constructor(store) {
    this.store = store;
    this.sub = null;
    this.previousState = {};
  }

  subscribeComponents(components = []) {
    this.previousState = this.store.getState();
    this.sub = this.store.subscribe(state => {
      Object.keys(state).forEach(key => {
        if (!isEqual(state[key], this.previousState[key])) {
          components.forEach(component => {
            if (component.isWatching(key)) {
              const changes = {[key]: state[key]};
              component.storeChanged(changes);
            }
          });
        }
      });
      this.previousState = this.store.getState();
      if (process.env.NODE_ENV === 'development') {
        window['store'] = this.previousState;
      }
    });
  }

  unsubscribeFromStore() {
    this.sub.unsubscribe();
  }
}
