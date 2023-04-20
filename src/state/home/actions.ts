import { createAction } from '@reduxjs/toolkit'
// import { LockupItemType, ParamsAllLockup } from './types'

export const setAllBlockchain = createAction<{ allBlockchain: any | null | undefined }>('blockChain/setAllBlockchain')
export const setAllCurrency = createAction<{ allCurrency: any | null | undefined }>('currency/setAllCurrency')
export const setCurrencyByChain = createAction<{ currencyByChain: any | null | undefined }>(
  'currency/setCurrencyByChain',
)
export const setTransactionList = createAction<{ transactionList: any | null | undefined }>(
  'transaction/setTransactionList',
)
