import styled from 'styled-components'
import { Flex, Logo } from '@pancakeswap/uikit'
import { NetworkSwitcher } from 'components/NetworkSwitcher'
import UserWalletWithModal from './UserWalletWithModal'

const MENU_HEIGHT = 140

const WrapMenu = styled.div`
  overflow: hidden;
  .nav {
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
`

const Menu = ({ children }) => {
  return (
    <WrapMenu>
      <div className="nav">
        <Flex width="100%" height="100%">
          <Logo href="/" />
        </Flex>
        <Flex alignItems="center" height="100%">
          <NetworkSwitcher />
          <UserWalletWithModal />
        </Flex>
      </div>
      <InnerBody>{children}</InnerBody>
      <Footer>Coppy right EVM@2020</Footer>
    </WrapMenu>
  )
}

export default Menu
