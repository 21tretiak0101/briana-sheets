export class TableSelection {
  static className = 'selected';
  constructor() {
    this.group = [];
    this.$current = null;
  }

  select($element) {
    this.clear();
    this.group.push($element);
    this.$current = $element;
    $element.focus().addClass(TableSelection.className);
  }

  selectGroup(group = []) {
    this.clear();
    group.forEach($el => $el.addClass(TableSelection.className));
    this.group = group;
  }

  clear() {
    this.group.forEach($el => $el.removeClass(TableSelection.className));
    this.group = [];
  }
}
