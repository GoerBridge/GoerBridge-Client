import { Card, Tabs, TabsProps } from 'antd'
import AdminLayout from 'components/Admin/Layout'
import ReadContract from 'components/Contract/ReadContract'
import WriteContract from 'components/Contract/WriteContract'
import EmptyContract from 'components/EmptyContract'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useAddressDetail } from 'state/admin/hook'
import { chains } from 'utils/wagmi'

const pageSupportedChains = chains.map((chain) => chain.id)

const TokenDetailPage = () => {
  const router = useRouter()
  const { token } = router.query
  const { addressDetail } = useAddressDetail(token)

  const readAbi = useMemo(() => {
    if (!addressDetail?.ab) return []
    return addressDetail?.ab?.filter((abi) => abi.stateMutability === 'view' && abi.type === 'function')
  }, [addressDetail])

  const writeAbi = useMemo(() => {
    if (!addressDetail?.ab) return []
    return addressDetail?.ab?.filter((abi) => abi.stateMutability !== 'view' && abi.type === 'function')
  }, [addressDetail])

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Read Contract',
      children: addressDetail?.ad ? (
        <ReadContract address={token} readAbi={readAbi} />
      ) : (
        <EmptyContract address={token} />
      ),
    },
    {
      key: '2',
      label: 'Write Contract',
      children: addressDetail?.ad ? (
        <WriteContract address={token} writeAbi={writeAbi} />
      ) : (
        <EmptyContract address={token} />
      ),
    },
  ]

  return (
    <div>
      <Card>
        <Tabs items={items} />
      </Card>
    </div>
  )
}

TokenDetailPage.Layout = AdminLayout
TokenDetailPage.chains = pageSupportedChains
TokenDetailPage.mp = true
export default TokenDetailPage
