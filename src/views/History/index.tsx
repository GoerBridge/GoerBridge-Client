import { useEffect } from 'react'

import { allBlockchain } from 'config/configChain'
import { useFetchTransaction, useTransactionList } from 'state/home/fetchTransaction'
import TransactionBridge from './components/TransactionBridge'

function History() {
  const { setParamsTransaction } = useFetchTransaction()

  // Fetch transaction
  useEffect(() => {
    setParamsTransaction((prev) => ({
      ...prev,
      pageSize: 3,
    }))
  }, [])
  const transactionList = useTransactionList()
  return <TransactionBridge transactionList={transactionList} chainList={allBlockchain} />
}

export default History
