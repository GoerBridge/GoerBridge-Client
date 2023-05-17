import {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppState} from 'state'
import {getAllCurrency, getCurrencyAttr} from 'services/api/home'
import {setAllCurrency, setCurrencyByChain} from './actions'

export const useFetchAllCurrency = (): {
    fetchAllCurrency: () => void
    loading: boolean
} => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const fetchAllCurrency = useCallback(async () => {
        setLoading(true)
        try {
            getAllCurrency().then((response) => {

                // tinnq fake data test
                // console.log('response-data :::', response);
                // eslint-disable-next-line no-param-reassign
                response = {
                    code: 200,
                    data: [{
                        active: true,
                        code: "GBR",
                        createdAt: 1676130885,
                        title: "GBR",
                        updatedAt: 1676130885,
                        usd_rate: 0.20625,
                        _id: "63e7ba45608ecdde68783e29"
                    }]
                }
                if (response.code === 200) {
                    dispatch(setAllCurrency({allCurrency: response.data}))
                    setLoading(false)
                } else {
                    dispatch(setAllCurrency({allCurrency: null}))
                }
            })
        } catch (error) {
            console.error(error)
            dispatch(setAllCurrency({allCurrency: null}))
        }
    }, [dispatch])

    useEffect(() => {
        fetchAllCurrency()
    }, [fetchAllCurrency])

    return {fetchAllCurrency, loading}
}

export const useAllCurrency = () => {
    const allCurrency = useSelector((state: AppState) => state.home.allCurrency)
    return allCurrency
}

export const useFetchAllCurrencyByChain = (
    params,
): {
    fetchAllCurrencyByChain: () => void
    loading: boolean
    setFetchCurrencyAttrParams: any
} => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [fetchCurrencyAttrParams, setFetchCurrencyAttrParams] = useState(params)

    const fetchAllCurrencyByChain = useCallback(async () => {
        setLoading(true)
        try {

            getCurrencyAttr(fetchCurrencyAttrParams).then((response) => {

                // tinnq fake data test
                // eslint-disable-next-line no-console
                // console.log('fetchCurrencyAttrParams :::', response.data);

                if (response.code === 200) {
                    // eslint-disable-next-line no-param-reassign
                    response = {
                        code: 200,
                        data: [
                            {
                                active: true,
                                block_number: response.data[0].block_number,
                                blockchain_id: "63e7b77e84dfdbf804007cd5",
                                contract_bridge: "0xFfa946ca5a31523E7B388d42D7CEfE24C2914367",
                                contract_bridge_abi: "abi",
                                createdAt: 1678096305,
                                currency_id: "63e7ba45608ecdde68783e29",
                                system_fee: 0.1,
                                token_address: "0x282cA8a5032A12090732125Dd167c24d696ebC0C",
                                updatedAt: 1684209240,
                                _id: "63ea4e102817d2488460b72e"
                            }
                        ]
                    }
                    dispatch(setCurrencyByChain({currencyByChain: response.data}))
                    setLoading(false)
                } else {
                    dispatch(setCurrencyByChain({currencyByChain: null}))
                }
            })
        } catch (error) {
            console.error(error)
            dispatch(setCurrencyByChain({currencyByChain: null}))
        }
    }, [dispatch, fetchCurrencyAttrParams])

    useEffect(() => {
        fetchAllCurrencyByChain()
    }, [fetchAllCurrencyByChain, fetchCurrencyAttrParams])

    return {fetchAllCurrencyByChain, loading, setFetchCurrencyAttrParams}
}

export const useCurrencyByChain = () => {
    const currencyByChain = useSelector((state: AppState) => state.home.currencyByChain)
    return currencyByChain
}
