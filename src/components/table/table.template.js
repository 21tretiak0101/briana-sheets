import {
  CODES,
  DEFAULT_COLUMN_WIDTH,
  DEFAULT_ROW_HEIGHT, getStyles,
} from '@components/table/table.utils';
import {DEFAULT_STYLES} from '@root/enviroments';
import {parse} from '@core/parse';

function toCell(row, {sizeState, dataState, stylesState}) {
  return function(_, column) {
    const columnChar = toChar(_, column);
    const width = sizeState[columnChar] || defaultWidth();
    const id = `${columnChar}:${row}`;
    const text = dataState[id] || '';
    let styles;
    const cellStyles = stylesState[id];
    if (cellStyles) {
      styles = getStyles({...DEFAULT_STYLES, ...cellStyles});
    } else {
      styles = getStyles(DEFAULT_STYLES);
    }
    return `
    <div class="cell" 
        contenteditable="true" 
        data-column="${columnChar}"
        data-id="${id}"
        data-value="${text}"
        style="${styles} width: ${width};"
        >${parse(text) || ''}</div>  
  `;
  };
}

function toColumn({sizeState}) {
  return function(column, _) {
    return `
    <div class="column" 
        data-type="resizable" 
        data-column="${column}"
        style="width: ${sizeState[column] || defaultWidth()}">
        ${column}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
  };
}

function defaultWidth() {
  return DEFAULT_COLUMN_WIDTH + 'px';
}

function defaultHeight() {
  return DEFAULT_ROW_HEIGHT + 'px';
}

function createRow(data, row = '', state = {}) {
  let resize = '';
  let height = defaultHeight();
  if (row) {
    height = state.sizeState[row] || height;
    resize = `<div class="row-resize" data-resize="row"></div>`;
  }
  return `
    <div class="row" 
        data-type="resizable" 
        data-row="${row || 0}"
        style="height: ${height}">
        <div class="row-info">
            ${row}
            ${resize}
        </div>
        <div class="row-data">${data}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function createColumns(count, state) {
  return new Array(count)
      .fill('')
      .map(toChar)
      .map(toColumn(state))
      .join('');
}

function createCells(count, row, state) {
  return new Array(count)
      .fill('')
      .map(toCell(row, state))
      .join('');
}

export function createTable(rowsCount = 30, state) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const columns = createColumns(columnsCount, state);
  rows.push(createRow(columns));

  for (let i = 0; i < rowsCount; i++) {
    const cells = createCells(columnsCount, i + 1, state);
    rows.push(createRow(cells, i + 1, state));
  }

  return rows.join('');
}
