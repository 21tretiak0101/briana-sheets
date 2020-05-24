import {$} from '@core/dom';

export function isResizable(event) {
  return event.target.dataset.resize;
}

export function isSelectable(event) {
  return event.target.dataset.id;
}

export function shiftPressed(event) {
  return event.shiftKey;
}

function rangeRows(start, end) {
  if (start > end) {
    [start, end] = [end, start];
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => start + index);
}

function rangeCols(start, end) {
  start = start.charCodeAt(0);
  end = end.charCodeAt(0);
  if (start > end) {
    [start, end] = [end, start];
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => String.fromCharCode(start + index));
}

export function getGroupIds($target, $current) {
  const rows = rangeRows($current.id.row, $target.id.row);
  const cols = rangeCols($current.id.col, $target.id.col);
  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${col}:${row}`));
    return acc;
  }, []);
}

const keys = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Tab',
  'Enter'
];

export function nextSelector(event) {
  const {key} = event;
  let {col, row} = $(event.target).id;
  if (keys.includes(key) && !event.shiftKey) {
    event.preventDefault();
    switch (key) {
      case 'ArrowDown':
      case 'Enter':
        row++;
        break;
      case 'ArrowUp':
        row--;
        break;
      case 'Tab':
      case 'ArrowRight':
        col = String.fromCharCode(col.charCodeAt(0) + 1);
        break;
      case 'ArrowLeft':
        col = String.fromCharCode(col.charCodeAt(0) - 1);
        break;
    }
  }
  return `[data-id="${col}:${row}"]`;
}
