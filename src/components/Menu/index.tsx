import styled from 'styled-components'
import { Flex, Logo, useMatchBreakpoints } from '@pancakeswap/uikit'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import { useRouter } from 'next/router'
import UserWalletWithModal from './UserWalletWithModal'

const MENU_HEIGHT = 140

const WrapMenu = styled.div`
  overflow: hidden;
  .nav {
    .logo {
      max-height: 50px;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 16px;

    padding-left: 16px;
    padding-right: 16px;

    height: ${MENU_HEIGHT - 60}px;
    ${({ theme }) => theme.mediaQueries.sm} {
      height: ${MENU_HEIGHT}px;
      padding: 0 24px;
    }
  }
  .historyMn {
    -webkit-box-align: center;
    align-items: center;
    cursor: pointer;
    display: inline-flex;
    position: relative;
    z-index: 10;
    padding: 7px 15px;
    border-radius: 10px;
    background-color: rgb(255, 255, 255, 0.6);
    gap: 10px;
  }
`
const InnerBody = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 16px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 0 24px;
  }
`
const Footer = styled.div`
  padding: 40px 10px;
  text-align: center;
  color: #fff;
`

const Menu = ({ children }) => {
  const router = useRouter()
  const { isMobile } = useMatchBreakpoints()
  return (
    <WrapMenu>
      <div style={{ display: 'flex', justifyContent: 'space-between' }} className="nav">
        <Flex>
          <Logo className="logo" href="/" />
        </Flex>
        <Flex flex={2} alignItems="center" justifyContent="flex-end" style={{ gap: 5 }}>
          <Flex onClick={() => router.push('/history')} alignItems="center" className="historyMn">
            {' '}
            <img src="/images/history.svg" alt="history" /> History
          </Flex>
          <div style={{ minWidth: 40 }}>
            <NetworkSwitcher />
          </div>
          <div style={{ width: isMobile ? 150 : 187, display: 'flex', justifyContent: 'end' }}>
            <UserWalletWithModal />
          </div>
        </Flex>
      </div>
      <InnerBody>{children}</InnerBody>
      <Footer>
        Powered by{' '}
        <a href={process.env.NEXT_PUBLIC_APP_URL ?? '/'} target="_blank" style={{ color: '#5ce1e6' }} rel="noreferrer">
          Teleportstation.io
        </a>
      </Footer>
    </WrapMenu>
  )
}

export default Menu
