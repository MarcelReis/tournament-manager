import { Team } from 'src/app/models/team'
import { Action, createReducer, on } from '@ngrx/store'
import * as RegisterActions from './register.actions'

export interface State {
  nextID: number
  teams: Team[]
  gameConfig: {
    bestOf: number
    teams: number
    shuffle: boolean
  }
}

export const initialState: State = {
  nextID: 1,
  teams: [],
  gameConfig: {
    bestOf: 3,
    teams: 8,
    shuffle: false,
  },
}

const scoreboardReducer = createReducer(
  initialState,
  on(RegisterActions.addTeam, (state, { name }) => ({
    ...state,
    nextID: state.nextID + 1,
    teams: [...state.teams, new Team(state.nextID, name)],
  })),
  on(RegisterActions.removeTeam, (state, { id }) => ({
    ...state,
    teams: state.teams.filter((team) => team.id !== id),
  })),
  on(RegisterActions.setTeamsNumber, (state, { teams }) => ({
    ...state,
    gameConfig: { ...state.gameConfig, teams },
  })),
  on(RegisterActions.setBestOf, (state, { bestOf }) => ({
    ...state,
    gameConfig: { ...state.gameConfig, bestOf },
  })),
  on(RegisterActions.resetConfigs, (state) => ({
    ...state,
    gameConfig: { ...initialState.gameConfig },
  }))
)

export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action)
}
