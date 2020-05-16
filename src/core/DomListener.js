export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener.');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const method = listener.method;
      if (!this[method]) {
        throw Error(
            `Method ${method} is not implemented in ${this.name} component`);
      }
      this[method] = this[method].bind(this);
      this.$root.on(listener.eventType, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      this.$root.off(listener.eventType, this[listener.method].bind(this));
    });
  }
}
