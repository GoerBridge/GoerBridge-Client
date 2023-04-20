import { Flex } from '@pancakeswap/uikit'
import { useActiveHandle } from 'hooks/useEagerConnect.bmp'
import { useWallet } from 'hooks/useWallet'
import styled from 'styled-components'

export const StyledUserMenu = styled(Flex)`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  width: 170px;
  height: 44px;
  padding: 4px 8px;
  padding-left: 50px;
  margin-left: 0;
  position: relative;

  border-radius: 0 12px 12px 0;

  background-image: url('/images/button-right.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left center;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 288px;
  }
`
export const LabelText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 8px;
    margin-right: 4px;
  }
`

const ConnectWallet = ({ account, ...props }: any) => {
  const handleActive = useActiveHandle()
  const { onPresentConnectModal } = useWallet()

  const handleClick = () => {
    if (account) return
    if (typeof __NEZHA_BRIDGE__ !== 'undefined') {
      handleActive()
    } else {
      onPresentConnectModal()
    }
  }
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null
  return (
    <StyledUserMenu onClick={handleClick} {...props}>
      <LabelText>{accountEllipsis || 'Connect Wallet'}</LabelText>
    </StyledUserMenu>
  )
}

export default ConnectWallet
