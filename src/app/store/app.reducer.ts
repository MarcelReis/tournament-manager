import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store'
import { environment } from '../../environments/environment'

import * as fromTournament from '../tournament/store/tournament.reducer'
import * as fromRegister from '../register/store/register.reducer'

export interface AppState {
  tournament: fromTournament.State
  register: fromRegister.State
}

export const reducers: ActionReducerMap<AppState> = {
  tournament: fromTournament.reducer,
  register: fromRegister.reducer,
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : []
