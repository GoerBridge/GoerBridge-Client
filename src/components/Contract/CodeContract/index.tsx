/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/button-has-type */
import React from 'react'
import { Dropdown, Space } from 'antd'

import AceEditor from 'react-ace'
import 'ace-builds/webpack-resolver'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-github'
import 'ace-builds/src-noconflict/ext-language_tools'

import { dataCode } from './dataCode'
import { securityCode } from './securityCode'
import { auditCode } from './auditCode'
import { argumentsCode } from './argumentsCode'

const items = [
  {
    label: '1st menu item',
    key: '1',
  },
  {
    label: '2nd menu item',
    key: '2',
  },
  {
    label: '3rd menu item',
    key: '3',
  },
]

const CodeContract = ({ addressDetail }) => {
  // console.log('addressDetail', addressDetail)
  return (
    <div className="code-contract">
      <div className="code-top">
        <div className="top">
          <div className="left">
            <img src="/images/icon/down-circle.png" alt="" />

            <p>
              Contract Source Code Verified <span>(Exact Match)</span>
            </p>
          </div>
          <div className="right">
            <img src="/images/icon/danger.png" alt="" />
          </div>
        </div>

        <div className="down">
          <div className="contract">
            <div className="left">
              <p>Contract Name:</p>
              <span>{addressDetail?.pro?.na || ''}</span>
            </div>

            <div className="right">
              <p>Optimization Enabled:</p>
              <div>
                <span>No</span>&nbsp;
                <span>with</span>&nbsp;
                <span>0</span>&nbsp;
                <span>runs</span>
              </div>
            </div>
          </div>

          <div className="compiler">
            <div className="left">
              <p>Compiler Version</p>
              <span>v0.4.18+commit.9cf6e910</span>
            </div>

            <div className="right">
              <p>Other Settings:</p>
              <div>
                <span>default</span>&nbsp;
                <span>evmVersion</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="code-down">
        <div className="solidity">
          <div className="head">
            <div className="left">
              <img src="/images/icon/folder-2.png" alt="" />
              <p>
                Contract Source Code <span>(Solidity)</span>
              </p>
            </div>

            <div className="right">
              <div className="top">
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={['click']}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      Outline
                      <img src="/images/icon/arrow-square-down-white.png" alt="" />
                    </Space>
                  </a>
                </Dropdown>

                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={['click']}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      More Options
                      <img src="/images/icon/arrow-square-down-white.png" alt="" />
                    </Space>
                  </a>
                </Dropdown>
              </div>

              <div className="down">
                <img src="/images/icon/link-2.png" alt="" />
                <img src="/images/icon/document-copy.png" alt="" />
                <img src="/images/icon/money-4.png" alt="" />
              </div>
            </div>
          </div>

          <div className="content">
            <AceEditor
              placeholder="Placeholder Text"
              mode="java"
              theme="github"
              name="source_code"
              fontSize={12}
              showGutter={true}
              highlightActiveLine={true}
              value={addressDetail?.src}
              readOnly
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }}
              showPrintMargin={false}
              width="100%"
              height="550px"
            />
          </div>
        </div>

        <div className="security">
          <div className="head">
            <div className="head-1">
              <img src="/images/icon/document-text.png" alt="" />
              <p>Contract Security Audit</p>
            </div>

            <div className="head-2">
              <div>
                {/* <img src="/images/icon/Ellipse 1108.png" alt="" /> */}
                <button>No Contract Security Audit Submitted</button>
              </div>
              <p>- Submit Audit Here</p>
            </div>

            <div className="head-3">
              <div className="left">
                <img src="/images/icon/task.png" alt="" />
                <p>Contract Security Audit</p>
              </div>
              <div className="right">
                <Dropdown
                  menu={{
                    items,
                  }}
                  trigger={['click']}
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      Export ABI
                      <img src="/images/icon/arrow-square-down-white.png" alt="" />
                    </Space>
                  </a>
                </Dropdown>
                <img src="/images/icon/document-copy.png" alt="" />
                <img src="/images/icon/money-4.png" alt="" />
              </div>
            </div>
          </div>

          <div className="content">
            <AceEditor
              placeholder="Placeholder Text"
              mode="json"
              theme="github"
              name="blah2"
              fontSize={12}
              showGutter={false}
              highlightActiveLine={true}
              value={JSON.stringify(addressDetail?.ab || {})}
              readOnly={true}
              wrapEnabled
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: false,
                tabSize: 1,
              }}
              width="100%"
              height="300px"
              showPrintMargin
            />
          </div>
        </div>

        <div className="audit">
          <div className="head">
            <div className="left">
              <img src="/images/icon/left-right.png" alt="" />
              <p>Contract Security Audit</p>
            </div>
            <div className="right">
              <button>
                Decompile Byte code&nbsp;&nbsp;
                <img src="/images/account/add.png" alt="" />
              </button>
              <button>Switch to Opcodes View</button>
            </div>
          </div>

          <div className="content">
            <AceEditor
              placeholder="Placeholder Text"
              mode="json"
              theme="github"
              name="blah3"
              fontSize={12}
              showGutter={false}
              highlightActiveLine={true}
              value={auditCode}
              readOnly={true}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: false,
                tabSize: 10,
              }}
              width="100%"
              height="300px"
              showPrintMargin={false}
            />
          </div>
        </div>

        <div className="arguments">
          <div className="head">
            <div className="top">
              <img src="/images/icon/bezier.png" alt="" />
              <p>Constructor Arguments</p>
            </div>
            <span>(ABI-Encoded and is the last bytes of the Contract Creation Code above)</span>
          </div>

          <div className="content">
            <AceEditor
              placeholder="Placeholder Text"
              mode="json"
              theme="github"
              name="blah4"
              fontSize={12}
              showGutter={false}
              highlightActiveLine={true}
              value={argumentsCode}
              readOnly={true}
              setOptions={{
                enableBasicAutocompletion: false,
                enableLiveAutocompletion: false,
                enableSnippets: false,
                showLineNumbers: false,
                tabSize: 10,
              }}
              width="100%"
              height="300px"
              showPrintMargin={false}
            />
          </div>
        </div>

        <div className="source">
          <div className="head">
            <img src="/images/icon/grid-1.png" alt="" />
            <p>Swarm Source</p>
          </div>
          <div className="content">
            <p>bzzr://645ee12d73db47fd78ba77fa1f824c3c8f9184061b3b10386beb4dc9236abb28</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CodeContract
