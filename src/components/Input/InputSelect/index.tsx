/* eslint-disable react/jsx-filename-extension */
import { Select } from 'antd'
import React from 'react'
import styled from 'styled-components'

const InputSelectStyled = styled.div<any>`
  width: 100%;
  position: relative;
  .ant-select {
    width: 100%;
    .ant-select-selector {
      border-radius: 0.25rem;

      &:hover,
      &:focus {
        border: ${({ error }) => (error ? '1px solid red' : '1px solid #ced4da')};
        outline: unset;
      }
      input {
        color: #495057;
        line-height: 1.5;
      }
    }

    .ant-select-selector,
    .ant-select-selector input {
      height: 36px !important;
    }
    .ant-select-selection-item {
      line-height: 35px;
    }
    .ant-select-selector,
    .ant-select-focused .ant-select-selector,
    .ant-select-open .ant-select-selector {
      border: ${({ error }) => (error ? '1px solid red' : '1px solid #ced4da')} !important;
      box-shadow: unset !important;
    }
  }
  .input_error {
    font-size: 13px;
    color: red;

    position: absolute;
    top: 102%;
    left: 0;
  }
`

export const InputSelect = ({ options, errorMess, containerProps, showSearch = false, ...props }) => {
  return (
    <InputSelectStyled error={errorMess} {...containerProps}>
      <Select
        showSearch={showSearch}
        placeholder="Select a person"
        optionFilterProp="children"
        options={options}
        filterOption={(input, option) => (option?.label.toString() ?? '')?.toLowerCase().includes(input.toLowerCase())}
        getPopupContainer={(trigger) => trigger.parentNode}
        {...props}
      />
      {errorMess && <div className="input_error">{errorMess}</div>}
    </InputSelectStyled>
  )
}
