/* eslint-disable no-unneeded-ternary */
import React from 'react'
import styled from 'styled-components'

const InputWithLeftIconStyled = styled.div<any>`
  width: 100%;
  position: relative;
  .winput {
    color: var(--text);
    line-height: 1.5;
    width: 100%;
    height: 36px;
    background-color: #fff;
    background-clip: padding-box;
    border: ${({ error }) => (error ? '1px solid red' : '1px solid var(--border-color)')};
    border-radius: 4px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    display: flex;
    align-items: center;
    &:hover,
    &:focus {
      border: ${({ error }) => (error ? '1px solid red' : '1px solid #ced4da')};
    }
    .input-group-prepend {
      width: 36px;
      min-width: 36px;
      height: 100%;
      border-right: 1px solid #d5dae2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    input {
      width: 100%;
      padding: 0.375rem 0.75rem;
      border: unset;
      &:hover,
      &:focus {
        border: unset;
        outline: unset;
      }
    }
  }
`

export const InputWithLeftIcon = ({
  name,
  onChange,
  onTouched,
  value,
  onBlur,
  placeholder,
  error,
  leftIcon,
  ...props
}) => {
  return (
    <InputWithLeftIconStyled error={error}>
      <div className="winput">
        <div className="input-group-prepend">{leftIcon}</div>
        <input
          id={name}
          type="text"
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => {
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const value = e.target.value
            setTimeout(() => {
              onTouched()
              if (onBlur) onBlur(value)
            }, 500)
          }}
          value={value || ''}
          placeholder={placeholder ? placeholder : ''}
        />
      </div>
    </InputWithLeftIconStyled>
  )
}
