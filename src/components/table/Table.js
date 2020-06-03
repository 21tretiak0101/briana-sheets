import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';
import {parse} from '@core/parse';
import * as actions from '@/store/actions';
import {
  getGroupIds,
  isResizable,
  nextSelector,
  shiftPressed,
  isSelectable
} from '@/components/table/table.utils';
import {changeText} from '@/store/actions';
import {DEFAULT_STYLES} from '@/enviroments';

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
    this.$on('formula:input', value => {
      const $current = this.selection.$current;
      $current
          .attr('data-value', value)
          .text(parse(value));
      this.updateStore($current.data.id, value);
    });
    this.$on('formula:done', () => this.selection.$current.focus());
    this.$on('toolbar:applyStyle', style => {
      this.selection.applyStyles(style);
      this.$dispatch(actions.changeStyles(
          {ids: this.selection.selectedIds, style}));
      this.$dispatch(actions.applyStyle(style));
    });
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable(40, this.store.getState());
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const style = $cell.getStyles(Object.keys(DEFAULT_STYLES));
    this.$dispatch(actions.applyStyle(style));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(event, this.$root);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('Resize error: ', e.message);
    }
  }

  onMouseDown(event) {
    if (isResizable(event)) {
      this.resizeTable(event);
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

  updateStore(id, text) {
    this.$dispatch(changeText({id, text}));
  }

  onInput(event) {
    const text = $(event.target).text();
    this.selection.$current.attr('data-value', text);
    this.$emit('table:input', text);
    this.updateStore($(event.target).data.id, text);
  }
}
