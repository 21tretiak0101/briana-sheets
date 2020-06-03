import {$} from '@core/dom';

export function resizeHandler(event, $root) {
  return new Promise(resolve => {
    const $resizer = $(event.target);
    const resizeType = $resizer.data.resize;
    const side = resizeType === 'col' ? 'bottom' : 'right';
    $resizer.css({
      opacity: 1,
      [side]: '-5000px'
    });
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coordinates = $parent.getCoordinates();
    let value = resizeType === 'col'
        ? $parent.$element.style.width
        : $parent.$element.style.height;
    document.onmousemove = (ev) => {
      if (resizeType === 'col') {
        const deltaX = ev.clientX - coordinates.right;
        $resizer.css({right: -deltaX + 'px'});
        value = (coordinates.width + deltaX) + 'px';
      } else {
        const deltaY = ev.clientY - coordinates.bottom;
        $resizer.css({bottom: -deltaY + 'px'});
        value = (coordinates.height + deltaY) + 'px';
      }
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (resizeType === 'col') {
        $parent.css({width: value});
        $root.findAll(`[data-column="${$parent.text()}"]`)
            .forEach(cell => $(cell).css({width: value}));
      } else {
        $parent.css({height: value});
      }

      resolve({
        value,
        id: resizeType === 'col' ? $parent.data.column: $parent.data.row
      });

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      });
    };
  });
}
