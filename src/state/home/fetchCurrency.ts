import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { getAllCurrency, getCurrencyAttr } from 'services/api/home'
import { setAllCurrency, setCurrencyByChain } from './actions'

export const useFetchAllCurrency = (): {
  fetchAllCurrency: () => void
  loading: boolean
} => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const fetchAllCurrency = useCallback(async () => {
    setLoading(true)
    try {
      const params = {
        project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
      }
      getAllCurrency(params).then((response) => {
        // console.log('all currentcy', response)
        if (response.code === 200) {
          dispatch(setAllCurrency({ allCurrency: response.data }))
          setLoading(false)
        } else {
          dispatch(setAllCurrency({ allCurrency: null }))
        }
      })
    } catch (error) {
      console.error(error)
      dispatch(setAllCurrency({ allCurrency: null }))
    }
  }, [dispatch])

  useEffect(() => {
    fetchAllCurrency().then()
  }, [fetchAllCurrency])

  return { fetchAllCurrency, loading }
}

export const useAllCurrency = () => {
  return useSelector((state: AppState) => state.home.allCurrency)
}

export const useFetchAllCurrencyByChain = (
  params,
): {
  fetchAllCurrencyByChain: () => void
  loading: boolean
  setFetchCurrencyAttrParams: any
} => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [fetchCurrencyAttrParams, setFetchCurrencyAttrParams] = useState(params)
  const fetchAllCurrencyByChain = useCallback(async () => {
    setLoading(true)
    try {
      getCurrencyAttr({
        ...params,
        project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
      }).then((response) => {
        // console.log('fetchCurrencyAttrParams', fetchCurrencyAttrParams)
        if (response.code === 200) {
          dispatch(setCurrencyByChain({ currencyByChain: response.data }))
          setLoading(false)
        } else {
          dispatch(setCurrencyByChain({ currencyByChain: null }))
        }
      })
    } catch (error) {
      console.error(error)
      dispatch(setCurrencyByChain({ currencyByChain: null }))
    }
  }, [dispatch, fetchCurrencyAttrParams, params])

  useEffect(() => {
    if (params.blockchain_id) {
      fetchAllCurrencyByChain()
    }
  }, [params.blockchain_id])

  return { fetchAllCurrencyByChain, loading, setFetchCurrencyAttrParams }
}

export const useCurrencyByChain = () => {
  return useSelector((state: AppState) => state.home.currencyByChain)
}
