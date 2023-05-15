import { BigNumber as etherBigNumber } from '@ethersproject/bignumber'
import { ArrowDownIcon, Box, Button, Dropdown, EmptyIcon, Flex, HelpIcon, Text, useModal } from '@pancakeswap/uikit'
import { ChainLogo } from 'components/Logo/ChainLogo'
import ModalTransferMultiChain from 'components/Modal/ModalTransferMultiChain'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useNativeCurrency from 'hooks/useNativeCurrency'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import useTokenBalance from 'hooks/useTokenBalance'
import { useEffect, useState } from 'react'
import { useAllBlockchain } from 'state/home/fetchAllBlockChain'
import {
  useAllCurrency,
  useCurrencyByChain,
  useFetchAllCurrency,
  useFetchAllCurrencyByChain,
} from 'state/home/fetchCurrency'

import ConnectWalletButton from 'components/ConnectWalletButton'
import { useBridgeContract } from 'hooks/useContract'
import { useGasFee } from 'hooks/useGasFee'
import { useRouter } from 'next/dist/client/router'
import { useFetchTransaction, useTransactionList } from 'state/home/fetchTransaction'
import { formatBigNumber } from 'utils/formatBalance'
import { useWeb3React } from '../../../packages/wagmi/src/useWeb3React'
import TransactionBridge from './components/TransactionBridge'
import WInput from './components/WInput'
import * as Styles from './styles'

const allBlockchain = [
  {
    _id: '63e7b77e84dfdbf804007cd5',
    code: 'BinanceSmartChainTest',
    title: 'BSC Chain',
    scan: 'https://testnet.bscscan.com',
    rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    active: true,
    chainid: 97,
    project_id: '63e7ab26412eb50be1f573f1',
    createdAt: 1676130174,
    updatedAt: 1676130174,
    transfers: [5],
  },
  {
    _id: '6405b124681cb600128ca955',
    code: 'GoerliChain',
    title: 'Goerli Testnet Chain',
    scan: 'https://testnet-scan.pulsenet.io',
    rpc: 'https://testnet-rpc-dataseed1.pulsenet.io',
    active: true,
    chainid: 5,
    project_id: '63e7ab26412eb50be1f573f1',
    createdAt: 1678094628,
    updatedAt: 1678094628,
    transfers: [97],
  },

  /*  {
    _id: '63b4bdeafce7624bcb031a13',
    code: 'PolyChain',
    title: 'Polygon Chain',
    scan: 'https://mumbai.polygonscan.com',
    rpc: 'https://matic-mumbai.chainstacklabs.com/',
    active: true,
    chainid: 80001,
    project_id: '63e7ab26412eb50be1f573f1',
    updatedAt: 1676130025,
  },
  {
    active: true,
    chainid: 1680,
    code: 'OPVChain',
    project_id: '63e7ab26412eb50be1f573f1',
    rpc: 'https://testnet-rpc-dataseed1.opvchain.com',
    scan: 'https://testnet.opvchain.com',
    title: 'OPV Chain',
  }, */
]

