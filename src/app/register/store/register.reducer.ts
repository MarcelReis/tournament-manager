import { Team } from 'src/app/models/team'
import { Action, createReducer, on } from '@ngrx/store'
import * as TournamentActions from './register.actions'

import { Match } from 'src/app/models/match'

let id = 0

export interface State {
  teams: Team[]
}

export const initialState: State = {
  teams: [],
}

const scoreboardReducer = createReducer(
  initialState,
  on(TournamentActions.addTeam, (state, { name }) => {
    id++
    return {
      ...state,
      teams: [...state.teams, new Team(id, name)],
    }
  }),
  on(TournamentActions.removeTeam, (state, { id }) => {
    return {
      ...state,
      teams: state.teams.filter((team) => team.id !== id),
    }
  })
)

export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action)
}
