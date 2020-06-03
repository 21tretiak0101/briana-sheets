export class Emitter {
  constructor() {
    this.subscribers = {};
  }

  emit(event, ...args) {
    if (Array.isArray(this.subscribers[event])) {
      this.subscribers[event].forEach(listener => {
        listener(...args);
      });
    }
  }

  subscribe(event, callback) {
    this.subscribers[event] = this.subscribers[event] || [];
    this.subscribers[event].push(callback);
    return () => {
      this.subscribers[event] = this.subscribers[event]
          .filter(listener => listener !== callback);
    };
  }
}
