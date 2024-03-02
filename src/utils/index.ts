/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
import type { Signer } from '@ethersproject/abstract-signer'
import { getAddress } from '@ethersproject/address'
import { BigNumber } from '@ethersproject/bignumber'
import { AddressZero } from '@ethersproject/constants'
import { Contract } from '@ethersproject/contracts'
import type { Provider } from '@ethersproject/providers'
import { ChainId, Currency } from '@pancakeswap/sdk'
import { bsc } from '@pancakeswap/wagmi/chains'
import memoize from 'lodash/memoize'
import { TokenAddressMap } from '@pancakeswap/tokens'
import { chains } from './wagmi'

// returns the checksummed address if the address is valid, otherwise returns false
export const isAddress = memoize((value: any): string | false => {
  try {
    return getAddress(value)
  } catch {
    return false
  }
})

export function getBlockExploreLink(
  data: string | number,
  type: 'transaction' | 'token' | 'address' | 'block' | 'countdown',
  chainIdOverride?: number,
): string {
  const chainId = chainIdOverride || ChainId.BSC
  const chain = chains.find((c) => c.id === chainId)
  if (!chain) return bsc.blockExplorers.default.url
  switch (type) {
    case 'transaction': {
      return `${chain.blockExplorers.default.url}/tx/${data}`
    }
    case 'token': {
      return `${chain.blockExplorers.default.url}/token/${data}`
    }
    case 'block': {
      return `${chain.blockExplorers.default.url}/block/${data}`
    }
    case 'countdown': {
      return `${chain.blockExplorers.default.url}/block/countdown/${data}`
    }
    default: {
      return `${chain.blockExplorers.default.url}/address/${data}`
    }
  }
}

export function getBlockExploreName(chainIdOverride?: number) {
  const chainId = chainIdOverride || ChainId.BSC
  const chain = chains.find((c) => c.id === chainId)

  return chain?.blockExplorers?.default.name || bsc.blockExplorers.default.name
}

export function getBscScanLinkForNft(collectionAddress: string, tokenId: string): string {
  return `${bsc.blockExplorers.default.url}/token/${collectionAddress}?a=${tokenId}`
}

// add 10%
export function calculateGasMargin(value: BigNumber, margin = 1000): BigNumber {
  return value?.mul(BigNumber.from(10000).add(BigNumber.from(margin))).div(BigNumber.from(10000))
}

// account is optional
export function getContract(address: string, ABI: any, signer?: Signer | Provider): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, signer)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function isTokenOnList(defaultTokens: TokenAddressMap, currency?: Currency): boolean {
  if (currency?.isNative) return true
  return Boolean(currency?.isToken && defaultTokens[currency.chainId]?.[currency.address])
}

export function toLocaleString(x) {
  return x.toLocaleString('fullwide', { useGrouping: false })
}

export function isEqual(value, other) {
  if (value === other) return true

  // Get the value type
  const type = Object.prototype.toString.call(value)
  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false
  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false
  // Compare the length of the length of the two items
  const valueLen = type === '[object Array]' ? value.length : Object.keys(value).length
  const otherLen = type === '[object Array]' ? other.length : Object.keys(other).length
  if (valueLen !== otherLen) return false

  // Compare two items
  const compare = (item1, item2) => {
    // Get the object type
    const itemType = Object.prototype.toString.call(item1)
    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false
    }
    // Otherwise, do a simple comparison
    else {
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false
      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false
      } else if (item1 !== item2) return false
    }
  }
  // Compare properties
  if (type === '[object Array]') {
    for (let i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false
    }
  } else {
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false
      }
    }
  }
  // If nothing failed, return true
  return true
}
