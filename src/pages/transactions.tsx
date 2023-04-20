import Transactions from 'views/Transactions'

const pageSupportedChains = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? [80001, 97, 30393, 1680] : [1, 56]

const IndexPage = () => {
  return <Transactions pageSupportedChains={pageSupportedChains} />
}

IndexPage.chains = pageSupportedChains

export default IndexPage
