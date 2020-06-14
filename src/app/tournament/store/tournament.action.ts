import { createAction, props } from '@ngrx/store'

export const gameStarted = createAction(
  '[Tournament Page] Game Started',
  props<{ ids: number[]; bestOf: number; shuffle: boolean }>()
)

export const addScore = createAction(
  '[Tournament Page] Add Score',
  props<{ phaseIndex: number; matchIndex: number; teamId: number }>()
)
