import {$} from '@core/dom';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Router {
  constructor(selector, routes = {}) {
    if (!selector) {
      throw new Error('Selector is required.');
    }
    this.$placeholder = $(selector);
    this.routes = routes;
    this.page = null;
    this.changePage = this.changePage.bind(this);
    this.init();
  }

  init() {
    window.addEventListener('hashchange', this.changePage);
    this.changePage();
  }

  changePage() {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear();
    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard;

    this.page = new Page(ActiveRoute.param);
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }

  destroy() {
    window.removeEventListener('', this.changePage);
  }
}
