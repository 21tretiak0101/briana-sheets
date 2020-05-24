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
      ...options
    });
  }

  init() {
    super.init();
    this.$formula = this.$root.find('[data-type="formula"]');
    this.$on('table:input',
        text => this.$formula.text(text));
    this.$on('table:select', $cell => this.$formula.text($cell.text()));
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

  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  onKeyDown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this.$emit('formula:done');
    }
  }
}
