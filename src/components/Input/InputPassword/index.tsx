/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import styled from 'styled-components'

const InputStyled = styled.div<any>`
  width: 100%;
  position: relative;
  .winput {
    color: var(--text);
    line-height: 1.5;
    width: 100%;
    height: 36px;
    padding: 0.375rem 0.75rem;
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
    input {
      width: 100%;
      border: unset;
      &:hover,
      &:focus {
        border: unset;
        outline: unset;
      }
    }
    .InputPassword_ToggleVisible {
      display: flex;
      cursor: pointer;
      svg {
        width: auto;
        height: 12px;
      }
    }
  }
`

export const InputPassword = ({ name, onChange, onTouched, value, onBlur, placeholder, error, ...props }) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false)
  return (
    <InputStyled error={error}>
      <div className="winput">
        {props.prefix}
        <input
          id={name}
          type={isVisiblePassword ? 'text' : 'password'}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => {
            const { value } = e.target
            setTimeout(() => {
              onTouched()
              if (onBlur) onBlur(value)
            }, 500)
          }}
          value={value || ''}
          placeholder={placeholder || ''}
        />
        <div className="InputPassword_ToggleVisible" onClick={() => setIsVisiblePassword((state) => !state)}>
          {isVisiblePassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.031 17.75">
              <defs />
              <path
                className="a"
                d="M5366.051,37.687a.976.976,0,0,1,0-.622,11.475,11.475,0,0,1,4.083-5.654l-.458-.458a1,1,0,0,1,1.414-1.415l.792.792a12.457,12.457,0,0,1,5.633-1.33,11.913,11.913,0,0,1,11.465,8.065,1,1,0,0,1,0,.622,11.481,11.481,0,0,1-4.086,5.655l.456.456a1,1,0,1,1-1.413,1.413l-.79-.79a12.466,12.466,0,0,1-5.631,1.328A11.905,11.905,0,0,1,5366.051,37.687Zm2.006-.311a9.941,9.941,0,0,0,9.457,6.374,10.517,10.517,0,0,0,4.126-.833l-10.073-10.073A9.516,9.516,0,0,0,5368.057,37.376Zm15.4,4.533a9.516,9.516,0,0,0,3.512-4.533A9.941,9.941,0,0,0,5377.513,31a10.51,10.51,0,0,0-4.128.835Zm-11.364-4.535a1,1,0,1,1,2,0,3.421,3.421,0,0,0,3.419,3.418,1,1,0,0,1,0,2A5.425,5.425,0,0,1,5372.095,37.374Zm8.833,0a3.418,3.418,0,0,0-3.414-3.416,1,1,0,1,1,0-2,5.421,5.421,0,0,1,5.414,5.415,1,1,0,1,1-2,0Z"
                transform="translate(-5365.498 -28.5)"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.032 17.75">
              <defs />
              <path
                className="a"
                d="M5366.05,37.687a1,1,0,0,1,0-.622,12.18,12.18,0,0,1,22.927,0,.983.983,0,0,1,0,.622,12.181,12.181,0,0,1-22.927,0Zm2.008-.311a10.2,10.2,0,0,0,18.912,0,10.2,10.2,0,0,0-18.912,0Zm4.037,0a1,1,0,1,1,2,0,3.417,3.417,0,1,0,3.417-3.416,1,1,0,1,1,0-2,5.417,5.417,0,1,1-5.418,5.417Z"
                transform="translate(-5365.498 -28.5)"
              />
            </svg>
          )}
        </div>
        {props.suffix}
      </div>
    </InputStyled>
  )
}
