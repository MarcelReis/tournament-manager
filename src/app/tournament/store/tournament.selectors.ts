import { createSelector } from '@ngrx/store'

import { AppState } from 'src/app/store/app.reducer'

import { State as TournamentState } from '../../tournament/store/tournament.reducer'

const selectTournament = (state: AppState) => state.tournament

export const selectTeams = createSelector(
  selectTournament,
  (state: TournamentState) => state.teams
)
