import { createReducer } from '@reduxjs/toolkit'
import { setAllBlockchain, setAllCurrency, setCurrencyByChain, setTransactionList } from './actions'

const initialState: any = {
  allBlockchain: undefined,
  allCurrency: undefined,
  currencyByChain: undefined,
  transactionList: undefined,
}

export default createReducer<any>(initialState, (builder) =>
  builder
    .addCase(setAllBlockchain, (state, { payload: { allBlockchain } }) => {
      state.allBlockchain = allBlockchain
    })
    .addCase(setAllCurrency, (state, { payload: { allCurrency } }) => {
      state.allCurrency = allCurrency
    })
    .addCase(setCurrencyByChain, (state, { payload: { currencyByChain } }) => {
      state.currencyByChain = currencyByChain
    })
    .addCase(setTransactionList, (state, { payload: { transactionList } }) => {
      state.transactionList = transactionList
    }),
)
