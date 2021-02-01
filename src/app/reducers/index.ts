import { ActionReducerMap, createSelector, MetaReducer } from "@ngrx/store";

import * as fromMain from "./main/main.reducer";

export interface AppState {
  main: fromMain.MainState;
}

export const reducers: ActionReducerMap<AppState> = {
  main: fromMain.reducer,
};

export const metaReducers: MetaReducer<any, any>[] = [];

// Main
export const mainStateSelect = (state: AppState) => state.main;
export const mainState = createSelector(
  mainStateSelect,
  (state: fromMain.MainState) => state
);

export const mainStateGetToken = createSelector(mainStateSelect, (state: fromMain.MainState) => state.token);
export const mainStateGetOnlineStatus = createSelector(mainStateSelect, (state: fromMain.MainState) => state.onlineStatus);
export const mainStateGetAllNumber = createSelector(mainStateSelect, (state: fromMain.MainState) => state.allNumber);