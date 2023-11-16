import Transactions from 'views/Transactions'
import { bsc, creditChain } from '../../packages/wagmi/chains/chains'

const CHAINS = process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? [bsc.id, creditChain.id] : [bsc.id, creditChain.id]

const IndexPage = () => {
  return <Transactions pageSupportedChains={CHAINS} />
}

IndexPage.chains = CHAINS

export default IndexPage
