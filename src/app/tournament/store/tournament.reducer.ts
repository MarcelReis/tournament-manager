import { map } from 'rxjs/operators'
import { Action, createReducer, on } from '@ngrx/store'
import * as TournamentActions from './tournament.action'

import { Team } from './../../models/team'
import { Match } from 'src/app/models/match'
import { pathToFileURL } from 'url'

const enum CurrentState {
  'uninitialized',
  'running',
  'finished',
}

export interface State {
  bestOf: 3
  currentState: CurrentState
  matches: Match[][]
}

export const initialState: State = {
  bestOf: 3,
  currentState: CurrentState.uninitialized,
  matches: [],
}

const generateRemaningMatches = <T>(firstRound: T[]): T[][] => {
  const tree = [firstRound]
  while (tree[tree.length - 1].length !== 1) {
    const newRound = []
    for (let index = 0; index < tree[tree.length - 1].length; index += 2) {
      newRound.push(new Match([null, null]))
    }
    tree.push(newRound)
  }
  return tree
}

const scoreboardReducer = createReducer(
  initialState,

  on(TournamentActions.gameStared, (state, { ids }) => {
    const firstRound: Match[] = []
    for (let index = 0; index < ids.length; index += 2) {
      const match = new Match([
        { id: ids[index], score: 0 },
        { id: ids[index + 1], score: 0 },
      ])
      firstRound.push(match)
    }
    const matches = generateRemaningMatches(firstRound)

    return { ...state, currentState: CurrentState.running, matches }
  }),
  on(
    TournamentActions.addScore,
    (state, { phaseIndex, matchIndex, teamId }) => {
      let score

      return {
        ...state,
        matches: state.matches.map((phase, index) => {
          if (index === phaseIndex) {
            phase = phase.map((match, index) => {
              if (matchIndex === index) {
                match = new Match(
                  match.teams.map((team) => {
                    if (team.id === teamId) {
                      score = team.score + 1
                      return {
                        id: team.id,
                        score,
                      }
                    }
                    return team
                  })
                )
              }
              return match
            })
          }

          if (index === phaseIndex + 1) {
            phase = phase.map((match, index) => {
              if (Math.floor(matchIndex / 2) === index) {
                match = new Match(
                  match.teams.map((team, index) => {
                    if (
                      !team &&
                      score > state.bestOf / 2 &&
                      matchIndex % 2 === index
                    ) {
                      return { id: teamId, score: 0 }
                    }

                    return team
                  })
                )
              }
              return match
            })
          }
          return phase
        }),
      }
    }
  )
)

export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action)
}
