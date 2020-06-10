import './scss/index.scss';
import {DashboardPage} from '@/pages/DashboardPage';
import {Router} from '@core/routes/Router';
import {ExcelPage} from '@/pages/ExcelPage';

new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage
});
