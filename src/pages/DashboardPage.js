import {Page} from '@core/Page';
import {$} from '@core/dom';
import {createDashboard} from '@root/pages/dashboard';

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString();
    return $.create('div', 'db').html(
        `
      <div class="db__header">
          Dashboard
      </div>
      
      <div class="db__new">   
          <div class="db__view">
              <div class="db__create__text">
                  Start a new spreadsheet
              </div>
              <a href="#excel/${now}" class="db__create">
                  <span class="material-icons">add</span>
              </a>
          </div>
      </div>
      
      <div class="db__table db__view">
          ${createDashboard()}
      </div>
        `
    );
  }
}
