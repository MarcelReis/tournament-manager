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
