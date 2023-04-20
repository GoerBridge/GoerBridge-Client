import { Flex } from '@pancakeswap/uikit'
import { useActiveHandle } from 'hooks/useEagerConnect.bmp'
import { useWallet } from 'hooks/useWallet'
import styled from 'styled-components'

export const StyledUserMenu = styled(Flex)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 155px;
  height: 36px;
  padding: 4px 8px;
  margin-left: 0;
  position: relative;

  border-radius: 0 12px 12px 0;
  background-image: url('/images/button-right-2.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 3px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: 290px;
    height: 44px;
    background-position: left center;
  }

  img {
    width: auto;
    height: 82%;
    object-fit: contain;
    margin-right: 6px;
    display: none;

    ${({ theme }) => theme.mediaQueries.sm} {
      display: block;
    }
  }
`
export const LabelText = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  margin-left: 16px;

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
  return (
    <StyledUserMenu onClick={handleClick} {...props}>
      {accountEllipsis && <img src="/images/user_wallet_icon.png" alt="" />}
      <LabelText>{accountEllipsis || 'Connect Wallet'}</LabelText>
    </StyledUserMenu>
  )
}

export default ConnectWallet
