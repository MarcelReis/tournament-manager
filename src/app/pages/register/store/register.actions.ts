import { createAction, props } from '@ngrx/store'

export const addTeam = createAction(
  '[Register Page] Add Team',
  props<{ name: string }>()
)

export const removeTeam = createAction(
  '[Register Page] Remove Team',
  props<{ id: number }>()
)

export const editTeam = createAction(
  '[Register Page] Edit Team',
  props<{ id: number; name: string }>()
)

export const setTeamsNumber = createAction(
  '[Register Page] Set Teams Number',
  props<{ teams: 2 | 4 | 8 | 16 | 32 }>()
)

export const setBestOf = createAction(
  '[Register Page] Set Best of',
  props<{ bestOf: 1 | 3 | 5 }>()
)

export const toggleShuffle = createAction('[Register Page] Toggle Shuffle')

export const resetConfigs = createAction('[Register Page] Reset configs')
