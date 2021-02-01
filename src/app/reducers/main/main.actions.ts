import { createAction, props } from '@ngrx/store';

export const SET_MAIN_TOKEN = '[Main state] Set main token';
export const SET_MAIN_TONLINE_STATUS = '[Main state] Set main online status';
export const SET_ALL_NUMBER = '[Main state] Set all number';

export const setMainToken = createAction(
  SET_MAIN_TOKEN,
  props<{ payload: string }>()
);

export const setMainOnlineStatus = createAction(
  SET_MAIN_TONLINE_STATUS,
  props<{ payload: Boolean }>()
);
export const setAllNumber = createAction(
  SET_ALL_NUMBER,
  props<{ payload: Array<Number> }>()
);

