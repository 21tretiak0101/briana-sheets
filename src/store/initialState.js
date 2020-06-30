import {DEFAULT_STYLES, DEFAULT_TITLE} from '@root/enviroments';

const defaultState = {
  tableTitle: DEFAULT_TITLE,
  sizeState: {},
  dataState: {},
  stylesState: {},
  currentStyles: DEFAULT_STYLES,
  lastOpened: ''
};

const normalize = (state) => ({
  ...state,
  currentStyles: DEFAULT_STYLES
});

export function normalizeInitial(state) {
  return state ? normalize(state) : defaultState;
}
