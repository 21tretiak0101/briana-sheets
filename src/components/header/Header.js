import {ExcelComponent} from '@core/ExcelComponent';
import {changeTitle} from '@store/actions';
import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';
import {removeFromStorage} from '@store/storage';
import {tableID} from '@components/table/table.utils';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: [
        {eventType: 'input', method: 'onInput'},
        {eventType: 'click', method: 'onClick'}
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
          <div class="button" data-action="exit">
              <i class="material-icons" data-action="exit">exit_to_app</i>
          </div>
          <div class="button" data-action="remove">
              <i class="material-icons" data-action="remove">delete</i>
          </div>
      </div>
    `;
  }

  onInput(event) {
    this.$dispatch(changeTitle($(event.target).text()));
  }

  onClick(event) {
    const action = $(event.target).data.action || '';
    if (action === 'remove') {
      const decision = confirm('Click "OK" to delete this table.');
      if (decision) {
        removeFromStorage(tableID(ActiveRoute.param));
        this.exit();
      }
    } else if (action === 'exit') {
      this.exit();
    }
  }

  exit() {
    ActiveRoute.navigate('dashboard');
  }
}
