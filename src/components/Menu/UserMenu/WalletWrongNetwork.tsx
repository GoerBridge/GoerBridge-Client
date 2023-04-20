import styled from 'styled-components'
import { useAccount, useNetwork } from 'wagmi'
import { useTranslation } from '@pancakeswap/localization'
import { Button, Text, Link, HelpIcon, Message, MessageText } from '@pancakeswap/uikit'
import { ChainId } from '@pancakeswap/sdk'
import { useSwitchNetwork, useSwitchNetworkLocal } from 'hooks/useSwitchNetwork'
import useAuth from 'hooks/useAuth'

const StyledLink = styled(Link)`
  width: 100%;
  &:hover {
    text-decoration: initial;
  }
`

interface WalletWrongNetworkProps {
  onDismiss: () => void
}

const WalletWrongNetwork: React.FC<React.PropsWithChildren<WalletWrongNetworkProps>> = ({ onDismiss }) => {
  const { t } = useTranslation()
  const { isConnected } = useAccount()
  const { logout } = useAuth()
  const switchNetworkLocal = useSwitchNetworkLocal()

  const { switchNetworkAsync, canSwitch } = useSwitchNetwork()

  const handleSwitchNetwork = async (): Promise<void> => {
    await switchNetworkAsync(ChainId.BSC)
    onDismiss?.()
  }

  return (
    <>
      <Text mb="24px">{t('You’re connected to the wrong network.')}</Text>
      {canSwitch ? (
        <Button height="68px" onClick={handleSwitchNetwork} mb="24px">
          {t('Switch Network')}
        </Button>
      ) : (
        <Message variant="danger">
          <MessageText>{t('Unable to switch network. Please try it on your wallet')}</MessageText>
        </Message>
      )}
      {/* <StyledLink href="https://docs.pancakeswap.finance/get-started/connection-guide" external>
        <Button width="100%" variant="secondary">
          {t('Learn How')}
          <HelpIcon color="primary" ml="6px" />
        </Button>
      </StyledLink> */}
      {isConnected && (
        <Button
          width="100%"
          height="68px"
          variant="black"
          onClick={() => {
            logout().then(() => {
              switchNetworkLocal(ChainId.BSC)
              onDismiss()
            })
          }}
        >
          {t('Disconnect Wallet')}
        </Button>
      )}
    </>
  )
}

export default WalletWrongNetwork
