/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import AdminLayout from 'components/Admin/Layout'
import { chains } from 'utils/wagmi'

import { Space, Table } from 'antd'
import styled from 'styled-components'

import Image from 'next/image'
import { useAllCurrency, useFetchAllCurrency } from 'state/home/fetchCurrency'
import { useRouter } from 'next/router'

const pageSupportedChains = chains.map((chain) => chain.id)

const TokenListStyled = styled.div`
  .top-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .top-label-left {
      display: flex;
      align-items: center;
      button.connect_wallet {
        color: #fff;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;

        padding: 0.375rem 0.75rem;
        user-select: none;
        background-color: #6c757d;
        border: 1px solid transparent;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
          box-shadow 0.15s ease-in-out;
      }
      a.connect_success {
        color: #fff;
        font-weight: 400;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;

        padding: 0.375rem 0.75rem;
        user-select: none;
        background-color: var(--primary);
        border: 1px solid transparent;
        border-radius: 0.25rem;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
          box-shadow 0.15s ease-in-out;
      }
    }
    .top-label-right {
      a {
        font-size: 14px;
        font-weight: 500;
        &:first-child {
          margin-right: 8px;
        }
        &:hover {
          color: var(--primary);
        }
      }
    }
  }
  .read-contract-method-right-node {
    width: 24px;
    height: 24px;
    margin-right: 12px;
  }
`

const TokenList = () => {
  useFetchAllCurrency()
  const allCurrency = useAllCurrency()
  const router = useRouter()

  const columns = [
    {
      title: 'Name',
      key: 'title',
      render: (text, record) => (
        <Space size="middle">
          <a
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => {
              router.push(`/admin/token-list/${record.contract_bridge}`)
            }}
          >
            <div style={{ marginRight: 12 }}>{record.title}</div>{' '}
            <Image src={record.logo} width={20} height={20} unoptimized />
          </a>
        </Space>
      ),
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Blockchain id',
      dataIndex: 'blockchain_id',
      key: 'blockchain_id',
    },
    {
      title: 'Contract address',
      dataIndex: 'contract_bridge',
      key: 'contract_bridge',
    },
    {
      title: 'System Fee',
      dataIndex: 'system_fee',
      key: 'system_fee',
    },
    {
      title: 'Usd Rate',
      dataIndex: 'usd_rate',
      key: 'usd_rate',
    },
  ]

  return (
    <TokenListStyled>
      <Table scroll={{ x: 500 }} dataSource={allCurrency} columns={columns} />
    </TokenListStyled>
  )
}
TokenList.chains = pageSupportedChains
TokenList.mp = true
TokenList.Layout = AdminLayout
export default TokenList
