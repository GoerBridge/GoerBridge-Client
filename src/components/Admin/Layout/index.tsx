/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link'
import React, { ReactElement, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { DollarOutlined, GroupOutlined, HomeOutlined, MenuOutlined } from '@ant-design/icons'
import { Button, Layout, Menu, MenuProps, Space, Spin } from 'antd'
import styled, { keyframes } from 'styled-components'
import BreadCrumbs from 'components/BreadCrumbs'

import useActiveWeb3React from 'hooks/useActiveWeb3React'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { getSellPullAddress } from 'utils/addressHelpers'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useGetOwner } from 'state/admin/hook'

import UserMenu from '../../Menu/UserMenu'
import { LogoWithTextIcon } from '../../../../packages/uikit/src/components/Svg'

import { useMatchBreakpoints } from '../../../../packages/uikit/src/contexts'

const { Header, Sider, Content } = Layout

const turnLeft = keyframes`
  from {
    display: block;
    transform: translateX(0);
  }

  to {
    display: none;
    transform: translateX(-100px);
  }
`

const WAdminLayout = styled.div`
  font-family: Roboto, sans-serif;

  .logo {
    height: 70px;
    background: rgba(0, 0, 0, 0.3);
    padding: 0;
    margin: 0px;
    text-align: center;
    overflow: hidden;
    border-radius: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    ${({ theme }) => theme.mediaQueries.sm} {
      padding: 0 10px;
    }

    svg {
      width: 90%;
    }
  }

  .ant-menu-root {
    background-color: #2d3446;
    height: 100%;
    padding: 35px 0;
  }

  .anticon {
    margin-right: 20px;
  }

  .ant-menu-item {
    margin: 0;

    .ant-menu-item-active {
      color: #fff;
    }
  }

  .ant-menu-title-content {
    margin-left: 22px;
  }

  .ant-menu-sub {
    .ant-menu-item-active {
      span {
        color: #fff;
      }
    }
    .ant-menu-item-selected {
      span {
        color: #fff;
      }
    }
  }

  .ant-menu-sub {
    .ant-menu-item-selected {
      background-color: rgba(0, 0, 0, 4) !important;
    }
  }

  .ant-menu-item-only-child {
    background-color: #00000000 !important;
    color: rgb(120, 129, 149) !important;
    margin: 0 !important;
  }

  .ant-layout-header {
    height: 70px;
    background-color: #fff;
  }

  .ant-layout-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .ant-btn {
      border-radius: 50%;
      border: none;

      .anticon-user {
        width: 40px;
        height: 40px;
      }
    }
  }

  .ant-layout-content {
    padding: 20px 20px 0px !important;

    .ant-breadcrumb {
      ol {
        li:first-child {
          display: none;
        }
      }
    }
  }

  .ant-layout-sider-collapsed {
    width: 0 !important;
    min-width: 0 !important;
    max-width: 0 !important;
    flex: 0 0 0 !important;
    animation: ${turnLeft} 0.2s linear forwards;

    ${({ theme }) => theme.mediaQueries.sm} {
      width: 80px !important;
      min-width: 80px !important;
      max-width: 80px !important;
      flex: 0 0 80px !important;
      animation: none !important;
    }

    li {
      a {
        p {
          display: none;
        }
      }
    }
  }

  /* .ant-layout-sider {
    .ant-layout-sider-children {
      li:first-child {
        display: none;
      }
    }
  } */

  .header-admin-right {
    line-height: 1.5;

    .ant-space-item:last-child {
      > div {
        > div:last-child {
          position: absolute;
          inset: 0px 0px auto auto;
          transform: translate(-31px, 61px) !important;
        }
      }
    }
  }
`
const RequireLoginStyled = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`
const WMenuStyled = styled.div`
  list-style: none;
  height: calc(100% - 70px);
  background-color: #2d3446;
  padding: 55px 0;

  ${({ theme }) => theme.mediaQueries.sm} {
    display: flex;
    flex-direction: column;
  }

  li {
    padding: 12px 24px;
    margin-bottom: 8px;

    &.active {
      padding-left: 24px;
      background-color: rgba(0, 0, 0, 4);
      display: flex;
      color: #fff;
      align-items: center;
      transition: border-color 0.3s, background 0.3s, padding 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);

      a {
        color: #fff;
      }
    }

    a {
      color: rgb(120, 129, 149);
      display: flex;
      align-items: center;
      flex-direction: row;
      &:hover {
        color: #fff;
      }

      span {
        margin-left: 10px;
      }

      p {
        margin-left: 15px;
      }
    }
  }
`
const WLogo = styled.div``

interface MenuItemType {
  key: string
  label: string
  icon: ReactElement
}

export const getActiveMenuItem = ({ pathname, menuConfig }: { pathname: string; menuConfig: MenuItemType[] }) => {
  if (pathname === '/admin') {
    return menuConfig.find((menuItem) => pathname.startsWith(menuItem.key))
  }
  return menuConfig.slice(1).find((menuItem) => pathname.startsWith(menuItem.key))
}

const items: MenuItemType[] = [
  {
    key: '/admin',
    label: 'Sale Report',
    icon: <HomeOutlined />,
  },
  // {
  //   key: '/admin/campaigns',
  //   label: 'Campaigns',
  //   icon: <GroupOutlined />,
  // },
  // {
  //   key: '/admin/pool',
  //   label: 'Stake Pool',
  //   icon: <DollarOutlined />,
  // },
]

const AdminLayout = ({ children }: any) => {
  const router = useRouter()
  const { account } = useActiveWeb3React()
  const { chainId } = useActiveChainId()
  // const owner = getSellPullAddress(chainId)
  const { owner } = useGetOwner()

  const { isMobile, isTablet } = useMatchBreakpoints()
  const activeMenuItem = getActiveMenuItem({ menuConfig: items, pathname: router.pathname })

  const [isOwner, setIsOwner] = useState(false)
  const [loading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const str = router.pathname.split('/')
    switch (str[1]) {
      case 'admin':
        if (owner) {
          setIsOwner(account?.toLowerCase() === owner?.toLowerCase())
          setLoading(false)
        }
        break

      default:
        break
    }
  }, [account, owner, router])

  if (loading) {
    return (
      <RequireLoginStyled>
        <Spin />
      </RequireLoginStyled>
    )
  }
  if (!account) {
    return (
      <RequireLoginStyled>
        <ConnectWalletButton />
      </RequireLoginStyled>
    )
  }
  if (!isOwner) {
    return <RequireLoginStyled>You do not have access to this site</RequireLoginStyled>
  }

  return (
    <WAdminLayout>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={isMobile || isTablet ? !collapsed : collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={240}
        >
          <WLogo className="logo" onClick={() => router.push('/admin')}>
            <LogoWithTextIcon className="desktop-icon" />
          </WLogo>

          <WMenuStyled>
            {items.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.key} className={activeMenuItem.key === item.key ? `active` : ''}>
                  <Link href={`${item.key}`}>
                    <a>
                      {Icon}
                      <p>{item.label}</p>
                    </a>
                  </Link>
                </li>
              )
            })}
          </WMenuStyled>
        </Sider>

        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: '0 31px' }}>
            <div className="header-admin-left">
              {React.createElement(collapsed ? MenuOutlined : MenuOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
            </div>

            <div className="header-admin-right">
              <Space size={16}>{/* <ConnectWalletButton /> */}</Space>
            </div>
          </Header>

          {/* Content child */}
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <BreadCrumbs />
            {children}
          </Content>
        </Layout>
      </Layout>
    </WAdminLayout>
  )
}

export default AdminLayout
