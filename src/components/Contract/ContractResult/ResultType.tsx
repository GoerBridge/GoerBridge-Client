/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react'
import styled from 'styled-components'
import { Link } from 'components/Link'
import { getContractResult } from 'utils/contractResult'
import { ABI_TYPE } from 'state/admin/types'

const ResultTypeStyled = styled.div`
  margin-top: 14px;
`

const ResultType = ({ address, abi, result }) => {
  return (
    <ResultTypeStyled>
      [&nbsp;
      <b>
        {abi.name}({abi?.inputs?.map((item, i) => `${i > 0 ? ', ' : ''}${item.type}`)})
      </b>{' '}
      method Response ] &nbsp;
      {abi?.outputs?.map((output) => {
        return (
          <div key={output.name}>
            <span className="text-success">{'>>'}</span>&nbsp;
            <strong>{output.name}</strong> &nbsp;
            <span className="text-span">
              <i>{output.type}</i>
            </span>
            &nbsp; <b>:</b> &nbsp;
            {abi?.outputs?.map((output: any) => {
              const text = getContractResult(output.type, result)
              switch (output.type) {
                case ABI_TYPE.address:
                  return (
                    <>
                      {address?.toLowerCase() === result?.toLowerCase() ? (
                        <span>{text}</span>
                      ) : (
                        <Link href={`/address/${text}`}>{text}</Link>
                      )}
                    </>
                  )
                default:
                  return <span>{text}</span>
              }
            })}
          </div>
        )
      })}
      <br />
    </ResultTypeStyled>
  )
}

export default ResultType
