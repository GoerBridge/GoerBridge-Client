import React from 'react'
import styled from 'styled-components'
import { Link } from 'components/Link'
import { getContractResult } from 'utils/contractResult'
import { ABI_TYPE } from 'state/admin/types'

const ResultTextStyled = styled.div`
  font-size: 14px;
  a {
    color: var(--primary);
  }
  .text-monospace {
    color: #6c757d;
    font-weight: 400;
    margin-left: 6px;
  }
`

const ResultText = ({ address, result, abi }) => {
  const resultTypeText = abi.outputs?.reduce((str, curr, index) => {
    const newStr = str + (index > 0 ? `${curr.name} ${curr.type}, ` : `${curr.name} ${curr.type}`)
    return newStr
  }, '')

  return (
    <ResultTextStyled>
      {result &&
        abi?.outputs?.map((output) => {
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
      {resultTypeText && (
        <i>
          <span className="text-monospace ">{resultTypeText}</span>
        </i>
      )}
    </ResultTextStyled>
  )
}

export default ResultText
