import axios from 'axios'
import { useSellPullContract } from 'hooks/useContract'
import { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../index'
import { getAddressDetail, setOwner } from './actions'

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
function getAddressDetailFromApi(address) {
  return axios
    .get(`${process.env.NEXT_PUBLIC_SCAN_API}https://scan-api.creditsmartchain.com/api/v1/address/${address}`, {
      method: 'GET',
    })
    .then((res) => {
      return {
        data: res.data.data,
        status: res.data.status,
      }
    })
}
export const useAddressDetail = (address) => {
  const dispatch = useDispatch()

  const fetchAddressDetail = useCallback(async () => {
    if (address) {
      const addressDetailFromApi = await getAddressDetailFromApi(address)
      dispatch(getAddressDetail(addressDetailFromApi))
    }
  }, [dispatch, address])

  useEffect(() => {
    fetchAddressDetail()
  }, [fetchAddressDetail])
  const { addressDetail } = useSelector((state: AppState) => state.admin)
  return {
    addressDetail,
    fetchAddressDetail,
  }
}
