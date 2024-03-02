/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import styled from 'styled-components'
import { Form, FormItem } from 'components/Form'
import ResultText from './ResultText'

const ReadResultStyled = styled.div`
  .w_form_read {
    .contract_result_action {
      color: #212529;
      font-size: 14px;
      font-weight: 400;
      line-height: 1.5;

      padding: 0.375rem 0.75rem;
      margin-bottom: 10px;
      display: inline-block;
      text-align: center;
      vertical-align: middle;

      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 0.25rem;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
        box-shadow 0.15s ease-in-out;
      cursor: pointer;
      user-select: none;
    }
    .form_read_result {
      .form_read_result_success {
        img {
          width: 8px;
          height: auto;
          object-fit: contain;
        }
      }
      .form_read_result_success_result {
        margin-top: 14px;
      }
    }
  }
`

const ReadResult = ({ abi }) => {
  return (
    <ReadResultStyled>
      {abi.inputs.length > 0 ? (
        <div className="w_form_read">
          <Form action="/action_page.php">
            {abi.inputs.map((input) => {
              return (
                <FormItem
                  key={input.name}
                  name={input.name}
                  label={`${input.name || '<input> '} (${input.type})`}
                  placeholder={`${input.name || '<input> '} (${input.type})`}
                  rightLabel={undefined}
                />
              )
            })}

            <button className="contract_result_action" type="submit" value="Submit">
              Query
            </button>
          </Form>
          <div className="form_read_result">
            {true ? (
              <div className="form_read_result_success text-span">
                <img src="/images/icon/shape-1.svg" />{' '}
                <i>
                  <span>uint256</span>
                </i>
                <br />
                <span className="form_read_result_success_result">
                  <br />
                  [&nbsp;<b>getBlackListStatus(address)</b> method Response ]
                  <br />
                  &nbsp;
                  <span className="text-success">{'>>'}</span>
                  <strong /> &nbsp;
                  <span className="text-span">
                    <i>bool</i>
                  </span>
                  <b>:</b> &nbsp;false
                  <br />
                  <br />
                </span>
              </div>
            ) : (
              <div className="form_read_result_error">error</div>
            )}
          </div>
        </div>
      ) : (
        <ResultText text="Tether USD" href="abc" type="string" target={undefined} />
      )}
    </ReadResultStyled>
  )
}

export default ReadResult
