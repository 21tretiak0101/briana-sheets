class Dom {
  constructor(selector) {
    this.$element = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$element.innerHTML = html;
      return this;
    }
    return this.$element.outerHTML.trim();
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$element.textContent = text;
      return this;
    }
    if (this.$element.tagName.toLowerCase() === 'input') {
      return this.$element.value.trim();
    }
    return this.$element.textContent.trim();
  }

  on(eventType, callback) {
    this.$element.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$element.removeEventListener(eventType, callback);
  }

  clear() {
    this.html('');
    return this;
  }

  get data() {
    return this.$element.dataset;
  }

  findAll(selector) {
    return this.$element.querySelectorAll(selector);
  }

  find(selector) {
    return $(this.$element.querySelector(selector));
  }

  get id() {
    const id = this.data.id.split(':');
    return {col: id[0], row: +id[1]};
  }

  focus() {
    this.$element.focus();
    return this;
  }

  addClass(className) {
    this.$element.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$element.classList.remove(className);
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$element;
    }
    if (Element.prototype.append) {
      this.$element.append(node);
    } else {
      this.$element.appendChild(node);
    }
    return this;
  }

  css(styles = {}) {
    Object
        .keys(styles)
        .forEach(key => this.$element.style[key] = styles[key]);
  }

  closest(selector) {
    return $(this.$element.closest(selector));
  }

  getCoordinates() {
    return this.$element.getBoundingClientRect();
  }

  attr(name, value) {
    this.$element.setAttribute(name, value);
    return this;
  }

  getStyles(styles = []) {
    return styles.reduce((prev, key) => {
      prev = {...prev, [key]: this.$element.style[key]};
      return prev;
    }, {});
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
