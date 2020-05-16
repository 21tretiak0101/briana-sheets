const CODES = {
  A: 65,
  Z: 90
};

function toCell() {
  return `
    <div class="cell" contenteditable="true"></div>
  `;
}

function toColumn(column) {
  return `
    <div class="column">${column}</div>
  `;
}

function createRow(data, info = '') {
  return `
    <div class="row">
        <div class="row-info">${info}</div>
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

function createCells(count) {
  return new Array(count)
      .fill('')
      .map(toCell)
      .join('');
}

export function createTable(rowsCount = 30) {
  const columnsCount = CODES.Z - CODES.A + 1;
  const rows = [];
  const columns = createColumns(columnsCount);
  rows.push(createRow(columns));

  for (let i = 0; i < rowsCount; i++) {
    const cells = createCells(columnsCount);
    rows.push(createRow(cells, i + 1));
  }

  return rows.join('');
}
