import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { getTransactionList } from 'services/api/home'
import { setTransactionList } from './actions'
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'

export const useFetchTransaction = (): {
  fetchTransaction: () => void
  loading: boolean
  setParamsTransaction: any
} => {
  const { account } = useWeb3React()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [paramsTransaction, setParamsTransaction] = useState({
    page: 1,
    pageSize: 10,
    fromAddress: '',
    toAddress: '',
  })

  const fetchTransaction = useCallback(
    async (address?: string) => {
      setLoading(true)
      try {
        getTransactionList({ ...paramsTransaction, fromAddress: address, toAddress: address }).then((response) => {
          if (response.code === 200) {
            dispatch(setTransactionList({ transactionList: response.data.rows }))
            setLoading(false)
          } else {
            dispatch(setTransactionList({ transactionList: null }))
          }
        })
      } catch (error) {
        console.error(error)
        dispatch(setTransactionList({ transactionList: null }))
      }
    },
    [dispatch, paramsTransaction],
  )

  useEffect(() => {
    fetchTransaction(account)
  }, [fetchTransaction, account])

  return { fetchTransaction, loading, setParamsTransaction }
}

export const useTransactionList = () => {
  const transactionList = useSelector((state: AppState) => state.home.transactionList)
  return transactionList
}
