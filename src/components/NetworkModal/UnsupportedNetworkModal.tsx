import { Button, Flex, Grid, Message, MessageText, Modal, Text, WarningIcon } from '@pancakeswap/uikit'
import { useLocalNetworkChain } from 'hooks/useActiveChainId'
import { useTranslation } from '@pancakeswap/localization'
import { useSwitchNetwork, useSwitchNetworkLocal } from 'hooks/useSwitchNetwork'
import useAuth from 'hooks/useAuth'
import { useMenuItems } from 'components/Menu/hooks/useMenuItems'
import { useRouter } from 'next/router'
import { getActiveMenuItem, getActiveSubMenuItem } from 'components/Menu/utils'
import { useAccount, useNetwork } from 'wagmi'
import { useMemo } from 'react'
import { ChainId } from '@pancakeswap/sdk'
import Dots from '../Loader/Dots'

// Where chain is not supported or page not supported
export function UnsupportedNetworkModal({ pageSupportedChains }: { pageSupportedChains: number[] }) {
  const { switchNetworkAsync, isLoading, canSwitch } = useSwitchNetwork()
  const switchNetworkLocal = useSwitchNetworkLocal()
  const { chains } = useNetwork()
  const chainId = useLocalNetworkChain() || ChainId.BSC
  const { isConnected } = useAccount()
  const { logout } = useAuth()
  const { t } = useTranslation()

  return (
    <Modal title={t('Check your network')} hideCloseButton headerBackground="transparent" maxWidth="600px">
      <Grid style={{ gap: '16px' }}>
        <Text textAlign="center">
          Currently this page only supported in <br />
          BNB Smart Chain, Ethereum
          {/* {supportedMainnetChains?.map((c) => c.name).join(', ')} */}
        </Text>

        <Message variant="warning" icon={false}>
          <Flex justifyContent="center" width="100%">
            <WarningIcon color="warning" width="24px" />
            <Text ml="16px">Please switch your network to continue.</Text>
          </Flex>
        </Message>
        {canSwitch ? (
          <Button
            height="68px"
            isLoading={isLoading}
            onClick={() => {
              if (chains.map((c) => c.id).includes(chainId)) {
                switchNetworkAsync(chainId)
              } else {
                switchNetworkAsync(pageSupportedChains[0] || ChainId.BSC)
              }
            }}
          >
            {isLoading ? <Dots>{t('Switch network in wallet')}</Dots> : t('Switch network in wallet')}
          </Button>
        ) : (
          <Message variant="danger">
            <MessageText>{t('Unable to switch network. Please try it on your wallet')}</MessageText>
          </Message>
        )}
        {isConnected && (
          <Button
            width="100%"
            height="68px"
            variant="black"
            onClick={() =>
              logout().then(() => {
                switchNetworkLocal(ChainId.BSC)
              })
            }
          >
            {t('Disconnect Wallet')}
          </Button>
        )}
      </Grid>
    </Modal>
  )
}
