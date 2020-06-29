import {Page} from '@core/Page';
import {rootReducer} from '@store/rootReducer';
import {normalizeInitial} from '@store/initialState';
import {storage} from '@store/storage';
import {Excel} from '@components/excel/Excel';
import {Header} from '@components/header/Header';
import {Toolbar} from '@components/toolbar/Toolbar';
import {Formula} from '@components/formula/Formula';
import {Table} from '@components/table/Table';
import {tableID} from '@components/table/table.utils';
import {debounce} from '@store/debouce';
import {createStore} from '@store/createStore';

export class ExcelPage extends Page {
  getRoot() {
    const state = storage(tableID(this.params));
    const store = createStore(rootReducer, normalizeInitial(state));

    const stateListener = debounce( state => {
      storage(tableID(this.params), state);
    }, 100);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
