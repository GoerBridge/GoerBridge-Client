import { BigNumber as etherBigNumber } from '@ethersproject/bignumber'
import {
  ArrowDownIcon,
  Box,
  Button,
  Dropdown,
  EmptyIcon,
  Flex,
  HelpIcon,
  Text,
  useModal,
  useToast,
} from '@pancakeswap/uikit'
import { ChainLogo } from 'components/Logo/ChainLogo'
import ModalTransferMultiChain from 'components/Modal/ModalTransferMultiChain'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import useTokenBalance from 'hooks/useTokenBalance'
import { useEffect, useState } from 'react'
// import { useAllBlockchain } from 'state/home/fetchAllBlockChain'
import {
  useAllCurrency,
  useCurrencyByChain,
  useFetchAllCurrency,
  useFetchAllCurrencyByChain,
} from 'state/home/fetchCurrency'

import ConnectWalletButton from 'components/ConnectWalletButton'
import ModalChain from 'components/ModalChain'
import { useBridgeContract } from 'hooks/useContract'
import { useRouter } from 'next/dist/client/router'
import { useFetchTransaction } from 'state/home/fetchTransaction'
import { formatBigNumber } from 'utils/formatBalance'
// import {useWeb3React} from '../../../packages/wagmi/src/useWeb3React'
// import TransactionBridge from './components/TransactionBridge'
import { ChainId } from '@pancakeswap/sdk'
import { allBlockchain } from 'config/configChain'
import { useBalance } from 'wagmi'
import SelectChain from './components/SelectChain'
import WInput from './components/WInput'
import * as Styles from './styles'

const NetworkSelect = ({ switchNetwork, chainId, blockchainList }) => {
  return (
    <Styles.NetworkSelectContentStyle>
      {blockchainList?.map((chain) => {
        return (
          <Box
            className="network-item"
            key={chain.chainid}
            style={{
              justifyContent: 'flex-start',
              opacity: chain.chainid !== chainId ? 1 : 0.5,
              cursor: chain.chainid !== chainId ? 'pointer' : 'not-allowed',
            }}
            onClick={() => chain.chainid !== chainId && switchNetwork(chain)}
          >
            <ChainLogo chainId={chain.chainid} />
            <Text
              color={chain.chainid === chainId ? 'secondary' : 'text'}
              bold={chain.chainid === chainId}
              pl="12px"
              fontSize={[12, , 14]}
            >
              {chain.title}
            </Text>
          </Box>
        )
      })}
    </Styles.NetworkSelectContentStyle>
  )
}

const CurrencySelect = ({ fromNetwork, switchCurrency, currencySelect, currencyListByChain, allCurrency }) => {
  let currency
  console.log('currencyListByChain', currencyListByChain)
  if (currencyListByChain?.length > 0 && typeof fromNetwork !== 'undefined') {
    currency = currencyListByChain[0]
  }

  return (
    <Styles.CurrenciesSelectContentStyle>
      {typeof currency !== 'undefined' ? (
        <Box
          className="curr-item"
          key={currency._id}
          style={{
            justifyContent: 'flex-start',
            opacity: currency._id !== currencySelect?._id ? 1 : 0.5,
            cursor: currency._id !== currencySelect?._id ? 'pointer' : 'not-allowed',
          }}
          onClick={() => currency._id !== currencySelect?._id && switchCurrency(currency)}
        >
          <img src={`/images/currencies/${currency?.code}.png`} alt="logo" />
          <Text
            color={currency._id === currencySelect?._id ? 'secondary' : 'text'}
            bold={currency._id === currencySelect?._id}
            pl="12px"
          >
            {currency.title} ({currency.code})
          </Text>
        </Box>
      ) : (
        <Flex alignItems="center">
          <EmptyIcon width={24} />
          <Text as="p" ml="16px" fontSize={[12, 14]} fontWeight={500}>
            There Are No Data
          </Text>
        </Flex>
      )}
    </Styles.CurrenciesSelectContentStyle>
  )
}

