import { Link } from '@pancakeswap/uikit'
import { Col, DatePicker, Form, Input, Row, Select, Space, Table } from 'antd'

import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef, useState } from 'react'

import styled from 'styled-components'

import ReactHTMLTableToExcel from 'react-html-table-to-excel'

import { ChainId } from '@pancakeswap/sdk'
import { formatDate } from 'helpers'
import { formatCode } from 'helpers/CommonHelper'

import { APP_ENV } from 'config'
import { getBlockExploreLink } from 'utils'
import { useClaimBuyPackages } from '../hook/useHistoryBuyPackages'

const { RangePicker } = DatePicker

const WAdminHomePage = styled.div`
  width: 100%;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(233, 233, 233);
  margin-top: 10px;
  min-height: 100vh;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 35px;
  }

  .zodi-control-page {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;

    ${({ theme }) => theme.mediaQueries.md} {
      align-items: flex-end;
      flex-direction: row;
    }

    h1 {
      font-size: 50px;
      font-weight: 500;
      margin-bottom: 20px;
      color: #000;

      ${({ theme }) => theme.mediaQueries.md} {
        margin-bottom: 0;
      }
    }

    a {
      border-color: rgb(24, 144, 255);
      background: rgb(24, 144, 255);
      text-shadow: rgb(0 0 0 / 12%) 0px -1px 0px;
      box-shadow: rgb(0 0 0 / 4%) 0px 2px;
      color: rgb(255, 255, 255) !important;
      padding: 8px 20px;
      min-height: 38px;
      max-height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
      cursor: pointer;
    }
  }

  .anticon {
    margin: 0 !important;
  }

  .ant-form {
    .ant-row {
      .ant-col {
        margin: 0;

        ${({ theme }) => theme.mediaQueries.sm} {
          margin-left: 16.66666667%;
        }
      }

      .ant-form-item-label {
        min-width: 110px;
        margin-left: 0;
        text-align: left;

        .ant-form-item-required {
          justify-content: flex-start;
        }
      }
    }
  }

  .history-content {
    .history-content-head {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;

      ${({ theme }) => theme.mediaQueries.md} {
        flex-direction: row;
        align-items: center;
      }

      .ant-checkbox-wrapper {
        margin: 0 0 10px 0;

        ${({ theme }) => theme.mediaQueries.md} {
          margin: 0 10px 5px 0;
        }
      }

      .ant-form-item {
        margin: 0;
      }
    }

    .history-content-middle {
      margin-bottom: 10px;

      .ant-row {
        margin-bottom: 8px;

        .ant-col {
          ${({ theme }) => theme.mediaQueries.sm} {
            margin: 0 !important;
          }
        }
      }

      .ant-checkbox-wrapper {
        margin: 0 0 10px 0;

        ${({ theme }) => theme.mediaQueries.md} {
          margin: 0 10px 5px 0;
        }
      }

      .ant-form-item {
        margin: 0;
      }
    }
  }

  .table-wrapper {
    #table-xls-button {
      border-color: rgb(41, 190, 84);
      background: rgb(41, 190, 84);
      text-shadow: rgb(0 0 0 / 12%) 0px -1px 0px;
      box-shadow: rgb(0 0 0 / 4%) 0px 2px;
      color: rgb(255, 255, 255) !important;
      padding: 8px 20px;
      min-height: 38px;
      max-height: 38px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
      cursor: pointer;
    }

    a {
      font-weight: normal;
    }
  }
`

const WExportCsv = styled.div`
  display: flex;
  justify-content: flex-end;
`

const AdminHomePage: React.FC = () => {
  const [chainId, setChainId] = useState(5)

  const [search, setSearch] = useState({})
  const [dateRange, setDateRange] = useState([])

  const [form] = Form.useForm()
  const router = useRouter()

  const tableRef = useRef(null)
  useEffect(() => {
    const table = tableRef.current.querySelector('table')
    table.setAttribute('id', 'table-to-xls')
  }, [tableRef])

  const column = [
    {
      title: 'Package ID',
      dataIndex: 'packageId',
    },

    {
      title: 'User Address',
      dataIndex: 'userAddress',
      render: (data) => {
        return (
          <Link external href={getBlockExploreLink(data, 'address', chainId)} target="_blank" rel="noreferrer">
            {formatCode(data, 5, 5)}
          </Link>
        )
      },
    },

    {
      title: 'Amount Buy',
      dataIndex: 'amountBuy',
      render: (record) => {
        return (record / 1e18).toLocaleString()
      },
    },

    {
      title: 'Amount Token',
      dataIndex: 'amountToken',
    },

    {
      title: 'TxH',
      dataIndex: 'transactionHash',
      render: (data) => {
        return (
          <Link href={getBlockExploreLink(data, 'transaction', chainId)} target="_blank" rel="noreferrer">
            {formatCode(data, 5, 5)}
          </Link>
        )
      },
    },

    {
      title: 'Create Time',
      dataIndex: 'createdTime',
      render: (record) => {
        return (
          <div>
            <p>{formatDate(record * 1000, 'yyyy-MM-DD')}</p>
          </div>
        )
      },
    },
  ]

  // Get data from buyPackages with graph
  const { buyPackages } = useClaimBuyPackages(
    search,
    chainId,
    dateRange && dateRange[0] ? String(dateRange[0]) : '',
    dateRange && dateRange[1] ? String(dateRange[1]) : '',
  )
  const dataBuyPackages = buyPackages.dataReport

  const dataBuyPackagesClone: any[] = useMemo(
    () =>
      dataBuyPackages
        ?.map((campaign) => ({
          ...campaign,
          amountToken: Number(campaign.amountToken).toLocaleString(),
          userAddress: campaign.userAddress.toLowerCase(),
          transactionHash: campaign.transactionHash.toLowerCase(),
        }))
        .sort((a, b) => Number(b.createdTime) - Number(a.createdTime)),
    [dataBuyPackages],
  )

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase()
    setSearch({ ...search, [e.target.name]: value })
  }

  const handleSelectChain = (value) => {
    setChainId(value)
  }

  const handleSearchDate = (e) => {
    setDateRange(e?.map((time) => Date.parse(time) / 1000))
  }

  return (
    <WAdminHomePage>
      <div className="zodi-control-page">
        <h1>Sale Report</h1>
      </div>

      <div className="history-content">
        <div className="history-content-middle">
          <Form form={form} layout="vertical">
            <Row gutter={[8, 8]}>
              <Col span={6}>
                <Form.Item label="Chain">
                  <Select
                    showSearch
                    placeholder="ETH"
                    optionFilterProp="children"
                    onChange={handleSelectChain}
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    options={
                      APP_ENV === 'development'
                        ? [
                            {
                              // dev =5
                              value: ChainId.GOERLI,
                              label: 'ETH',
                            },
                            {
                              // dev = 97
                              value: ChainId.BSC_TESTNET,
                              label: 'BSC',
                            },
                          ]
                        : [
                            {
                              value: ChainId.ETHEREUM,
                              label: 'ETH',
                            },
                            {
                              value: ChainId.BSC,
                              label: 'BSC',
                            },
                          ]
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="Package ID">
                  <Input
                    size="middle"
                    autoComplete="true"
                    name="packageId"
                    onChange={handleSearch}
                    placeholder="Package ID"
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="User Address">
                  <Input
                    size="middle"
                    autoComplete="true"
                    name="userAddress"
                    onChange={handleSearch}
                    placeholder="User Address"
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="TxH">
                  <Input
                    size="middle"
                    autoComplete="true"
                    name="transactionHash"
                    onChange={handleSearch}
                    placeholder="Transaction hash"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="Date" label="Date">
              <Space direction="vertical" size={12}>
                <RangePicker format="YYYY/MM/DD" onChange={handleSearchDate} />
              </Space>
            </Form.Item>
          </Form>
        </div>

        <div className="history-content-bottom">
          <div className="table-wrapper" ref={tableRef}>
            <WExportCsv>
              <ReactHTMLTableToExcel
                id="table-xls-button"
                className="download-table-xls-button"
                table="table-to-xls"
                sheet="Sales report"
                filename="Sale Report"
                buttonText="Export CSV"
              />
            </WExportCsv>
            <Table
              columns={column}
              dataSource={dataBuyPackagesClone}
              scroll={{ x: 600 }}
              pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '30', '100'] }}
            />
          </div>
        </div>
      </div>
    </WAdminHomePage>
  )
}

export default AdminHomePage
