import request from 'services/request'

export const getAllBlockchain = async (params) =>
  request({
    url: `/blockchain/list`,
    method: 'GET',
    params,
  })

export const getAllCurrency = async (params) =>
  request({
    url: `/currency/list`,
    method: 'GET',
    params,
  })

export const getCurrencyAttr = async (params) =>
  request({
    url: `/currency/list`,
    method: 'GET',
    params,
  })

export const getTransactionList = async (params) =>
  request({
    url: `/transaction/list`,
    method: 'GET',
    params,
  })
