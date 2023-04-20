import { useCallback, useEffect } from 'react'
import { useSellPullContract } from 'hooks/useContract'
import { useDispatch, useSelector } from 'react-redux'
import { setOwner } from './actions'
import { AppState } from '../index'

export const useGetOwner = () => {
  const dispatch = useDispatch()
  const contractStaking = useSellPullContract()

  const fetchOwner = useCallback(async () => {
    if (contractStaking) {
      const owner = await contractStaking.owner()
      dispatch(setOwner({ owner }))
    }
  }, [contractStaking, dispatch])

  useEffect(() => {
    fetchOwner()
  }, [fetchOwner])

  const { owner } = useSelector((state: AppState) => state.admin)

  return { owner }
}
