export const allBlockchain = [
  {
    _id: '652e96bccb36ab001115db58',
    code: 'BSC_TESTNET',
    title: 'BSC Chain Testnet',
    scan: 'https://testnet.bscscan.com',
    rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    active: true,
    chainid: 97,
    project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
    createdAt: 1676130174,
    updatedAt: 1676130174,
    currency_id: '652f9293d5d69d39f815c25a',
    transfers: [5],
  },
  {
    _id: '652e9656cb36ab001115db57',
    code: 'Goerli_ETH',
    title: 'Goerli Testnet Chain',
    scan: 'https://goerli.etherscan.io/',
    rpc: 'https://ethereum-goerli.publicnode.com',
    active: true,
    chainid: 5,
    project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
    createdAt: 1678094628,
    updatedAt: 1678094628,
    currency_id: '652f9276d5d69d39f815c259',
    transfers: [97],
  },
]