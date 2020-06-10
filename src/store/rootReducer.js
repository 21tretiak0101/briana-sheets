import {
  CHANGE_TEXT,
  CHANGE_STYLES,
  TABLE_RESIZE,
  APPLY_STYLE, CHANGE_TITLE, UPDATE_DATE,
} from '@/store/types';

export function rootReducer(state, action) {
  switch (action.type) {
    case TABLE_RESIZE:
      return {...state,
        sizeState: {
          ...state.sizeState,
          [action.data.id]: action.data.value
        }
      };
    case CHANGE_TEXT:
      return {
        ...state,
        dataState: {
          ...state.dataState,
          [action.data.id]: action.data.text
        }
      };
    case CHANGE_STYLES:
      action.data.ids.forEach(id =>
        state.stylesState[id] =
              {...state.stylesState[id], ...action.data.style});
      return {
        ...state
      };
    case APPLY_STYLE:
      return {
        ...state,
        currentStyles: action.data
      };
    case CHANGE_TITLE:
      return {
        ...state,
        tableTitle: action.data
      };
    case UPDATE_DATE:
      return {
        ...state,
        lastOpened: action.data
      };
    default: return state;
  }
}
