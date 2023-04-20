import { useModal } from '@pancakeswap/uikit'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { useAccount } from 'wagmi'
import WalletModal, { WalletView } from '../UserMenu/WalletModal'
import ConnectWallet from './ConnectWallet'

const UserWalletWithModal = () => {
  const { address: account } = useAccount()
  const { isWrongNetwork } = useActiveChainId()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentWrongNetworkModal] = useModal(<WalletModal initialView={WalletView.WRONG_NETWORK} />)

  const onClickWalletMenu = (): void => {
    if (isWrongNetwork) {
      onPresentWrongNetworkModal()
    } else {
      onPresentWalletModal()
    }
  }

  return <ConnectWallet account={account} onPresentWalletModal={onClickWalletMenu} />
}

export default UserWalletWithModal
