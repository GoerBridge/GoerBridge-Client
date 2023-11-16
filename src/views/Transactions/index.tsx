import { Grid, Text } from '@pancakeswap/uikit'
import { BackIcon } from 'components/Svg'
import TableBase from 'components/Table/TableBase'
import { formatAmount, formatCode, formatDate } from 'helpers'
import Link from 'next/link'
import { useAllBlockchain } from 'state/home/fetchAllBlockChain'
import { useFetchTransaction, useTransactionList } from 'state/home/fetchTransaction'
import styled from 'styled-components'
import Filter from './components/Filter'

const TransactionBridgeStyle = styled.div`
  max-width: 1290px;
  min-height: calc(100vh - 300px);
  margin: 0 auto 0;
  .backlink {
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    cursor: pointer;

    > svg {
      fill: transparent;
    }
  }
  .head {
    margin-bottom: 24px;
  }

  .table-custom {
    .status {
      color: #fff;
      width: fit-content;
      text-align: center;
      min-width: 105px;
      height: 30px;
      line-height: 30px;
      // box-shadow: -2px -2px 2px #d2d2db, inset 0px -2px 1px #d2d2db;
      border-radius: 8px;
      &.success {
        background: #008037;
      }
      &.processing {
        background: #f98c36;
      }
      &.pending {
        background: #d2d2db;
      }
      &.error {
        background: #ae0c0c;
      }
    }
    .data-from {
      max-width: 160px;
    }
    .data-created {
      max-width: 90px;
    }

    ul.ant-pagination {
      li.ant-pagination-item,
      .ant-pagination-prev,
      .ant-pagination-next,
      .ant-pagination-jump-next {
        border: unset;
        a {
          color: #fff;
        }
        &.ant-pagination-item-active a {
          color: #000;
        }
      }

      li.ant-pagination-item {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 40px;
      }

      .ant-pagination-prev,
      .ant-pagination-next {
        background: #ffffff99;
        border-radius: 50%;

        > button {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        svg {
          fill: #000;
        }
      }
      .ant-pagination-prev {
        margin-right: 16px;
      }
      .ant-pagination-next {
        margin-left: 16px;
      }
      .ant-pagination-jump-prev,
      .ant-pagination-jump-next {
        svg,
        .ant-pagination-item-ellipsis {
          color: #fff;
          fill: #fff;
        }
      }

      .ant-pagination-options-quick-jumper {
        color: #fff;
        margin-left: 46px;
        display: flex;
        text-indent: -9999px;

        > span {
          text-indent: 0;
        }

        input {
          color: #fff;
          text-align: center;
          background: transparent;
          border: 1px solid #d2d2db;
          border-radius: 4px;
        }
        button {
          line-height: 12px;
          min-width: 50px;
          height: 23px;
          padding: 0 4px;
          background: transparent;
          border: 1px solid #383e48;
          border-radius: 4px;
          margin-left: 12px;
          cursor: pointer;
        }
      }
    }
    .ant-pagination .ant-pagination-item-active {
      background: #ffffff99;
    }
    .ant-table .ant-table-tbody .ant-table-cell {
      background: #ffffff99;
    }
    .ant-table-wrapper .ant-table-thead > tr > th {
      background: #ffffff99;
    }
    .custom-text {
      font-size: 14px;

      ${({ theme }) => theme.mediaQueries.lg} {
        font-size: 16px;
      }
    }

    a.custom-text {
      &:hover {
        color: #008037;
      }
    }
  }
`
const TransactionBridge = ({ pageSupportedChains }) => {
  const { setParamsTransaction } = useFetchTransaction()
  const transactionList = useTransactionList()
  const blockchainList = useAllBlockchain()

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      width: '60px',
      render: (_, __, index) => <Text fontSize={[14, , 16]}>{index + 1}</Text>,
    },
    {
      title: 'Send',
      dataIndex: 'fromAmount',
      render: (data, record) => {
        return (
          <Text fontSize={[14, , 16]}>
            {formatAmount(data, { tokenPrecision: true, decimals: 18 })} {record?.currency_code}
          </Text>
        )
      },
    },
    {
      title: 'Received',
      dataIndex: 'toAmount',
      render: (data, record) => {
        return (
          <Text fontSize={[14, , 16]}>
            {formatAmount(data, { tokenPrecision: true, decimals: 18 })} {record?.currency_code}
          </Text>
        )
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (data) => {
        return (
          <div className={`status ${data === 'CREATED' ? 'success' : 'pending'}`}>
            {data === 'CREATED' ? 'Success' : 'Pending'}
          </div>
        )
      },
    },
    {
      title: 'From',
      dataIndex: 'from',
      render: (_, record) => {
        const currentChain = blockchainList.find((item) => item?.code === record?.fromChain)

        return (
          <div className="data-from">
            <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="12px">
              <Text className="custom-text">Address:</Text>
              <Link href={`${currentChain.scan}/address/${record.fromAddress}`} passHref>
                <Text as="a" className="custom-text" textAlign="right" target="_blank" rel="noopener noreferrer">
                  {record.fromAddress ? formatCode(record.fromAddress, 6, 0) : '--'}
                </Text>
              </Link>
            </Grid>
            <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="12px" mt={['8px', , '16px']}>
              <Text className="custom-text">Txh:</Text>
              <Link href={`${currentChain.scan}/tx/${record.fromHash}`} passHref>
                <Text as="a" className="custom-text" textAlign="right" target="_blank" rel="noopener noreferrer">
                  {record.fromHash ? formatCode(record.fromHash, 6, 0) : '--'}
                </Text>
              </Link>
            </Grid>
            <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="12px" mt={['8px', , '16px']}>
              <Text className="custom-text">Network:</Text>
              <Text className="custom-text" textAlign="right">
                {record.fromChain ? formatCode(record.fromChain, 15, 0) : '--'}
              </Text>
            </Grid>
          </div>
        )
      },
    },
    {
      title: 'To',
      dataIndex: 'to',
      render: (_, record) => {
        const currentChain = blockchainList.find((item) => item?.code === record?.toChain)

        return (
          <div className="data-from">
            <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="12px">
              <Text className="custom-text">Address:</Text>
              <Link href={`${currentChain?.scan}/address/${record.toAddress}`} passHref>
                <Text as="a" className="custom-text" textAlign="right" target="_blank" rel="noopener noreferrer">
                  {record.toAddress ? formatCode(record.toAddress, 6, 0) : '--'}
                </Text>
              </Link>
            </Grid>
            <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="12px" mt={['8px', , '16px']}>
              <Text className="custom-text">Txh:</Text>
              {record.toHash ? (
                <Link href={`${currentChain.scan}/tx/${record.toHash}`} passHref>
                  <Text as="a" className="custom-text" textAlign="right" target="_blank" rel="noopener noreferrer">
                    {formatCode(record.toHash, 6, 0)}
                  </Text>
                </Link>
              ) : (
                <Text className="custom-text" textAlign="right">
                  --
                </Text>
              )}
            </Grid>
            <Grid gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="12px" mt={['8px', , '16px']}>
              <Text className="custom-text">Network:</Text>
              <Text className="custom-text" textAlign="right">
                {record.toChain ? formatCode(record.toChain, 15, 0) : '--'}
              </Text>
            </Grid>
          </div>
        )
      },
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      render: (text) => <div className="data-created">{formatDate(+text * 1000, 'YYYY/MM/DD   hh:ss')}</div>,
    },
  ]

  return (
    <TransactionBridgeStyle>
      <Link href="/" passHref>
        <a className="backlink">
          <BackIcon width="14px" />
          <Text color="#ffffff99" fontSize="20px" fontWeight="700" ml="12px">
            History
          </Text>
        </a>
      </Link>
      <div className="head">
        <Filter dataSearch={{ network: blockchainList }} setParams={setParamsTransaction} />
      </div>
      <TableBase
        className="table-custom"
        scroll={{ x: 800 }}
        columns={columns}
        dataSource={transactionList}
        rowKey={(record) => record.id}
        pagination={{
          size: 'small',
          total: transactionList?.length,
          pageSize: 10,
          position: ['bottomCenter'],
          showSizeChanger: false,
          showQuickJumper: {
            goButton: <button type="button">Go</button>,
          },
        }}
      />
    </TransactionBridgeStyle>
  )
}

export default TransactionBridge
