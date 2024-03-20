/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import AdminHomePage from 'views/Admin/Home'
import AdminLayout from 'components/Admin/Layout'
import { chains } from 'utils/wagmi'

import React, { useMemo, useState } from 'react'
import { Space } from 'antd'
import styled from 'styled-components'
import CollapseBase from 'components/CollapseBase'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

import { useContract } from 'hooks/useContract'
import { formatCode } from 'helpers'
import ContractResult from 'components/Contract/ContractResult'
import { ABI_ACTION_TYPE } from 'state/admin/types'
import ConnectWallet from 'components/Menu/UserMenu/ConnectWallet'
import { useAddressDetail } from 'state/admin/hook'
import UserWalletWithModal from 'components/Menu/UserWalletWithModal'

const pageSupportedChains = chains.map((chain) => chain.id)

const WriteContractStyled = styled.div`
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

const WriteContract = () => {
  const [expandAll, setExpandAll] = useState(false)
  const [modalConnect, setModalConnect] = useState({ isOpen: false, dataModal: null })
  const token = '0xa6568DF887B80bfCf77327aB331afeE00ADD597a'
  const address = '0xa6568DF887B80bfCf77327aB331afeE00ADD597a'
  const { addressDetail } = useAddressDetail(token)

  const writeAbi = useMemo(() => {
    if (!addressDetail?.ab) return []
    return addressDetail?.ab?.filter((abi) => abi.stateMutability !== 'view' && abi.type === 'function')
  }, [addressDetail])
  const { account } = useActiveWeb3React()

  const contract = useContract(address, writeAbi)

  const handleExpandAll = () => {
    setExpandAll((prev) => !prev)
  }

  return (
    <WriteContractStyled>
      <div className="top-label">
        <div className="top-label-left">
          <UserWalletWithModal />
        </div>
        <div className="top-label-right">
          <a onClick={handleExpandAll}>{expandAll ? '[Collapse all]' : '[Expand All]'}</a>
          <a>[Reset]</a>
        </div>
      </div>

      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        {writeAbi?.map((abi, i) => {
          return (
            <CollapseBase
              key={abi.name}
              title={`${i + 1}. ${abi.name}`}
              expandAll={expandAll}
              rightNode={<img className="read-contract-method-right-node" src="/images/icon/share_icon.png" alt="" />}
              content={<ContractResult type={ABI_ACTION_TYPE.write} address={address} abi={abi} contract={contract} />}
              collapseIcon={undefined}
            />
          )
        })}
      </Space>
      <br />
      <br />
      <br />
    </WriteContractStyled>
  )
}
WriteContract.chains = pageSupportedChains
WriteContract.mp = true
WriteContract.Layout = AdminLayout
export default WriteContract
