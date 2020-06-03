import {ExcelComponent} from '@core/ExcelComponent';
import {changeTitle} from '@/store/actions';
import {$} from '@core/dom';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: [
        {eventType: 'input', method: 'onInput'}
      ],
      subscribe: ['tableTitle'],
      ...options
    });
  }

  toHTML() {
    const tableTitle = this.store.getState().tableTitle;
    return `
      <input type="text" class="input" value="${tableTitle}">
      <div>
          <div class="button">
              <i class="material-icons">exit_to_app</i>
          </div>
          <div class="button">
              <i class="material-icons">delete</i>
          </div>
      </div>
    `;
  }

  onInput(event) {
    this.$dispatch(changeTitle($(event.target).text()));
  }
}
