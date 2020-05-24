import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeTable} from '@/components/table/table.resize';
import {getGroupIds, isResizable} from '@/components/table/table.utils';
import {nextSelector} from '@/components/table/table.utils';
import {isSelectable, shiftPressed} from '@/components/table/table.utils';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: [
        {eventType: 'mousedown', method: 'onMouseDown'},
        {eventType: 'click', method: 'onClick'},
        {eventType: 'keydown', method: 'onKeyDown'},
        {eventType: 'input', method: 'onInput'}
      ],
      ...options
    });
    this.emitter = options.emitter;
  }

  init() {
    super.init();
    this.selectCell(this.$root.find('[data-id="A:1"]'));
    this.$on('formula:input', text => {
      this.selection.$current.text(text);
    });
    this.$on('formula:done', () => this.selection.$current.focus());
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable();
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }


  onMouseDown(event) {
    if (isResizable(event)) {
      resizeTable(this.$root, event);
    }
  }

  onClick(event) {
    if (isSelectable(event)) {
      const $target = $(event.target);
      if (shiftPressed(event)) {
        const group = getGroupIds($target, this.selection.$current)
            .map(id => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup(group);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeyDown(event) {
    const $next = this.$root.find(nextSelector(event));
    if ($next.$element) {
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target).text());
  }
}