const Home = ({ pageSupportedChains }: { pageSupportedChains: number[] }) => {
  // const account = useWeb3React()
  const { account, chainId } = useActiveWeb3React()
  const native = useNativeCurrency()
  const router = useRouter()
  const [isShowPopup, setShowPopup] = useState(null)
  const { toastError } = useToast()

  const isBSC = chainId === ChainId.BSC
  // const bnbBalance = useBalance({ addressOrName: account, chainId: ChainId.BSC })
  const nativeBalance = useBalance({ addressOrName: account, enabled: !isBSC })

  const { pendingChainId, isLoading, canSwitch, switchNetworkAsync } = useSwitchNetwork()

  const [formValue, setFormValue] = useState({
    fromNetwork: undefined,
    toNetwork: undefined,
    currency: undefined,
    address: undefined,
    sendAmount: undefined,
    receiveAmount: undefined,
  })
  const [formError, setFormError] = useState<any>({
    fromNetwork: '',
    toNetwork: '',
    currency: '',
    address: '',
    sendAmount: '',
    receiveAmount: '',
    contract: '',
  })
  const [toChainList, setToChainList] = useState([])

  const [gasFee, setGasFee] = useState(null)
  const bridgeContract = useBridgeContract(formValue?.currency?.contract_bridge)
  const { balance: getBalance } = useTokenBalance(formValue?.currency?.token_address)

  let currencyBalance = 0
  if (chainId === 5) {
    if (typeof nativeBalance.data !== 'undefined') {
      currencyBalance = +formatBigNumber(nativeBalance.data.value, 6)
    }
  } else {
    currencyBalance = +formatBigNumber(etherBigNumber.from(getBalance.toString()), 6)
  }

  const formIsValid =
    !!formError?.fromNetwork ||
    !!formError?.toNetwork ||
    !!formError?.currency ||
    !!formError?.address ||
    !!formError?.sendAmount ||
    !!formError?.receiveAmount

  useFetchAllCurrency()
  const { setParamsTransaction } = useFetchTransaction()
  const { setFetchCurrencyAttrParams } = useFetchAllCurrencyByChain({ blockchain_id: '' })

  const allCurrency = useAllCurrency()
  const currencyByChain = useCurrencyByChain()

  // const transactionList = useTransactionList()

  // Fetch transaction
  useEffect(() => {
    setParamsTransaction((prev) => ({
      ...prev,
      pageSize: 3,
    }))
  }, [])

  // Fetch currency attr
  useEffect(() => {
    setFetchCurrencyAttrParams({
      blockchain_id: formValue.fromNetwork?._id,
    })
  }, [formValue.fromNetwork])

  // Auto set address when logged in
  useEffect(() => {
    setFormValue({
      ...formValue,
      address: account || '',
    })
    setFormError({
      ...formError,
      address: '',
    })
    setParamsTransaction((prev) => ({
      ...prev,
      pageSize: 3,
    }))
  }, [account])

  // Auto select fromNetWork, toNetWork
  useEffect(() => {
    const { chainId: paramChainId } = router.query
    if (paramChainId) {
      const chain = allBlockchain?.find((item) => item.chainid === +paramChainId)
      const toChain = allBlockchain.filter((item) => chain.transfers.includes(item.chainid))

      setFormValue({
        ...formValue,
        fromNetwork: chain,
        // toNetwork: allBlockchain?.find((item) => item.chainid !== +paramChainId),
      })
      setToChainList(toChain)
    }
  }, [router.query.chainId])

  const handleMaxSendAmount = () => {
    setFormValue((prev) => ({
      ...prev,
      sendAmount: +currencyBalance,
      receiveAmount: +currencyBalance * 0.95,
    }))
  }

  const [onPresentTransferModal] = useModal(<ModalTransferMultiChain />)

  const handleTransfer = async () => {
    try {
      const { fromNetwork, toNetwork, currency, address, sendAmount, receiveAmount } = formValue

      if (!toNetwork?.chainid) {
        toastError('Error', 'Please select network')
        return
      }

      if (!currency) {
        toastError('Error', 'Please select currency')
        return
      }

      if (!sendAmount) {
        setFormError({
          sendAmount: 'Please enter amount',
        })
        return
      }

      // const minTokenAmount = await bridgeContract.getMinTokenAmount(toNetwork?.code)
      // if (+sendAmount < +minTokenAmount.toString()) {
      //   setFormError({
      //     sendAmount: `Please enter amount at least ${+minTokenAmount.toString()}`,
      //   })
      //   return
      // }

      setFormError({})
      onPresentTransferModal({ ...formValue, chainId, account, native })
    } catch (error) {
      console.log(error)
    }
  }

  const onClosePopupChain = (pChain: any) => {
    if (pChain?.chainid) {
      if (isShowPopup === 'FROM') {
        const chainList = allBlockchain.filter((item) => pChain.transfers.includes(item.chainid))
        setToChainList(chainList)

        setFetchCurrencyAttrParams({
          blockchain_id: pChain?._id,
        })

        switchNetworkAsync(pChain.chainid).then((res) => {
          if (res) {
            setFormValue((prev) => ({
              ...prev,
              fromNetwork: pChain,
              toNetwork: undefined,
              currency: undefined,
            }))
          }
        })

        setFormError({
          ...formError,
          fromNetwork: '',
        })
        setShowPopup(null)
      } else {
        setFormValue((prev) => ({ ...prev, toNetwork: pChain }))
        setFormError({
          ...formError,
          toNetwork: '',
        })
        setShowPopup(null)
      }
    } else {
      setShowPopup(null)
    }
  }

  useEffect(() => {
    async function getFeeGas() {
      if (bridgeContract) {
        const _gasFee = await bridgeContract?.FEE_NATIVE()
        setGasFee((+_gasFee / 10 ** 18).toString())
      }
    }
    getFeeGas()
  }, [bridgeContract, formValue])

  const onTurnAround = async () => {
    if (formValue.toNetwork) {
      switchNetworkAsync(formValue.toNetwork.chainid).then((res) => {
        if (res) {
          setFormValue((prev) => ({
            ...prev,
            fromNetwork: formValue.toNetwork,
            toNetwork: formValue.fromNetwork,
            currency: undefined,
          }))
          setFetchCurrencyAttrParams({
            blockchain_id: formValue.toNetwork?._id,
          })
        }
      })
    }

    // setFetchCurrencyAttrParams({
    //   blockchain_id: pChain?._id,
    //   currency_id: pChain?.currency_id,
    // })

    // switchNetworkAsync(pChain.chainid).then((res) => {
    //   if (res) {
    //     setFormValue((prev) => ({
    //       ...prev,
    //       fromNetwork: pChain,
    //       toNetwork: undefined,
    //       currency: undefined,
    //     }))
    //   }
    // })
  }

  return (
    <Styles.StyledHome>
      <Styles.CardBridgeTransfer>
        <div className="content">
          <div className="form">
            {/* From */}
            <SelectChain
              data={{ chainid: formValue?.fromNetwork?.chainid, title: formValue?.fromNetwork?.title }}
              onSelect={() => setShowPopup('FROM')}
              selectTitle="From"
            />
            {/* Send amount */}
            <Box background="#f5f7fc" paddingY="10px" paddingX="10px" borderRadius="15px" mb={2} mt={3}>
              <div className="wrap-input-item">
                <WInput
                  value={formValue.sendAmount}
                  labelLeft="Send amount"
                  labelRight={
                    <Flex>
                      <button
                        type="button"
                        onClick={handleMaxSendAmount}
                        style={{
                          fontSize: '12px',
                          border: 0,
                          marginRight: '10px',
                          background: '#627feb',
                          cursor: 'pointer',
                        }}
                      >
                        Max
                      </button>
                      <Text fontSize={[12, , 14]}> {currencyBalance > 0 ? currencyBalance : '--'}</Text>
                    </Flex>
                  }
                  inputType="number"
                  errorMess={formError.sendAmount}
                  textAlign="right"
                  placeholder="0.00"
                  rightInput={
                    <Dropdown
                      position="top-left"
                      target={
                        <Styles.RightInputButton>
                          <Box className="wIcon">
                            {formValue.currency ? (
                              <img src={`/images/currencies/${formValue?.currency?.code}.png`} alt="" />
                            ) : (
                              <HelpIcon />
                            )}
                          </Box>
                          <Box ml="1px">
                            <ArrowDownIcon />
                          </Box>
                        </Styles.RightInputButton>
                      }
                    >
                      <CurrencySelect
                        fromNetwork={formValue.fromNetwork}
                        currencySelect={formValue.currency}
                        currencyListByChain={currencyByChain || []}
                        allCurrency={allCurrency}
                        switchCurrency={(pCurrency) => {
                          setFormValue((prev) => ({
                            ...prev,
                            currency: {
                              ...currencyByChain[0],
                              ...pCurrency,
                            },
                          }))

                          setFormError({
                            ...formError,
                            sendAmount: '',
                            receiveAmount: '',
                          })
                        }}
                      />
                    </Dropdown>
                  }
                  onUserInput={(v) => {
                    if (+v > +currencyBalance) {
                      setFormError((prev) => ({ ...prev, sendAmount: 'Insufficient balance' }))
                    } else {
                      setFormError((prev) => ({ ...prev, sendAmount: '' }))
                      setFormValue((prev) => ({
                        ...prev,
                        sendAmount: v,
                        receiveAmount: +v,
                      }))
                    }
                  }}
                  style={{ textAlign: 'left' }}
                />
              </div>
            </Box>
            {/* To */}
            <Flex alignItems="center" justifyContent="center" mb={2}>
              <Button style={{ background: 'transparent', boxShadow: 'none' }} onClick={onTurnAround}>
                <img src="/images/icon-arrow.svg" alt="arrow" />
              </Button>
            </Flex>

            <SelectChain
              data={{ chainid: formValue?.toNetwork?.chainid, title: formValue?.toNetwork?.title }}
              onSelect={() => setShowPopup('TO')}
              selectTitle="To"
            />
            {/* Receive amount */}
            <Box background="#f5f7fc" paddingY="10px" paddingX="10px" borderRadius="15px" mb={4} mt={3}>
              <div className="wrap-input-item">
                <WInput
                  value={formValue.receiveAmount}
                  labelLeft="Receive amount"
                  disabled
                  // labelRight={<Text fontSize={[12, , 14]}>Balance: {formValue?.currency ? currencyBalance : '--'}</Text>}
                  inputType="number"
                  errorMess={formError.receiveAmount}
                  textAlign="right"
                  placeholder="0.00"
                  onUserInput={(v) => v}
                  style={{ textAlign: 'left' }}
                />
              </div>
            </Box>
          </div>
          {formValue.fromNetwork && formValue.currency && formValue.sendAmount > 0 && (
            <div className="card-info">
              {/* <Flex justifyContent="space-between" mb="8px">
                <Text fontSize={['14px', '', '16px']} color="#052C83">
                  System Fee ({formValue.currency?.system_fee || '--'}%):
                </Text>
                <Text fontSize={['14px', '', '16px']} color="#F98C36">
                  {+formValue.sendAmount * (+formValue.currency?.system_fee / 100)}
                </Text>
              </Flex> */}
              <Flex justifyContent="space-between" mb="8px">
                <Text fontSize={['14px', '', '16px']} color="#052C83">
                  Gas Fee:
                </Text>
                <Text fontSize={['14px', '', '16px']} color="#F98C36">
                  {gasFee || '--'} {native?.symbol}
                </Text>
              </Flex>
              <Flex justifyContent="space-between" mb="8px">
                <Text fontSize={['14px', '', '16px']} color="#052C83">
                  Estimated Time:
                </Text>
                <Text fontSize={['14px', '', '16px']} color="#F98C36">
                  60 seconds
                </Text>
              </Flex>
            </div>
          )}

          {formError?.contract && (
            <Text color="red" fontSize={[14, , 16]} my="12px" textAlign="center">
              {formError.contract}
            </Text>
          )}
          <div className="form-action">
            {account ? (
              <Button onClick={handleTransfer} disabled={formIsValid}>
                {formValue.sendAmount === 'Insufficient balance' ? 'Insufficient balance' : 'Cross-Chain Transfer'}
              </Button>
            ) : (
              <ConnectWalletButton />
            )}
          </div>
        </div>
      </Styles.CardBridgeTransfer>
      <ModalChain
        isOpen={isShowPopup === 'FROM' || isShowPopup === 'TO'}
        data={{
          blockchainList: isShowPopup === 'FROM' ? allBlockchain : toChainList,
          chainId,
          titlePopup: isShowPopup === 'TO' ? 'Select Destination Chain' : 'Select Source Chain',
        }}
        onRequestClose={onClosePopupChain}
      />
    </Styles.StyledHome>
  )
}

export default Home
