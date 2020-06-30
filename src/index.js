import '@root/scss/index.scss';
import {DashboardPage} from '@root/pages/DashboardPage';
import {Router} from '@core/routes/Router';
import {ExcelPage} from '@root/pages/ExcelPage';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
});
