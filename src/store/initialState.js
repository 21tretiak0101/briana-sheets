import {storage} from '@core/storage';
import {DEFAULT_STYLES} from '@/enviroments';
import {CHANGE_TITLE} from '@/store/types';

const defaultState = {
  tableTitle: CHANGE_TITLE,
  sizeState: {},
  dataState: {},
  stylesState: {},
  currentStyles: DEFAULT_STYLES
};

const normalize = (state) => ({
  ...state,
  currentStyles: DEFAULT_STYLES
});

export const initialState = storage('state')
    ? normalize(storage('state'))
    : defaultState;
