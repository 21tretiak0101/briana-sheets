import {createToolbar} from '@components/toolbar/toolbar.template';
import {$} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {DEFAULT_STYLES} from '@root/enviroments';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: [
        {eventType: 'click', method: 'onClick'}
      ],
      subscribe: ['currentStyles'],
      ...options
    });
  }

  prepare() {
    this.initState(DEFAULT_STYLES);
  }

  get template() {
    return createToolbar(this.state);
  }

  toHTML() {
    return this.template;
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
      const key = Object.keys(value)[0];
      this.setState({[key]: value[key]});
    }
  }
}
