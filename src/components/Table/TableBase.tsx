import { EmptyIcon, Flex, Text } from '@pancakeswap/uikit'
import { Table } from 'antd'
import styled from 'styled-components'

const TableBaseStyle = styled.div`
  padding: 24px 16px;
  border-radius: 12px;
  // background: #111b1e;
  border: 1px solid rgb(92, 225, 230);
  overflow: hidden;

  ${({ theme }) => theme.mediaQueries.lg} {
    padding: 24px;
  }

  .ant-table {
    background: transparent;
    border: unset;

    .ant-table-thead .ant-table-cell,
    .ant-table-tbody .ant-table-cell {
      color: #052c83;
      font-weight: 500;
      font-size: 14px;
      // background: #111b1e;

      ${({ theme }) => theme.mediaQueries.lg} {
        font-size: 16px;
      }
    }
    .ant-table-thead {
      .ant-table-cell {
        border-bottom: 1px solid rgb(92, 225, 230);
      }
    }
    .ant-table-tbody {
      .ant-table-row:hover {
        .ant-table-cell {
          background: #f0f0f0;
        }
      }
      .ant-table-cell {
        border-bottom: 1px solid #383e48;
      }
    }
    .ant-pagination {
    }
  }
`

const TableBase = ({ className = '', ...props }) => {
  return (
    <TableBaseStyle className={className}>
      <Table
        locale={{
          emptyText: (
            <Flex alignItems="center" justifyContent="center" p="24px 0">
              <EmptyIcon width={32} />
              <Text as="p" ml="16px" fontSize={[14, 16]} fontWeight={500}>
                There Are No Data
              </Text>
            </Flex>
          ),
        }}
        {...props}
      />
    </TableBaseStyle>
  )
}

export default TableBase
