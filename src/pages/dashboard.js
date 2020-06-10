import {storage} from '@/store/storage';

export function toRecord({lastOpened, tableTitle, key}) {
  return `
    <li class="db__record">
        <a href="#excel/${key}">${tableTitle}</a>
        <span>${lastOpened}</span>
    </li>
  `;
}

function getAllTables() {
  const tables = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes('excel')) {
      const {lastOpened, tableTitle} = storage(key);
      tables.push({lastOpened, tableTitle, key: key.split('-')[1]});
    }
  }
  return tables;
}

export function createDashboard() {
  return `
    <div class="db__list-header">
      <span>Title</span>
      <span>Last opened by me</span>
    </div>
    
    <ul class="db__list">
        ${getAllTables().map(toRecord).join('')}
    </ul>`;
}
