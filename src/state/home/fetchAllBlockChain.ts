/* eslint-disable camelcase */

import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from 'state'
import { getAllBlockchain } from 'services/api/home'
import { setAllBlockchain } from './actions'

export const useFetchAllBlockchain = (): {
  fetchAllBlockchain: () => void
  loading: boolean
  params: {
    project_id: string
  }
} => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const params = {
    project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
  }

  const fetchAllBlockchain = useCallback(async () => {
    setLoading(true)
    try {
      getAllBlockchain(params).then((response) => {
        if (response.code === 200) {
          dispatch(setAllBlockchain({ allBlockchain: response.data }))
          setLoading(false)
        } else {
          dispatch(setAllBlockchain({ allBlockchain: null }))
        }
      })
    } catch (error) {
      console.error(error)
      dispatch(setAllBlockchain({ allBlockchain: null }))
    }
  }, [dispatch])

  useEffect(() => {
    fetchAllBlockchain()
  }, [fetchAllBlockchain])

  return { fetchAllBlockchain, loading, params }
}

export const useAllBlockchain = () => {
  const allBlockchain = useSelector((state: AppState) => state.home.allBlockchain)
  return allBlockchain
}
