import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: [
        {
          eventType: 'input',
          method: 'onInput'
        }
      ]
    });
  }

  toHTML() {
    return `
    <div class="info">fx</div>
    <div class="input" contenteditable="true" spellcheck="false"></div>`;
  }

  onInput(event) {
    console.log(event.target.textContent.trim());
  }
}
