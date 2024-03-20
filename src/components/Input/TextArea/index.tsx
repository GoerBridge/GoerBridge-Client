/* eslint-disable object-shorthand */
/* eslint-disable no-unneeded-ternary */
import React from 'react'
import styled from 'styled-components'

const TextAreaStyled = styled.div<any>`
  width: 100%;
  position: relative;
  .winput {
    color: var(--text);
    line-height: 1.5;
    width: 100%;
    background-color: #fff;
    background-clip: padding-box;
    border: ${({ error }) => (error ? '1px solid red' : '1px solid var(--border-color)')};
    border-radius: 4px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    display: flex;
    align-items: center;
    overflow: hidden;
    &:hover,
    &:focus {
      border: ${({ error }) => (error ? '1px solid red' : '1px solid #ced4da')};
    }
    textarea {
      width: 100%;
      min-height: 100px;
      padding: 12px;
      border: unset;
      &:hover,
      &:focus {
        border: unset;
        outline: unset;
      }
    }
  }
`

export const TextArea = ({
  name,
  onChange,
  onTouched,
  value,
  onBlur,
  placeholder,
  height = '100px',
  error,
  ...props
}) => {
  return (
    <TextAreaStyled error={error}>
      <div className="winput">
        {props.prefix}
        <textarea
          id={name}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => {
            const v = e.target.value
            setTimeout(() => {
              onTouched()
              if (onBlur) onBlur(v)
            }, 500)
          }}
          value={value || ''}
          placeholder={placeholder ? placeholder : ''}
          style={{ height: height }}
        />
        {props.suffix}
      </div>
    </TextAreaStyled>
  )
}
