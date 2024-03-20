import { createReducer } from '@reduxjs/toolkit'
import { getAddressDetail, setOwner } from './actions'
import { Owner } from './types'

export const initialState: Owner = {
  owner: '',
  addressDetail: null,
}

export default createReducer<Owner>(initialState, (builder) =>
  builder
    .addCase(setOwner, (state, { payload }) => {
      return { ...state, owner: payload.owner }
    })
    .addCase(getAddressDetail, (state, { payload }) => {
      return { ...state, addressDetail: payload.data }
    }),
)
