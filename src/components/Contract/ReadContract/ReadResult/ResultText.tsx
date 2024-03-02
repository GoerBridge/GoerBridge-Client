import React from 'react'
import styled from 'styled-components'
import { Link } from 'components/Link'

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

const ResultText = ({ text, href, target, type }) => {
  const isHttp = href?.startsWith('http')
  return (
    <ResultTextStyled>
      {!href ? (
        <>{text}</>
      ) : (
        <>
          {isHttp ? (
            <a {...(href && { href })} {...(target && { target })}>
              {text}
            </a>
          ) : (
            <Link {...(href && { href })}>{text}</Link>
          )}
        </>
      )}
      {type && (
        <i>
          <span className="text-monospace ">{type}</span>
        </i>
      )}
    </ResultTextStyled>
  )
}

export default ResultText
