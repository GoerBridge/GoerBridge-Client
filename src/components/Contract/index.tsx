import { Tabs } from 'antd'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import styled from 'styled-components'

const TabsContractStyled = styled(Tabs)`
  .ant-tabs-nav::before {
    border-bottom: none;
  }
  .ant-tabs-nav-list {
    margin-bottom: 8px;
    & > .ant-tabs-tab {
      padding: 0;
      margin-right: 10px;
      background: transparent;
      border: unset;
      .ant-tabs-tab-btn {
        color: #3c3a3a;
        font-size: 14px;
        font-weight: 500;
        line-height: 21px;
        padding: 4px 8px;
        height: 29px;
        background: #eeeeee;
        border-radius: 4px;
        ${({ theme }) => theme.mediaQueries.sm} {
          font-size: 16px;
        }
      }
    }
    .ant-tabs-tab-active .ant-tabs-tab-btn {
      color: #eeeeee;
      background-color: #3c3a3a;
    }
  }
`

export const CONTRACT_CODE_VIEW = {
  CODE: 'code',
  READ_CONTRACT: 'readContract',
  WRITE_CONTRACT: 'writeContract',
}

const Contract = ({ address, addressDetail }) => {
  const router = useRouter()

  const tabPath = router.asPath.split('#')[0]
  const tabPathActive = router.asPath.split('#')[1]
  const handleChangeTab = (tab) => {
    router.replace(`${tabPath}#${tab}`)
  }

  const readAbi = useMemo(() => {
    if (!addressDetail?.ab) return []
    return addressDetail.ab.filter((abi) => abi.stateMutability === 'view' && abi.type === 'function')
  }, [addressDetail])

  const writeAbi = useMemo(() => {
    if (!addressDetail?.ab) return []
    return addressDetail?.ab?.filter((abi) => abi.stateMutability !== 'view' && abi.type === 'function')
  }, [addressDetail])

  return <></>
}

export default Contract
