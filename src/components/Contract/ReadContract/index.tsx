/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useReducer, useState } from 'react'
import { Space } from 'antd'
import styled from 'styled-components'
import CollapseBase from 'components/CollapseBase'
import { useContract } from 'hooks/useContract'
import { ABI_ACTION_TYPE } from 'state/admin/types'
import ContractResult from '../ContractResult'

const ReadContractStyled = styled.div`
  .top-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .top-label-left {
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
      p {
        font-size: 14px;
        font-weight: 500;
        line-height: 18px;
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

const ReadContract = ({ address, readAbi }) => {
  const [expandAll, setExpandAll] = useState(false)

  const contract = useContract(address, readAbi, false)

  const handleExpandAll = () => {
    setExpandAll((prev) => !prev)
  }

  return (
    <ReadContractStyled>
      <div className="top-label">
        <div className="top-label-left">
          <img src="/images/icon/document_icon.png" alt="" />
          <p>Read Contract Information</p>
        </div>
        <div className="top-label-right">
          <a onClick={handleExpandAll}>{expandAll ? '[Collapse all]' : '[Expand All]'}</a>
          <a>[Reset]</a>
        </div>
      </div>

      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        {readAbi?.map((abi, i) => {
          return (
            <CollapseBase
              key={abi.name}
              title={`${i + 1}. ${abi.name}`}
              expandAll={expandAll}
              rightNode={<img className="read-contract-method-right-node" src="/images/icon/share_icon.png" alt="" />}
              content={<ContractResult type={ABI_ACTION_TYPE.read} address={address} abi={abi} contract={contract} />}
              collapseIcon={undefined}
            />
          )
        })}
      </Space>
      <br />
      <br />
      <br />
    </ReadContractStyled>
  )
}

export default ReadContract
