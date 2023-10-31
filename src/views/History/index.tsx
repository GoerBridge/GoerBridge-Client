import { useEffect } from 'react'

import { useFetchTransaction, useTransactionList } from 'state/home/fetchTransaction'
import { useAllBlockchain } from 'state/home/fetchAllBlockChain'
import TransactionBridge from './components/TransactionBridge'

function History() {
  const { setParamsTransaction } = useFetchTransaction()
  const allBlockchain = useAllBlockchain()
  // Fetch transaction
  useEffect(() => {
    setParamsTransaction((prev) => ({
      ...prev,
      pageSize: 10,
    }))
  }, [])
  const transactionList = useTransactionList()
  return <TransactionBridge transactionList={transactionList} chainList={allBlockchain} />
}

export default History
