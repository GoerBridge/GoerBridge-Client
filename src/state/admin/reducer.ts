import { createReducer } from '@reduxjs/toolkit'
import { setOwner } from './actions'
import { Owner } from './types'

export const initialState: Owner = {
  owner: '',
}

export default createReducer<Owner>(initialState, (builder) =>
  builder.addCase(setOwner, (state, { payload }) => {
    return { ...state, owner: payload.owner }
  }),
)
