import { useTranslation } from '@pancakeswap/localization'
import { ChainId, NATIVE } from '@pancakeswap/sdk'
import styled from 'styled-components'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Box,
  Button,
  Flex,
  InfoIcon,
  Text,
  UserMenu,
  UserMenuDivider,
  UserMenuItem,
  useTooltip,
} from '@pancakeswap/uikit'
import { useWeb3React } from '@pancakeswap/wagmi'
import { useActiveChainId, useLocalNetworkChain } from 'hooks/useActiveChainId'
import { useNetworkConnectorUpdater } from 'hooks/useActiveWeb3React'
import { useHover } from 'hooks/useHover'
import { useSessionChainId } from 'hooks/useSessionChainId'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { chains } from 'utils/wagmi'
import { useNetwork } from 'wagmi'
import { ChainLogo } from './Logo/ChainLogo'

export const StyledUserMenu = styled(Flex)`
  align-items: center;
  cursor: pointer;
  display: inline-flex;
  width: 72px;
  height: 36px;
  padding: 4px 8px;
  padding-left: 60px;
  position: relative;
  z-index: 10;

  border-radius: 12px 0 0 12px;

  background-image: url('/images/button-left.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: right center;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 290px;
    height: 44px;
  }

  img {
    width: auto;
    height: 82%;
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translateY(-50%);
  }
`
const NetworkSelectContentStyle = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;

  border-radius: 8px;
  box-shadow: -2px -2px 2px #1e3238, inset 0px -2px 1px #001015;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px;
  }

  & > button {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const NetworkSelect = ({ switchNetwork, chainId }) => {
  const { t } = useTranslation()
  return (
    <NetworkSelectContentStyle>
      <Box mb="12px">
        <Text color="#FFFFFF" fontSize={[16, , 20]}>
          {t('Select a Network')}
        </Text>
      </Box>
      {/* <UserMenuDivider /> */}
      {chains
        // .filter((chain) => !chain.testnet || chain.id === chainId)
        .map((chain) => (
          <UserMenuItem
            key={chain.id}
            style={{ justifyContent: 'flex-start' }}
            onClick={() => chain.id !== chainId && switchNetwork(chain.id)}
          >
            <ChainLogo chainId={chain.id} />
            <Text
              color={chain.id === chainId ? 'secondary' : 'text'}
              bold={chain.id === chainId}
              pl="12px"
              fontSize={[12, , 14]}
            >
              {chain.name}
            </Text>
          </UserMenuItem>
        ))}
    </NetworkSelectContentStyle>
  )
}

const WrongNetworkSelect = ({ switchNetwork, chainId }) => {
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t(
      'The URL you are accessing (Chain id: %chainId%) belongs to %network%; mismatching your wallet’s network. Please switch the network to continue.',
      {
        chainId,
        network: chains.find((c) => c.id === chainId)?.name ?? 'Unknown network',
      },
    ),
    {
      placement: 'auto-start',
      hideTimeout: 0,
    },
  )
  const { chain } = useNetwork()
  const localChainId = useLocalNetworkChain() || ChainId.BSC
  const [, setSessionChainId] = useSessionChainId()

  const localChainName = chains.find((c) => c.id === localChainId)?.name ?? 'BSC'

  const [ref1, isHover] = useHover<HTMLButtonElement>()

  return (
    <>
      <Flex ref={targetRef} alignItems="center" px="16px" py="8px">
        <Text color="textSubtle">{t('Please switch network')}</Text>
      </Flex>
      {/* {tooltipVisible && tooltip} */}
      {/* <UserMenuDivider /> */}
      <Box p="12px 16px">
        {chain && (
          <UserMenuItem ref={ref1} onClick={() => setSessionChainId(chain.id)} style={{ justifyContent: 'flex-start' }}>
            <ChainLogo chainId={chain.id} />
            <Text color="secondary" bold pl="12px">
              {chain.name}
            </Text>
          </UserMenuItem>
        )}
        <Box px="16px" pt="8px">
          {isHover ? <ArrowUpIcon color="text" /> : <ArrowDownIcon color="text" />}
        </Box>
        <UserMenuItem onClick={() => switchNetwork(localChainId)} style={{ justifyContent: 'flex-start' }}>
          <ChainLogo chainId={localChainId} />
          <Text pl="12px">{localChainName}</Text>
        </UserMenuItem>
        <Button mx="16px" my="8px" mt="24px" scale="sm" onClick={() => switchNetwork(localChainId)}>
          {t('Switch network in wallet')}
        </Button>
      </Box>
    </>
  )
}

export const NetworkSwitcher = () => {
  const { t } = useTranslation()
  const { chainId, isWrongNetwork, isNotMatched } = useActiveChainId()

  const { pendingChainId, isLoading, canSwitch, switchNetworkAsync } = useSwitchNetwork()
  const router = useRouter()
  const { account } = useWeb3React()

  useNetworkConnectorUpdater()

  const foundChain = useMemo(
    () => chains.find((c) => c.id === (isLoading ? pendingChainId || chainId : chainId)),
    [isLoading, pendingChainId, chainId],
  )
  const symbol = NATIVE[foundChain?.id]?.symbol ?? foundChain?.nativeCurrency?.symbol
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Unable to switch network. Please try it on your wallet'),
    { placement: 'auto' },
  )

  const cannotChangeNetwork = !canSwitch

  if (!chainId || (!account && router.pathname.includes('info'))) {
    return null
  }

  return (
    <Box ref={cannotChangeNetwork ? targetRef : null}>
      {cannotChangeNetwork && tooltipVisible && tooltip}
      <UserMenu
        mr="-30px"
        // disabled={cannotChangeNetwork}
        disabled
        overlay={() =>
          isNotMatched ? (
            <WrongNetworkSelect switchNetwork={switchNetworkAsync} chainId={chainId} />
          ) : (
            <NetworkSelect switchNetwork={switchNetworkAsync} chainId={chainId} />
          )
        }
      >
        <StyledUserMenu>
          <img src={`/images/chains/${chainId}.png`} alt="" />
          {
            // isLoading ? (
            //   t('Requesting')
            // ) :
            isWrongNetwork ? (
              <Box display={['none', null, 'block']}> {t('Wrong Network')}</Box>
            ) : foundChain ? (
              <>
                <Box display={['none', null, 'block']}>{foundChain.name}</Box>
                {/* <Box display={['block', null, null, null, null, 'none']}>{symbol}</Box> */}
              </>
            ) : (
              t('Select a Network')
            )
          }
        </StyledUserMenu>
      </UserMenu>
    </Box>
  )
}
