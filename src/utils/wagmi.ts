import { BinanceWalletConnector } from '@pancakeswap/wagmi/connectors/binanceWallet'
import { bsc, bscTest, mainnet, goerli, baseGoerliEth, creditChain } from '@pancakeswap/wagmi/chains'
import { configureChains, createClient } from 'wagmi'
import memoize from 'lodash/memoize'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { SafeConnector } from '@gnosis.pm/safe-apps-wagmi'
import { sepolia } from 'wagmi/chains'
import { USDT } from '@pancakeswap/tokens'

const CHAINS =
  process.env.NEXT_PUBLIC_NODE_ENV === 'production'
    ? [bsc, goerli, sepolia, baseGoerliEth, creditChain]
    : [bscTest, goerli, sepolia, baseGoerliEth, creditChain, bsc]

const getNodeRealUrl = (networkName: string) => {
  let host = null

  switch (networkName) {
    case 'homestead':
      if (process.env.NEXT_PUBLIC_NODE_REAL_API_ETH) {
        // host = `eth-mainnet.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_ETH}`
        // 9aa3d95b3bc440fa88ea12eaa4456161`
        host = `eth-mainnet-public.unifra.io`
      }
      break
    case 'rinkeby':
      if (process.env.NEXT_PUBLIC_NODE_REAL_API_RINKEBY) {
        host = `eth-rinkeby.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_RINKEBY}`
      }
      break
    case 'goerli':
      if (process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI) {
        // host = `eth-goerli.nodereal.io/v1/${process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI}`
        // b8e5123f26734b12856154c5ed4e0558`
        host = `goerli.infura.io/v3/${process.env.NEXT_PUBLIC_NODE_REAL_API_GOERLI}`
      }
      break
    case 'maticmum':
      host = `https://rpc-mumbai.matic.today`
      break
    default:
      host = null
  }

  if (!host) {
    return null
  }

  const url = `https://${host}`
  return {
    http: url,
    webSocket: url.replace(/^http/i, 'wss').replace('.nodereal.io/v1', '.nodereal.io/ws/v1'),
  }
}

export const { provider, chains } = configureChains(CHAINS, [
  jsonRpcProvider({
    rpc: (chain) => {
      if (!!process.env.NEXT_PUBLIC_NODE_PRODUCTION && chain.id === bsc.id) {
        return { http: process.env.NEXT_PUBLIC_NODE_PRODUCTION }
      }
      return getNodeRealUrl(chain.network) || { http: chain.rpcUrls.default }
    },
  }),
])

export const injectedConnector = new InjectedConnector({
  chains,
  options: {
    shimDisconnect: false,
    shimChainChangedDisconnect: true,
  },
})

export const coinbaseConnector = new CoinbaseWalletConnector({
  chains,
  options: {
    appName: 'PancakeSwap',
    appLogoUrl: 'https://pancakeswap.com/logo.png',
  },
})

export const walletConnectConnector = new WalletConnectConnector({
  chains,
  options: {
    qrcode: true,
  },
})

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  options: {
    shimDisconnect: false,
    shimChainChangedDisconnect: true,
  },
})

export const bscConnector = new BinanceWalletConnector({ chains })

export const client = createClient({
  autoConnect: false,
  provider,
  connectors: [
    new SafeConnector({ chains }),
    metaMaskConnector,
    injectedConnector,
    coinbaseConnector,
    walletConnectConnector,
    bscConnector,
  ],
})

export const CHAIN_IDS = chains.map((c) => c.id)

export const isChainSupported = memoize((chainId: number) => CHAIN_IDS.includes(chainId))
export const isChainTestnet = memoize((chainId: number) => chains.find((c) => c.id === chainId)?.testnet)
