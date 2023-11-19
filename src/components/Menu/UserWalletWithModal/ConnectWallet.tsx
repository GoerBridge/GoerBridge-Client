import { Flex, Button } from '@pancakeswap/uikit'
import { useActiveHandle } from 'hooks/useEagerConnect.bmp'
import { useWallet } from 'hooks/useWallet'
import styled from 'styled-components'

export const StyledUserMenu = styled(Flex)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #ffffff60;
  border-radius: 10px;
  /* width: 205px;
  height: 36px; */
  padding: 6px 10px;
  margin-left: 0;
  /* position: relative; */

  /* border-radius: 0 12px 12px 0;
  background-image: url('/images/button-right-2.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 3px; */

  /* ${({ theme }) => theme.mediaQueries.sm} {
    width: 290px;
    height: 44px;
    background-position: left center;
  } */

  img {
    height: 20px;
  }
`
export const LabelText = styled.div`
  font-size: 14px;
  background: #ffffff60;
  // color: #000;
  font-weight: 600;
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 5px;
  ${({ theme }) => theme.mediaQueries.sm} {
    font-size: 16px;
    margin-right: 4px;
    margin-left: 8px;
  }
`

const ConnectWallet = ({ account, onPresentWalletModal, ...props }: any) => {
  const handleActive = useActiveHandle()
  const { onPresentConnectModal } = useWallet()

  const handleClick = () => {
    if (account) {
      onPresentWalletModal()
    } else if (typeof __NEZHA_BRIDGE__ !== 'undefined') {
      handleActive()
    } else {
      onPresentConnectModal()
    }
  }
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null

  if (account) {
    return (
      <StyledUserMenu onClick={handleClick}>
        {accountEllipsis && <img src="/images/icon-metamask.svg" alt="" />}
        <LabelText>{accountEllipsis}</LabelText>
      </StyledUserMenu>
    )
  }

  return (
    <Button onClick={handleClick}>
      <div style={{ color: '#FFF' }}>Connect Wallet</div>
    </Button>
  )
}

export default ConnectWallet
