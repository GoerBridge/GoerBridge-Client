import { useTranslation } from '@pancakeswap/localization'
import { InjectedModalProps, Modal, useToast } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useApproveTransfer } from 'hooks/useApproveCallback'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { useBridgeContract } from 'hooks/useContract'
import { useEffect, useState } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { calculateGasMargin } from 'utils'
import { getDecimalAmount } from 'utils/formatBalance'
import { logError } from 'utils/sentry'
import { TransferContent, TransferSuccessContent } from './ModalContent'
// import {BigNumber} from '@ethersproject/bignumber'
// import { formatBigNumber } from 'utils/formatBalance'

const ModalTransferMultiChain: React.FC<InjectedModalProps> = ({ onDismiss, dataModal }) => {
  const { fromNetwork, toNetwork, currency, address, sendAmount, chainId, account } = dataModal || {}
  // console.log('dataModal ====>', dataModal);

  const { toastError } = useToast()
  const { t } = useTranslation()

  const [loading, setLoading] = useState<boolean>(false)
  const [transferSuccess, setTransferSuccess] = useState<boolean>(false)
  const [approvalState, approve] = useApproveTransfer(currency, chainId, account)

  const bridgeContract = useBridgeContract(currency.contract_bridge)
  const { callWithGasPrice } = useCallWithGasPrice()
  const addTransaction = useTransactionAdder()
  const [gasFee, setGasFee] = useState(null)
  const [tokenFeePercent, setGasFeeTokenPercent] = useState(null)

  useEffect(() => {
    async function getFeeGas() {
      if (bridgeContract) {
        const _gasFee = await bridgeContract?.FEE_NATIVE()
        const _tokenFeePercent = await bridgeContract?.feePercentageBridge()
        setGasFee((+_gasFee / 10 ** 18).toString())
        setGasFeeTokenPercent((+_tokenFeePercent / 1000).toString())
      }
    }
    getFeeGas()
  }, [bridgeContract])
  // console.log('tokenFeePercent===>', tokenFeePercent);

  async function onTransfer() {
    setLoading(true)

    if (!chainId || !address || !bridgeContract) throw new Error('Missing dependencies')

    const methodName = 'receiveTokens'

    let gasValue = gasFee
    if (currency?.token_address === '0x0000000000000000000000000000000000000000') {
      gasValue = +sendAmount + +gasFee
    }

    const params = {
      amount: getDecimalAmount(new BigNumber(sendAmount), 18).toString(),
      toBlockchain: toNetwork.code,
      toAddress: address,
      receiveTokens: gasValue,
    }

    const estimatedGas = await bridgeContract.estimateGas.receiveTokens(
      params.amount,
      params.toBlockchain,
      params.toAddress,
      {
        value: getDecimalAmount(new BigNumber(gasValue), 18).toString(),
      },
    )

    callWithGasPrice(bridgeContract, methodName, [params.amount, params.toBlockchain, params.toAddress], {
      gasLimit: calculateGasMargin(estimatedGas),
      value: getDecimalAmount(new BigNumber(gasValue), 18).toString(), // fromNetwork.chainid === 5 ? params.amount : 0,
    })
      .then(async (response) => {
        const resWait = await response.wait()
        if (resWait) {
          addTransaction(response, {
            summary: `Transfer ${currency.code} from ${fromNetwork.code} to ${toNetwork.code}`,
            translatableSummary: {
              text: 'Transfer %currency% from %fromChain% to %toChain%',
              data: { currency: currency.code, fromChain: fromNetwork.code, toChain: toNetwork.code },
            },
            type: 'bridge-transfer',
          })
          setLoading(false)
          setTransferSuccess(true)
        }
      })
      .catch((error: any) => {
        logError(error)
        console.error('Failed to transfer token', error)
        if (error?.code !== 4001) {
          toastError(t('Error'), error.message)
        }
        setLoading(false)
        setTransferSuccess(false)
        throw error
      })
  }

  return (
    <Modal
      title="Transfer"
      description="Please review and confirm the details"
      onDismiss={onDismiss}
      style={{ maxWidth: '630px' }}
    >
      {!transferSuccess ? (
        <TransferContent
          dataModal={dataModal}
          approvalState={approvalState}
          handleApprove={approve}
          loading={loading}
          handleTransfer={onTransfer}
          gasFee={gasFee}
          tokenFeePercent={tokenFeePercent}
        />
      ) : (
        <TransferSuccessContent onDismiss={onDismiss} />
      )}
    </Modal>
  )
}

export default ModalTransferMultiChain
