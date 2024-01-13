import Transactions from 'views/Transactions'
import { avalandche, bsc, creditChain } from '../../packages/wagmi/chains/chains'

const CHAINS =
  process.env.NEXT_PUBLIC_NODE_ENV === 'production'
    ? [bsc.id, creditChain.id, avalandche.id]
    : [bsc.id, creditChain.id, avalandche.id]

const IndexPage = () => {
  return <Transactions pageSupportedChains={CHAINS} />
}

IndexPage.chains = CHAINS

export default IndexPage
