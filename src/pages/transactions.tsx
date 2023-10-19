import Transactions from 'views/Transactions'

const pageSupportedChains = process.env.NEXT_PUBLIC_NODE_ENV === 'development' ? [5, 97, 84531] : [1, 56]

const IndexPage = () => {
  return <Transactions pageSupportedChains={pageSupportedChains} />
}

IndexPage.chains = pageSupportedChains

export default IndexPage
