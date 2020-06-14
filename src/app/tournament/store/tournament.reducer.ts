import { Action, createReducer, on } from '@ngrx/store'
import * as TournamentActions from './tournament.action'

import { Match } from 'src/app/models/match'

const enum CurrentState {
  'uninitialized',
  'running',
  'finished',
}

export interface State {
  currentState: CurrentState
  matches: Match[][]
  bestOf: number
}

export const initialState: State = {
  currentState: CurrentState.uninitialized,
  matches: [],
  bestOf: 0,
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

const generateMatches = (ids: number[]) => {
  const firstRound: Match[] = []
  for (let index = 0; index < ids.length; index += 2) {
    const match = new Match([
      { id: ids[index], score: 0 },
      { id: ids[index + 1], score: 0 },
    ])
    firstRound.push(match)
  }
  return generateRemaningMatches(firstRound)
}

const scoreboardReducer = createReducer(
  initialState,

  on(TournamentActions.gameStarted, (state, { ids, bestOf }) => {
    const matches = generateMatches(ids)
    return { ...state, currentState: CurrentState.running, matches, bestOf }
  }),
  on(
    TournamentActions.addScore,
    (state, { phaseIndex, matchIndex, teamId }) => {
      let selectedMatch = state.matches[phaseIndex][matchIndex]

      const invalidMatch = () =>
        selectedMatch.ended ||
        selectedMatch.teams.some((team) => !team || !team.id)

      if (invalidMatch()) {
        return { ...state }
      }

      return {
        ...state,
        matches: state.matches.map((phase, index) => {
          // Changes the selected phase and it's match
          if (index === phaseIndex) {
            phase = phase.map((match, index) => {
              if (matchIndex === index && !match.ended) {
                const replaceMatch = (team) =>
                  team.id === teamId
                    ? { id: team.id, score: team.score + 1 }
                    : team

                match = new Match(match.teams.map(replaceMatch), match.ended)

                const matchEnded = !!match.teams.find(
                  (team) => team.score > state.bestOf / 2
                )
                if (matchEnded) {
                  const setWinner = (team) => {
                    return { ...team, winner: team.score > state.bestOf / 2 }
                  }
                  match = new Match(match.teams.map(setWinner), true)
                }
                selectedMatch = match
              }
              return match
            })
          }

          // If the selected game has ended the subsquent match also need to be updated
          if (selectedMatch.ended && index === phaseIndex + 1) {
            const nextMatchIndex = Math.floor(matchIndex / 2)
            const nextOpponentIndex = matchIndex % 2

            const replaceOpponent = (team, index) =>
              nextOpponentIndex === index ? { id: teamId, score: 0 } : team

            const replaceMatch = (match, index) =>
              nextMatchIndex === index
                ? (match = new Match(match.teams.map(replaceOpponent), false))
                : match

            phase = phase.map(replaceMatch)
          }
          return phase
        }),
      }
    }
  ),
  on(TournamentActions.resetTournament, (state) => {
    const teamSet = state.matches[0].reduce((teamSet, match) => {
      match.teams.forEach((team) => teamSet.add(team.id))
      return teamSet
    }, new Set<number>())

    const matches = generateMatches([...teamSet])
    return { ...state, currentState: CurrentState.running, matches }
  }),
  on(TournamentActions.clearTournament, () => {
    return { ...initialState }
  })
)

export function reducer(state: State | undefined, action: Action) {
  return scoreboardReducer(state, action)
}
