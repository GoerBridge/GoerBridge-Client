import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTransactionList } from 'services/api/home'
import { AppState } from 'state'
import { setTransactionList } from './actions'

export const useFetchTransaction = (): {
  fetchTransaction: () => void
  loading: boolean
  setParamsTransaction: any
} => {
  const { account } = useActiveWeb3React()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [paramsTransaction, setParamsTransaction] = useState({
    page: 1,
    pageSize: 10,
    fromAddress: '',
    toAddress: '',
    project_id: '',
  })

  const fetchTransaction = useCallback(
    async (address?: string) => {
      setLoading(true)
      try {
        getTransactionList({ ...paramsTransaction }).then((response) => {
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
