import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: [
        {eventType: 'input', method: 'onInput'},
        {eventType: 'keydown', method: 'onKeyDown'}
      ],
      subscribe: ['dataState'],
      ...options
    });
  }

  init() {
    super.init();
    this.$formula = this.$root.find('[data-type="formula"]');
    this.$on('table:input',
        text => this.$formula.text(text));
    this.$on('table:select', $cell => {
      this.$formula.text($cell.data.value);
    });
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div class="input" 
        contenteditable="true" 
        spellcheck="false"
        data-type="formula"
    ></div>`;
  }

  storeChanged(state) { }

  onInput(event) {
    const text = $(event.target).text();
    console.log(text);
    this.$emit('formula:input', text);
  }

  onKeyDown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
