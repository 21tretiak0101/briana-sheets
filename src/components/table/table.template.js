const CODES = {
  A: 65,
  Z: 90
};

function toCell(row) {
  return function(_, column) {
    const columnChar = toChar(_, column);
    return `
    <div class="cell" 
        contenteditable="true" 
        data-column="${columnChar}"
        data-id="${columnChar}:${row}"
        ></div>  
  `;
  };
}

function toColumn(column) {
  return `
    <div class="column" data-type="resizable" data-column="${column}">
        ${column}
        <div class="col-resize" data-resize="col"></div>
    </div>
  `;
}

function createRow(data, row = '') {
  const resize = row ? `<div class="row-resize" data-resize="row"></div>` : '';
  return `
    <div class="row" data-type="resizable" data-row="${row || 0}">
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

function createColumns(count) {
  return new Array(count)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');
}

function createCells(count, row) {
  return new Array(count)
      .fill('')
      .map(toCell(row))
      .join('');
}

export function createTable(rowsCount = 30) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const columns = createColumns(columnsCount);
  rows.push(createRow(columns));

  for (let i = 0; i < rowsCount; i++) {
    const cells = createCells(columnsCount, i + 1);
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
