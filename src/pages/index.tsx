import Home from 'views/Home_v2'
import { chains } from 'utils/wagmi'

const pageSupportedChains = chains.map((chain) => chain.id)

// const pageSupportedChains = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? [80001, 97, 30393, 1680] : [1, 56]

const IndexPage = () => {
  return <Home pageSupportedChains={pageSupportedChains} />
}

IndexPage.chains = pageSupportedChains

export default IndexPage
