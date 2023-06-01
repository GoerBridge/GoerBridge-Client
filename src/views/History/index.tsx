import { useEffect } from 'react'
import { allBlockchain } from 'config/configChain'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useFetchTransaction, useTransactionList } from 'state/home/fetchTransaction'
import TransactionBridge from './components/TransactionBridge'

function History() {
  const { setParamsTransaction } = useFetchTransaction()
  const { account } = useActiveWeb3React()
  // const account2 = "0x45fd4A320b2130FB43805f74F6D19878D86dad54"

  // Fetch transaction
  useEffect(() => {
    setParamsTransaction({
      page: 1,
      pageSize: 10,
      fromAddress: account, // '0x45fd4A320b2130FB43805f74F6D19878D86dad54',
      toAddress: account, // '0x45fd4A320b2130FB43805f74F6D19878D86dad54',
      project_id: process.env.NEXT_PUBLIC_PROJECT_ID,
    })
  }, [account])

  const transactionList = useTransactionList()
  return <TransactionBridge transactionList={transactionList} chainList={allBlockchain} />
}

export default History
