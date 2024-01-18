import { ChainId } from '@pancakeswap/sdk'
import memoize from 'lodash/memoize'
import get from 'lodash/get'
import invert from 'lodash/invert'

export const CHAIN_QUERY_NAME = {
  [ChainId.ETHEREUM]: 'eth',
  [ChainId.GOERLI]: 'goerli',
  [ChainId.BSC]: 'bsc',
  [ChainId.BSC_TESTNET]: 'bscTestnet',
  [ChainId.CREDIT]: 'credit',
  [ChainId.AVALANCHE]: 'avax',
}

const CHAIN_QUERY_NAME_TO_ID = invert(CHAIN_QUERY_NAME)

export const getChainId = memoize((chainName: string) => {
  if (!chainName) return undefined
  return CHAIN_QUERY_NAME_TO_ID[chainName] ? +CHAIN_QUERY_NAME_TO_ID[chainName] : undefined
})

let chainKey = null
if (typeof global.window !== undefined) {
  chainKey = new URLSearchParams(get(global, 'window.location.search'))?.get('chain')
}
export const ACTIVE_CHAIN =
  chainKey === CHAIN_QUERY_NAME[ChainId.BSC]
    ? CHAIN_QUERY_NAME[ChainId.BSC]
    : chainKey === CHAIN_QUERY_NAME[ChainId.CREDIT]
    ? CHAIN_QUERY_NAME[ChainId.CREDIT]
    : CHAIN_QUERY_NAME[ChainId.AVALANCHE] // edit
