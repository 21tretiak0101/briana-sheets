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

  get text() {
    return this.$element.textContent.trim();
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
