import { Box, Button, Flex, InjectedModalProps, LinkExternal, Message, Skeleton, Text } from '@pancakeswap/uikit'
import { ChainId } from '@pancakeswap/sdk'
import { FetchStatus } from 'config/constants/types'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useTranslation } from '@pancakeswap/localization'
import useAuth from 'hooks/useAuth'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { ChainLogo } from 'components/Logo/ChainLogo'
import { useBalance } from 'wagmi'
import { formatBigNumber } from 'utils/formatBalance'
import CopyAddress from './CopyAddress'
import WalletRow from './WalletRow'

interface WalletInfoProps {
  hasLowNativeBalance: boolean
  onDismiss: InjectedModalProps['onDismiss']
}

const WalletInfo: React.FC<WalletInfoProps> = ({ onDismiss }) => {
  const { t } = useTranslation()
  const { account, chainId, chain } = useActiveWeb3React()
  const isBSC = chainId === ChainId.BSC
  // const bnbBalance = useBalance({ addressOrName: account, chainId: ChainId.BSC })
  const nativeBalance = useBalance({ addressOrName: account, enabled: !isBSC })
  const native = useNativeCurrency()
  // const { balance: cakeBalance, fetchStatus: cakeFetchStatus } = useGetCakeBalance()
  const { logout } = useAuth()

  const handleLogout = () => {
    onDismiss?.()
    logout()
  }

  return (
    <>
      <Box mb="24px">
        <Text fontSize="16px" fontWeight="600" mb="8px">
          {t('Your Address')}
        </Text>
        <CopyAddress account={account} />
      </Box>
      <Box mb="8px">
        <Flex alignItems="center" mb="8px">
          <ChainLogo chainId={chainId} />
          <Text fontSize="16px" fontWeight="600" ml="8px">
            {chain?.name}
          </Text>
        </Flex>
        <WalletRow
          leftNode={`${native?.symbol} Balance`}
          rightNode={nativeBalance?.data ? formatBigNumber(nativeBalance.data.value, 6) : '-'}
          mb="24px"
        />
      </Box>

      {/* {hasLowNativeBalance && (
        <Message variant="warning" mb="24px">
          <Box>
            <Text fontWeight="bold">
              {t('%currency% Balance Low', {
                currency: native.symbol,
              })}
            </Text>
            <Text as="p">
              {t('You need %currency% for transaction fees.', {
                currency: native.symbol,
              })}
            </Text>
          </Box>
        </Message>
      )}
      {!isBSC && chain && (
        <Box mb="12px">
          <Flex justifyContent="space-between" alignItems="center" mb="8px">
            <Flex bg={COLORS.ETH} borderRadius="16px" pl="4px" pr="8px" py="2px">
              <ChainLogo chainId={chain.id} />
              <Text color="white" ml="4px">
                {chain.name}
              </Text>
            </Flex>
            <LinkExternal href={getBlockExploreLink(account, 'address', chainId)}>
              {getBlockExploreName(chainId)}
            </LinkExternal>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Text color="textSubtle">
              {native.symbol} {t('Balance')}
            </Text>
            {!nativeBalance.isFetched ? (
              <Skeleton height="22px" width="60px" />
            ) : (
              <Text>{formatBigNumber(nativeBalance.data.value, 6)}</Text>
            )}
          </Flex>
        </Box>
      )}
      <Box mb="24px">
        <Flex justifyContent="space-between" alignItems="center" mb="8px">
          <Flex bg={COLORS.BNB} borderRadius="16px" pl="4px" pr="8px" py="2px">
            <ChainLogo chainId={ChainId.BSC} />
            <Text color="white" ml="4px">
              BNB Smart Chain
            </Text>
          </Flex>
          <LinkExternal href={getBlockExploreLink(account, 'address', ChainId.BSC)}>
            {getBlockExploreName(ChainId.BSC)}
          </LinkExternal>
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Text color="textSubtle">BNB {t('Balance')}</Text>
          {!bnbBalance.isFetched ? (
            <Skeleton height="22px" width="60px" />
          ) : (
            <Text>{formatBigNumber(bnbBalance.data.value, 6)}</Text>
          )}
        </Flex>
        <Flex alignItems="center" justifyContent="space-between">
          <Text color="textSubtle">{t('CAKE Balance')}</Text>
          {cakeFetchStatus !== FetchStatus.Fetched ? (
            <Skeleton height="22px" width="60px" />
          ) : (
            <Text>{formatBigNumber(cakeBalance, 3)}</Text>
          )}
        </Flex>
      </Box> */}

      <Button width="100%" margin="0 auto" onClick={handleLogout} style={{ background: '#052C83' }}>
        {t('Disconnect Wallet')}
      </Button>
    </>
  )
}

export default WalletInfo
