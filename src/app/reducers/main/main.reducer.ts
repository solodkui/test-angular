import { createReducer, on } from "@ngrx/store";
import { LocalStorageService } from "../../shared/services/localstorage.service";

import * as MainActions from "./main.actions";

export interface MainState {
  token: string;
  onlineStatus: boolean;
  allNumber: Array<number>;
}

const initialState: MainState = {
  token: null,
  onlineStatus: false,
  allNumber: []
};

const localStorageService = new LocalStorageService();
const reducerUniqueKey = "Test: MainState";

const getInitialState = (
  key: string,
  initialMainState: MainState
): MainState => {
  const state: MainState = localStorageService.get(key);

  if (state) {
    const defaultState = {
      ...state,
    };
    return defaultState;
  } else {
    return initialMainState;
  }
};

const mainReducer = createReducer(
  getInitialState(reducerUniqueKey, initialState),
  on(MainActions.setMainToken, (state, { payload }) =>
    localStorageService.sync(reducerUniqueKey, {
      ...state,
      token: payload,
    })
  ),
  on(MainActions.setMainOnlineStatus, (state, { payload }) =>
    localStorageService.sync(reducerUniqueKey, {
      ...state,
      onlineStatus: payload,
    })
  ),
  on(MainActions.setAllNumber, (state, { payload }) =>
    localStorageService.sync(reducerUniqueKey, {
      ...state,
      allNumber: payload,
    })
  ),
);

export function reducer(state: MainState | undefined, action: any) {
  return mainReducer(state, action);
}