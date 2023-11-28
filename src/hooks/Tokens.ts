/* eslint-disable no-param-reassign */
import { arrayify } from '@ethersproject/bytes'
import { parseBytes32String } from '@ethersproject/strings'
import { Currency, Token } from '@pancakeswap/sdk'
import { TokenAddressMap } from '@pancakeswap/tokens'
import { GELATO_NATIVE } from 'config/constants'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import useSWRImmutable from 'swr/immutable'
import multicall from 'utils/multicall'
import { FetchStatus } from 'config/constants/types'
import { ERC20_BYTES32_ABI } from '../config/abi/erc20'
import erc20ABI from '../config/abi/erc20.json'
import {
  combinedTokenMapFromActiveUrlsAtom,
  combinedTokenMapFromOfficialsUrlsAtom,
  useUnsupportedTokenList,
  useWarningTokenList,
} from '../state/lists/hooks'
import useUserAddedTokens from '../state/user/hooks/useUserAddedTokens'
import { isAddress } from '../utils'
import { useActiveChainId } from './useActiveChainId'
import useNativeCurrency from './useNativeCurrency'

const mapWithoutUrls = (tokenMap: TokenAddressMap, chainId: number) =>
  Object.keys(tokenMap[chainId] || {}).reduce<{ [address: string]: Token }>((newMap, address) => {
    newMap[address] = tokenMap[chainId][address].token
    return newMap
  }, {})

/**
 * Returns all tokens that are from active urls and user added tokens
 */
export function useAllTokens(): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()
  const tokenMap = useAtomValue(combinedTokenMapFromActiveUrlsAtom)
  const userAddedTokens = useUserAddedTokens()
  return useMemo(() => {
    return (
      userAddedTokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: Token }>(
          (tokenMap_, token) => {
            tokenMap_[token.address] = token
            return tokenMap_
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          mapWithoutUrls(tokenMap, chainId),
        )
    )
  }, [userAddedTokens, tokenMap, chainId])
}

/**
 * Returns all tokens that are from officials token list and user added tokens
 */
export function useOfficialsAndUserAddedTokens(): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()
  const tokenMap = useAtomValue(combinedTokenMapFromOfficialsUrlsAtom)
  const userAddedTokens = useUserAddedTokens()
  return useMemo(() => {
    return (
      userAddedTokens
        // reduce into all ALL_TOKENS filtered by the current chain
        .reduce<{ [address: string]: Token }>(
          (tokenMap_, token) => {
            tokenMap_[token.address] = token
            return tokenMap_
          },
          // must make a copy because reduce modifies the map, and we do not
          // want to make a copy in every iteration
          mapWithoutUrls(tokenMap, chainId),
        )
    )
  }, [userAddedTokens, tokenMap, chainId])
}

export function useUnsupportedTokens(): { [address: string]: Token } {
  const { chainId } = useActiveWeb3React()
  const unsupportedTokensMap = useUnsupportedTokenList()
  return useMemo(() => mapWithoutUrls(unsupportedTokensMap, chainId), [unsupportedTokensMap, chainId])
}

export function useWarningTokens(): { [address: string]: Token } {
  const warningTokensMap = useWarningTokenList()
  const { chainId } = useActiveWeb3React()
  return useMemo(() => mapWithoutUrls(warningTokensMap, chainId), [warningTokensMap, chainId])
}

export function useIsTokenActive(token: Token | undefined | null): boolean {
  const activeTokens = useAllTokens()

  if (!activeTokens || !token) {
    return false
  }

  return !!activeTokens[token.address]
}

// Check if currency is included in custom list from user storage
export function useIsUserAddedToken(currency: Currency | undefined | null): boolean {
  const userAddedTokens = useUserAddedTokens()

  if (!currency) {
    return false
  }

  return !!userAddedTokens.find((token) => currency?.equals(token))
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/

function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : // need to check for proper bytes string and valid terminator
    bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
    ? parseBytes32String(bytes32)
    : defaultValue
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(tokenAddress?: string): Token | undefined | null {
  const { chainId } = useActiveChainId()
  const tokens = useAllTokens()

  const address = isAddress(tokenAddress)

  const token: Token | undefined = address ? tokens[address] : undefined

  const { data, status } = useSWRImmutable(
    !token && chainId && address && ['fetchTokenInfo', chainId, address],
    async () => {
      const calls = ['name', 'symbol', 'decimals'].map((method) => {
        return { address: address.toString(), name: method }
      })

      return multicall(erc20ABI, calls, chainId)
    },
  )

  const tokenName = data?.[0]?.[0]
  const symbol = data?.[1]?.[0]
  const decimals = data?.[2]?.[0]

  const { data: dataBytes, status: statusBytes } = useSWRImmutable(
    !token &&
      chainId &&
      address &&
      (status === FetchStatus.Fetched || status === FetchStatus.Failed) &&
      (!tokenName || !symbol) && ['fetchTokenInfo32', chainId, address],
    async () => {
      const calls = ['name', 'symbol'].map((method) => {
        return { address: address.toString(), name: method }
      })

      return multicall(ERC20_BYTES32_ABI, calls, chainId)
    },
  )

  const tokenNameBytes32 = dataBytes?.[0]?.[0]
  const symbolBytes32 = dataBytes?.[1]?.[0]

  return useMemo(() => {
    if (token) return token
    if (!chainId || !address) return undefined
    if (status !== FetchStatus.Fetched && statusBytes !== FetchStatus.Fetched) return null
    if (Number.isInteger(decimals)) {
      return new Token(
        chainId,
        address,
        decimals,
        parseStringOrBytes32(symbol, symbolBytes32, 'UNKNOWN'),
        parseStringOrBytes32(tokenName, tokenNameBytes32, 'Unknown Token'),
      )
    }
    return undefined
  }, [address, chainId, status, statusBytes, decimals, symbol, symbolBytes32, token, tokenName, tokenNameBytes32])
}

export function useCurrency(currencyId: string | undefined): Currency | Token | null | undefined {
  console.log('currencyId', currencyId?.toUpperCase())

  const native = useNativeCurrency()
  const isNative =
    currencyId?.toUpperCase() === native.symbol?.toUpperCase() || currencyId?.toLowerCase() === GELATO_NATIVE
  const token = useToken(isNative ? undefined : currencyId)
  return isNative ? native : token
}
