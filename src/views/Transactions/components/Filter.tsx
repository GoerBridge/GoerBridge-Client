/* eslint-disable camelcase */
import styled from 'styled-components'
import { Text } from '@pancakeswap/uikit'
import { Row, Col, DatePicker, Input, Select } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const SEARCH_HEIGHT = '44px'

interface SearchParams {
  network: string | string[]
}

const FilterStyled = styled.div`
  .search-date,
  .search-txh,
  .search-select .ant-select-selector {
    height: ${SEARCH_HEIGHT};
    background: #111b1e;
    border: 1px solid #383e48;
    border-radius: 8px;
    input {
      color: #fff;
      ::placeholder {
        color: #f8f8f8;
        opacity: 1; /* Firefox */
      }
      :-ms-input-placeholder {
        color: #f8f8f8;
      }
      ::-ms-input-placeholder {
        color: #f8f8f8;
      }

      font-size: 12px;

      ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 14px;
      }
    }

    .ant-select-selection-item {
      color: #fff;
      line-height: 42px;
      font-size: 12px;

      ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 14px;
      }
    }
  }
  .ant-picker {
    height: ${SEARCH_HEIGHT};
    background: transparent;
    border: unset;

    .ant-picker-range-separator svg {
      fill: #fff;
    }
    .ant-picker-clear {
      padding: 6px;
      background: #383e48;
      border-radius: 5px;
      svg {
        font-size: 16px;
        fill: #fff;
      }
    }
  }
  .search-txh {
    input {
      color: #fff;
      background: transparent;
    }
  }
`
const Filter = ({ dataSearch, setParams }) => {
  const { network } = dataSearch
  const router = useRouter()

  const nowDay = Math.floor(new Date().getTime() / 1000)
  const pastDay = Math.floor(new Date('01/01/2020').getTime() / 1000)

  const [searchData, setSearchData] = useState<SearchParams>({
    network: 'all',
  })

  const handleChangeNetwork = (val: string | string[]) => {
    if (val === 'all') {
      router.push({
        pathname: `${router.pathname}`,
        query: {
          ...router.query,
          fromChain: '',
        },
      })
    } else {
      router.push({
        pathname: `${router.pathname}`,
        query: {
          ...router.query,
          fromChain: val,
        },
      })
    }
  }

  const handleChangeDate = (date, dateString: [string, string]) => {
    if (!date) {
      router.push({
        pathname: `${router.pathname}`,
        query: {
          ...router.query,
          from_date: pastDay,
          to_date: nowDay,
        },
      })
    } else {
      const [dayPicked1, dayPicked2] = date
      const fromDate = Math.floor(dayPicked1?.$d.getTime() / 1000)
      const toDate = Math.floor(dayPicked2?.$d.getTime() / 1000)

      router.push({
        pathname: `${router.pathname}`,
        query: {
          ...router.query,
          from_date: fromDate,
          to_date: toDate,
        },
      })
    }
  }

  useEffect(() => {
    const { fromChain, from_date, to_date } = router.query

    // Filter transaction by chain
    if (fromChain) {
      setParams((prev) => ({
        ...prev,
        fromChain,
      }))
      setSearchData({
        ...searchData,
        network: fromChain,
      })
    } else {
      setParams((prev) => ({
        ...prev,
        fromChain: '',
      }))
      setSearchData({
        ...searchData,
        network: 'all',
      })
    }

    // Filter transaction by date
    if (from_date && to_date) {
      setParams((prev) => ({
        ...prev,
        from_date,
        to_date,
      }))
    }
  }, [router.query])

  return (
    <FilterStyled>
      <Row
        gutter={[
          { xs: 12, sm: 12, md: 32 },
          { xs: 12, sm: 12, md: 32 },
        ]}
      >
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text mb="6px" fontSize={[14, , 16]}>
            Date
          </Text>
          <div className="search-date">
            <DatePicker.RangePicker
              style={{ width: '100%' }}
              suffixIcon={
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="28" height="28" rx="5" fill="#383E48" />
                  <path
                    d="M14.0003 17.0013C13.7666 17.0017 13.5402 16.9203 13.3603 16.7713L7.36028 11.7713C7.15606 11.6015 7.02763 11.3576 7.00325 11.0932C6.97888 10.8287 7.06054 10.5655 7.23028 10.3613C7.40001 10.157 7.64393 10.0286 7.90835 10.0042C8.17278 9.97985 8.43606 10.0615 8.64028 10.2313L14.0003 14.7113L19.3603 10.3913C19.4626 10.3082 19.5803 10.2462 19.7066 10.2087C19.8329 10.1713 19.9654 10.1592 20.0965 10.1731C20.2275 10.1871 20.3545 10.2268 20.4701 10.2899C20.5857 10.3531 20.6878 10.4385 20.7703 10.5413C20.8619 10.6441 20.9312 10.7647 20.974 10.8956C21.0168 11.0264 21.0321 11.1647 21.019 11.3018C21.0058 11.4389 20.9645 11.5717 20.8976 11.6921C20.8307 11.8125 20.7397 11.9177 20.6303 12.0013L14.6303 16.8313C14.4452 16.9568 14.2234 17.0166 14.0003 17.0013Z"
                    fill="white"
                  />
                </svg>
              }
              onChange={(date, dateString) => handleChangeDate(date, dateString)}
            />
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text mb="6px" fontSize={[14, , 16]}>
            Transaction Hash
          </Text>
          <Input
            className="search-txh"
            placeholder="Search By Transaction Hash"
            suffix={
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="28" rx="6" fill="#383E48" />
                <path
                  d="M12.2502 5.83333C10.9811 5.83333 9.74047 6.20966 8.68526 6.91473C7.63004 7.6198 6.8076 8.62195 6.32194 9.79444C5.83628 10.9669 5.7092 12.2571 5.95679 13.5018C6.20438 14.7465 6.81551 15.8899 7.7129 16.7873C8.61028 17.6846 9.75362 18.2958 10.9983 18.5434C12.243 18.791 13.5332 18.6639 14.7057 18.1782C15.8782 17.6926 16.8804 16.8701 17.5854 15.8149C18.2905 14.7597 18.6668 13.5191 18.6668 12.25C18.6667 10.5482 17.9906 8.91618 16.7873 7.71285C15.584 6.50951 13.9519 5.83344 12.2502 5.83333V5.83333Z"
                  stroke="white"
                  strokeMiterlimit="10"
                />
                <path d="M17.5 17.5L22.1667 22.1667" stroke="white" strokeMiterlimit="10" strokeLinecap="round" />
              </svg>
            }
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text mb="6px" fontSize={[14, , 16]}>
            Network
          </Text>
          <Select
            className="search-select"
            style={{ width: '100%' }}
            suffixIcon={
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="28" rx="5" fill="#383E48" />
                <path
                  d="M14.0003 17.0013C13.7666 17.0017 13.5402 16.9203 13.3603 16.7713L7.36028 11.7713C7.15606 11.6015 7.02763 11.3576 7.00325 11.0932C6.97888 10.8287 7.06054 10.5655 7.23028 10.3613C7.40001 10.157 7.64393 10.0286 7.90835 10.0042C8.17278 9.97985 8.43606 10.0615 8.64028 10.2313L14.0003 14.7113L19.3603 10.3913C19.4626 10.3082 19.5803 10.2462 19.7066 10.2087C19.8329 10.1713 19.9654 10.1592 20.0965 10.1731C20.2275 10.1871 20.3545 10.2268 20.4701 10.2899C20.5857 10.3531 20.6878 10.4385 20.7703 10.5413C20.8619 10.6441 20.9312 10.7647 20.974 10.8956C21.0168 11.0264 21.0321 11.1647 21.019 11.3018C21.0058 11.4389 20.9645 11.5717 20.8976 11.6921C20.8307 11.8125 20.7397 11.9177 20.6303 12.0013L14.6303 16.8313C14.4452 16.9568 14.2234 17.0166 14.0003 17.0013Z"
                  fill="white"
                />
              </svg>
            }
            value={searchData.network}
            onChange={(val) => handleChangeNetwork(val)}
          >
            <Select.Option value="all">All</Select.Option>
            {network?.map((item) => (
              <Select.Option key={item.code} value={item.code}>
                {item.title}
              </Select.Option>
            ))}
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Text mb="6px" fontSize={[14, , 16]}>
            Currency
          </Text>
          <Select
            className="search-select"
            style={{ width: '100%' }}
            suffixIcon={
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="28" rx="5" fill="#383E48" />
                <path
                  d="M14.0003 17.0013C13.7666 17.0017 13.5402 16.9203 13.3603 16.7713L7.36028 11.7713C7.15606 11.6015 7.02763 11.3576 7.00325 11.0932C6.97888 10.8287 7.06054 10.5655 7.23028 10.3613C7.40001 10.157 7.64393 10.0286 7.90835 10.0042C8.17278 9.97985 8.43606 10.0615 8.64028 10.2313L14.0003 14.7113L19.3603 10.3913C19.4626 10.3082 19.5803 10.2462 19.7066 10.2087C19.8329 10.1713 19.9654 10.1592 20.0965 10.1731C20.2275 10.1871 20.3545 10.2268 20.4701 10.2899C20.5857 10.3531 20.6878 10.4385 20.7703 10.5413C20.8619 10.6441 20.9312 10.7647 20.974 10.8956C21.0168 11.0264 21.0321 11.1647 21.019 11.3018C21.0058 11.4389 20.9645 11.5717 20.8976 11.6921C20.8307 11.8125 20.7397 11.9177 20.6303 12.0013L14.6303 16.8313C14.4452 16.9568 14.2234 17.0166 14.0003 17.0013Z"
                  fill="white"
                />
              </svg>
            }
            defaultValue="all"
            onChange={(val) => {
              setParams((prev) => {
                console.log(val)
                console.log(prev)
              })
            }}
          >
            <Select.Option value="all">All</Select.Option>
            <Select.Option value={1}>Ethereum Network</Select.Option>
            <Select.Option value={56}>BSC Network</Select.Option>
          </Select>
        </Col>
      </Row>
    </FilterStyled>
  )
}

export default Filter
