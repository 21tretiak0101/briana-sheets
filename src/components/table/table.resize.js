import {$} from '@core/dom';

export function resizeTable($root, event) {
  const $resizer = $(event.target);
  const resizeType = $resizer.data.resize;
  setMovableResizer($resizer, resizeType);
  const $parent = $resizer.closest('[data-type="resizable"]');
  const coordinates = $parent.getCoordinates();
  let value;

  document.onmousemove = ev => {
    value = moveResizer(ev, $resizer, resizeType, coordinates);
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (resizeType === 'col') {
      resizeColumn($root, $parent, value);
    } else {
      resizeRow($root, $parent, value);
    }
    setDefaultResizer($resizer);
  };
}

function resizeColumn($root, $parent, value) {
  $parent.css({width: value});
  $root
      .findAll(`[data-column="${$parent.text}"]`)
      .forEach(cell => $(cell).css({width: value}));
}

function resizeRow($root, $parent, value) {
  $root
      .find(`[data-row="${$parent.text}"]`)
      .css({height: value});
}

function setDefaultResizer($resizer) {
  $resizer.css({
    opacity: 0,
    bottom: 0,
    right: 0
  });
}

function moveResizer(event, $resizer, resizerType, coordinates) {
  let value;
  if (resizerType === 'col') {
    const deltaX = event.clientX - coordinates.right;
    $resizer.css({right: -deltaX + 'px'});
    value = (coordinates.width + deltaX) + 'px';
  } else {
    const deltaY = event.clientY - coordinates.bottom;
    $resizer.css({bottom: -deltaY + 'px'});
    value = (coordinates.height + deltaY) + 'px';
  }
  return value;
}

function setMovableResizer($resizer, resizeType) {
  const side = resizeType === 'col' ? 'bottom' : 'right';
  $resizer.css({
    opacity: 1,
    [side]: '-5000px'
  });
}
