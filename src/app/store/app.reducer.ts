import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store'
import { environment } from '../../environments/environment'
import { localStorageSync } from 'ngrx-store-localstorage'

import * as fromTournament from '../pages/tournament/store/tournament.reducer'
import * as fromRegister from '../pages/register/store/register.reducer'

export interface AppState {
  tournament: fromTournament.State
  register: fromRegister.State
}

export const reducers: ActionReducerMap<AppState> = {
  tournament: fromTournament.reducer,
  register: fromRegister.reducer,
}

export function localStorageSyncReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return localStorageSync({
    keys: ['tournament', 'register'],
    rehydrate: true,
  })(reducer)
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [localStorageSyncReducer]
  : [localStorageSyncReducer]
