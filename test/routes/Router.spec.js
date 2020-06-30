import {Router} from '@core/routes/Router';
import {Page} from '@core/Page';

class DashboardPage extends Page {
  getRoot() {
    const root = document.createElement('div');
    root.innerHTML = 'dashboard';
    return root;
  }
}
class ExcelPage extends Page { }

describe('Router', () => {
  let router;
  let $root;

  beforeEach(() => {
    $root = document.createElement('div');
    router = new Router($root, {
      dashboard: DashboardPage,
      excel: ExcelPage
    });
  });

  test('returns router object', () => {
    expect(router).toBeDefined();
  });

  test('renders dashboard page', () => {
    router.changePage();
    expect($root.innerHTML).toEqual('<div>dashboard</div>');
  });
});
