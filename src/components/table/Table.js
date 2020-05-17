import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeTable} from '@/components/table/table.resize';
import {isResizable} from '@/components/table/table.utils';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      name: 'Table',
      listeners: [
        {eventType: 'mousedown', method: 'onMouseDown'}
      ]
    });
  }

  toHTML() {
    return createTable();
  }

  onMouseDown(event) {
    if (isResizable(event)) {
      resizeTable(this.$root, event);
    }
  }
}
