import { createAction, props } from '@ngrx/store'

export const gameStared = createAction(
  '[Tournament Page] Game Started',
  props<{ ids: number[] }>()
)

export const addScore = createAction(
  '[Tournament Page] Add Score',
  props<{ phaseIndex: number; matchIndex: number; teamId: number }>()
)
