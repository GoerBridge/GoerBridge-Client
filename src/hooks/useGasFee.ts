import { useCallback, useState, useEffect } from 'react'
import { formatBigNumber } from 'utils/formatBalance'
import { useBridgeContract } from './useContract'

export function useGasFee(bridgeAddress?: string) {
  const [gasFee, setGasFee] = useState<number>()
  const bridgeContract = useBridgeContract(bridgeAddress)

  const estimateGas = async () => {
    const feePercentageBridge = await bridgeContract?.feePercentageBridge()
    const decimalPercent = await bridgeContract?.DECIMALPERCENT()
    setGasFee(+feePercentageBridge?.toString() / +decimalPercent?.toString())
  }

  useEffect(() => {
    estimateGas()
  }, [bridgeContract])

  return gasFee
}