const NetworkSelect = ({ switchNetwork, chainId, blockchainList }) => {
  return (
    <Styles.NetworkSelectContentStyle>
      {/* <Box>
        <Text color="#FFFFFF" fontSize={[14, , 16]}>
          Select a Network
        </Text>
      </Box> */}
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

const CurrencySelect = ({ switchCurrency, currencySelect, currencyListByChain, allCurrency }) => {
  return (
    <Styles.CurrenciesSelectContentStyle>
      {currencyListByChain?.length > 0 ? (
        currencyListByChain?.map((item) => {
          const currency = allCurrency.find((cur) => {
            if (cur._id === item._id) {
              return {
                ...item,
                ...cur,
              }
            }
            return {}
          })

          return (
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
          )
        })
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
  const { account } = useWeb3React()
  const { chainId } = useActiveWeb3React()
  const native = useNativeCurrency()
  const router = useRouter()

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

  const gasFee = useGasFee(formValue.currency?.contract_bridge)
  const bridgeContract = useBridgeContract(formValue?.currency?.contract_bridge)

  const { balance: getBalance } = useTokenBalance(formValue?.currency?.token_address)
  const currencyBalance = formatBigNumber(etherBigNumber.from(getBalance.toString()), 6)

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
  const blockchainList = useAllBlockchain()

  const allCurrency = useAllCurrency()
  const currencyByChain = useCurrencyByChain()
  const transactionList = useTransactionList()

  // Fetch transaction
  useEffect(() => {
    setParamsTransaction((prev) => ({
      ...prev,
      pageSize: 3,
    }))
  }, [])

  // Fetch currency attr
  useEffect(() => {
    setFetchCurrencyAttrParams({ blockchain_id: formValue.fromNetwork?._id })
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

      if (!fromNetwork?.chainid) {
        setFormError({
          fromNetwork: 'Please select network',
        })
        return
      }

      if (!toNetwork?.chainid) {
        setFormError({
          toNetwork: 'Please select network',
        })
        return
      }

      if (!address) {
        setFormError({
          address: 'Please enter address',
        })
        return
      }

      if (!currency) {
        setFormError({
          sendAmount: 'Please select currency',
          receiveAmount: 'Please select currency',
        })
        return
      }

      if (!sendAmount) {
        setFormError({
          sendAmount: 'Please enter amount',
        })
        return
      }

      const minTokenAmount = await bridgeContract.getMinTokenAmount(toNetwork?.code)

      if (+sendAmount < +minTokenAmount.toString()) {
        setFormError({
          sendAmount: `Please enter amount at least ${+minTokenAmount.toString()}`,
        })
        return
      }

      setFormError({})
      onPresentTransferModal({ ...formValue, chainId, account, gasFee, native })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Styles.StyledHome>
      <Styles.CardBridgeTransfer>
        <div className="head">
          <h1>Transfer</h1>
          <p>Cross Chain Bridge</p>
        </div>
        <div className="content">
          <div className="form">
            {/* From */}
            <div className="wrap-input-item">
              <Dropdown
                position="top-left"
                target={
                  <WInput
                    labelLeft="From Network"
                    errorMess={formError.fromNetwork}
                    disabled
                    leftInput={
                      <Styles.RightInputButton>
                        {formValue?.fromNetwork ? (
                          <>
                            <Box className="wIcon">
                              <ChainLogo chainId={formValue?.fromNetwork?.chainid} />
                            </Box>
                            <Text fontSize={[12, , 16]} style={{ whiteSpace: 'nowrap' }}>
                              {formValue?.fromNetwork?.title}
                            </Text>
                          </>
                        ) : (
                          <Text color="#FFFFFF" fontSize={[12, , 14]}>
                            Select Network
                          </Text>
                        )}
                      </Styles.RightInputButton>
                    }
                    rightInput={<ArrowDownIcon />}
                  />
                }
              >
                <NetworkSelect
                  chainId={chainId}
                  blockchainList={allBlockchain}
                  switchNetwork={(pChain) => {
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
                  }}
                />
              </Dropdown>
            </div>
            {/* To */}
            <div className="wrap-input-item">
              <Dropdown
                position="top-left"
                target={
                  <WInput
                    labelLeft="To Network"
                    errorMess={formError.toNetwork}
                    disabled
                    leftInput={
                      <Styles.RightInputButton>
                        {formValue?.toNetwork ? (
                          <>
                            <Box className="wIcon">
                              <ChainLogo chainId={formValue?.toNetwork?.chainid} />
                            </Box>
                            <Text fontSize={[12, , 16]} style={{ whiteSpace: 'nowrap' }}>
                              {formValue?.toNetwork?.title}
                            </Text>
                          </>
                        ) : (
                          <Text color="#FFFFFF" fontSize={[12, , 14]}>
                            Select Network
                          </Text>
                        )}
                      </Styles.RightInputButton>
                    }
                    rightInput={<ArrowDownIcon />}
                  />
                }
              >
                <NetworkSelect
                  chainId={chainId}
                  blockchainList={toChainList}
                  switchNetwork={(pChain) => {
                    setFormValue((prev) => ({ ...prev, toNetwork: pChain }))
                    setFormError({
                      ...formError,
                      toNetwork: '',
                    })
                  }}
                />
              </Dropdown>
            </div>
            {/* Address */}
            <div className="wrap-input-item">
              <WInput
                value={formValue.address}
                labelLeft="Address"
                errorMess={formError.address}
                placeholder="0xd96b5........................EF1bF"
                disabled
                // onUserInput={(v) => setFormValue((prev) => ({ ...prev, address: v }))}
              />
            </div>
            {/* Send amount */}
            <div className="wrap-input-item">
              <WInput
                value={formValue.sendAmount}
                labelLeft="Send amount"
                labelRight={<Text fontSize={[12, , 14]}>Balance: {formValue?.currency ? currencyBalance : '--'}</Text>}
                inputType="number"
                errorMess={formError.sendAmount}
                textAlign="right"
                placeholder="0.00"
                leftInput={
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
                        <Box ml="8px">
                          <ArrowDownIcon />
                        </Box>
                      </Styles.RightInputButton>
                    }
                  >
                    <CurrencySelect
                      currencySelect={formValue.currency}
                      currencyListByChain={currencyByChain || []}
                      allCurrency={allCurrency}
                      switchCurrency={(pCurrency) => {
                        const current = currencyByChain?.map((item) => {
                          if (item.currency_id === pCurrency._id) {
                            return {
                              ...item,
                              ...pCurrency,
                            }
                          }
                          return []
                        })

                        setFormValue((prev) => ({
                          ...prev,
                          currency: current[0],
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
                rightInput={
                  <button className="btn-max" type="button" onClick={handleMaxSendAmount}>
                    Max
                  </button>
                }
                onUserInput={(v) => {
                  if (+v > +currencyBalance) {
                    setFormError((prev) => ({ ...prev, sendAmount: 'Insufficient balance' }))
                  } else {
                    setFormError((prev) => ({ ...prev, sendAmount: '' }))
                    setFormValue((prev) => ({
                      ...prev,
                      sendAmount: v,
                      receiveAmount: +v - +v * (+formValue.currency?.system_fee / 100),
                    }))
                  }
                }}
                style={{ textAlign: 'right' }}
              />
            </div>
            {/* Receive amount */}
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
                leftInput={
                  <Dropdown
                    position="top-left"
                    target={
                      <Styles.RightInputButton>
                        <Box className="wIcon">
                          {formValue?.currency ? (
                            <img src={`/images/currencies/${formValue?.currency?.code}.png`} alt="" />
                          ) : (
                            <HelpIcon />
                          )}
                        </Box>
                        <Box ml="8px">
                          <ArrowDownIcon />
                        </Box>
                      </Styles.RightInputButton>
                    }
                  >
                    <CurrencySelect
                      currencySelect={formValue?.currency}
                      currencyListByChain={currencyByChain || []}
                      allCurrency={allCurrency}
                      switchCurrency={(pCurrency) => {
                        const current = currencyByChain?.map((item) => {
                          if (item.currency_id === pCurrency._id) {
                            return {
                              ...item,
                              ...pCurrency,
                            }
                          }
                          return []
                        })

                        setFormValue((prev) => ({
                          ...prev,
                          currency: current[0],
                        }))
                      }}
                    />
                  </Dropdown>
                }
                rightInput={
                  <button className="btn-max" type="button" disabled>
                    Max
                  </button>
                }
                onUserInput={(v) => v}
                style={{ textAlign: 'right' }}
              />
            </div>
          </div>
          {formValue.fromNetwork && formValue.currency && formValue.sendAmount > 0 && (
            <div className="card-info">
              <Flex justifyContent="space-between" mb="8px">
                <Text fontSize={['14px', '', '16px']} color="#008037">
                  System Fee ({formValue.currency?.system_fee || '--'}%):
                </Text>
                <Text fontSize={['14px', '', '16px']} color="#F98C36">
                  {+formValue.sendAmount * (+formValue.currency?.system_fee / 100)}
                </Text>
              </Flex>
              <Flex justifyContent="space-between" mb="8px">
                <Text fontSize={['14px', '', '16px']} color="#008037">
                  Gas Fee:
                </Text>
                <Text fontSize={['14px', '', '16px']} color="#F98C36">
                  {gasFee || '--'} {native?.symbol}
                </Text>
              </Flex>
              <Flex justifyContent="space-between" mb="8px">
                <Text fontSize={['14px', '', '16px']} color="#008037">
                  Estimated Time:
                </Text>
                <Text fontSize={['14px', '', '16px']} color="#F98C36">
                  5 seconds
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
                {formValue.sendAmount === 'Insufficient balance' ? 'Insufficient balance' : 'Transfer'}
              </Button>
            ) : (
              <ConnectWalletButton />
            )}
          </div>
        </div>
      </Styles.CardBridgeTransfer>

      <TransactionBridge transactionList={transactionList} chainList={allBlockchain} />
    </Styles.StyledHome>
  )
}

export default Home
