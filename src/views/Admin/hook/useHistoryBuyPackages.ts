import { gql } from 'graphql-request'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useEffect, useCallback, useState } from 'react'
import { getSellPullGraph } from 'utils/graphql'
import { HistoryBuyPackageType } from '../types'

export interface BuyPackagesQuery {
  total?: number
  packageId?: string
  userAddress?: string
  transactionHash?: string
  orderBy?: string
}

//
const fetchDataFromGraph = async (
  { total, packageId, userAddress, transactionHash, orderBy }: BuyPackagesQuery,
  chainId,
  createdTimeFrom?,
  createdTimeTo?,
) => {
  const currentTimeHours = new Date().getHours()
  const currentTimeMinute = new Date().getMinutes()
  const currentTimeSecond = new Date().getSeconds()
  const currentTime = currentTimeHours * 60 * 60 + currentTimeMinute * 60 + currentTimeSecond

  const whereString = `
    ${total ? `first: ${+total},` : ''}
    where: {
      ${packageId ? `packageId: "${packageId}"` : ''}
      ${userAddress ? `userAddress: "${userAddress}"` : ''}
      ${transactionHash ? `transactionHash: "${transactionHash}"` : ''}
    },
    ${orderBy ? `orderBy: ${+orderBy},` : ''}
    orderDirection: asc
  `

  const whereStringDate = `
    ${total ? `first: ${+total},` : ''}
    where: {
      ${packageId ? `packageId: "${packageId}"` : ''}
      ${userAddress ? `userAddress: "${userAddress}"` : ''}
      ${transactionHash ? `transactionHash: "${transactionHash}"` : ''}
      ${createdTimeFrom ? `createdTime_gte: "${Number(createdTimeFrom) - currentTime}"` : ''}
      ${createdTimeTo ? `createdTime_lte: "${Number(createdTimeTo) + (86400 - currentTime)}"` : ''}
    },
    ${orderBy ? `orderBy: ${+orderBy},` : ''}
    orderDirection: asc
  `
  try {
    const query = !createdTimeFrom
      ? gql`
          query buyPackages {
            buyPackages(${whereString}) {
              id
              amountBuy
              amountToken
              createdTime
              packageId
              transactionHash
              userAddress
            }
          }
        `
      : gql` 
      query buyPackages { 
        buyPackages(${whereStringDate}) {
          id
          amountBuy
          amountToken
          createdTime
          packageId
          transactionHash
          userAddress
        }
      }
    `
    const data: any = await getSellPullGraph(chainId).request(query)
    return { status: true, data: data?.buyPackages }
  } catch (error: any) {
    console.error('Failed to fetch BuyPackagesQuery', error)
    return { status: false, data: undefined, error }
  }
}

interface ResponseClaimBuyPackages {
  dataReport: HistoryBuyPackageType[] | undefined | null
}

export const useClaimBuyPackages = (
  packages: object,
  chainId: number,
  createdTimeFrom: string,
  createdTimeTo: string,
): {
  buyPackages: ResponseClaimBuyPackages
  fetchBuyPackages: () => void
} => {
  const [buyPackages, setBuyPackages] = useState<ResponseClaimBuyPackages>({
    dataReport: undefined,
  })

  const fetchBuyPackages = useCallback(async () => {
    const { data, status } = await fetchDataFromGraph(packages, chainId, createdTimeFrom, createdTimeTo)

    if (status) {
      setBuyPackages({
        dataReport: data || null,
      })
    }
  }, [chainId, createdTimeFrom, createdTimeTo, packages])

  useEffect(() => {
    fetchBuyPackages()
  }, [fetchBuyPackages])

  return { buyPackages, fetchBuyPackages }
}

/**
 * History buy packages
 */
export const useHistoryBuyPackages = (
  packageId,
): [
  result: HistoryBuyPackageType[],
  fetchData: () => void,
  params: BuyPackagesQuery,
  setParams: (p: BuyPackagesQuery) => void,
] => {
  const { chainId } = useActiveChainId()
  const [params, setParams] = useState<BuyPackagesQuery>({ total: 10 })
  const [result, setResult] = useState<HistoryBuyPackageType[] | undefined>()

  useEffect(() => {
    if (packageId) {
      setParams((prev) => ({
        ...prev,
        packageId,
      }))
    }
  }, [packageId])

  const fetchData = useCallback(async () => {
    if (params.userAddress || params.packageId || params.transactionHash) {
      const { data, status } = await fetchDataFromGraph(params, chainId)
      if (status) {
        setResult(data)
      }
    }
  }, [params, chainId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [result, fetchData, params, setParams]
}

/**
 * History buy packages by account
 */
export const useHistoryBuyPackagesByAccount = ({
  account,
}: {
  account?: string
}): [
  result: HistoryBuyPackageType[],
  fetchData: () => void,
  params: BuyPackagesQuery,
  setParams: (p: BuyPackagesQuery) => void,
] => {
  const { chainId } = useActiveChainId()
  const [params, setParams] = useState<BuyPackagesQuery>({ total: 10 })
  const [result, setResult] = useState<HistoryBuyPackageType[] | undefined>()

  useEffect(() => {
    if (account) {
      setParams((prev) => ({
        ...prev,
        userAddress: account,
      }))
    }
  }, [account])

  const fetchData = useCallback(async () => {
    if (params.userAddress) {
      const { data, status } = await fetchDataFromGraph(params, chainId)
      if (status) {
        setResult(data)
      }
    }
  }, [chainId, params])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return [result, fetchData, params, setParams]
}
