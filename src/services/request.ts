import axios from 'axios'
import queryString from 'query-string'
import Cookies from 'js-cookie'
import nookies from 'nookies'

const cacheToken = 'TOKEN_KEY'
const SESSION_EXPIRED_STATUS_CODE = 401
const BASE_URL = process.env.NEXT_PUBLIC_ROOT_API

const baseApiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'content-type': 'application/json',
    'cache-control': 'no-cache, no-store, must-revalidate',
  },
  timeout: 60000, // 60s
  paramsSerializer: (params) => queryString.stringify(params),
})

const request = ({ context, tokenClient, ...options }: any) => {
  // Serverside
  if (context) {
    const token = nookies.get(context)[cacheToken]
    if (token) {
      baseApiClient.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  }

  // /Clientside
  if (tokenClient) {
    const token = Cookies.get(cacheToken)
    baseApiClient.defaults.headers.common.Authorization = `Bearer ${token}`
  }

  const onSuccess = (response) => {
    return response?.data
  }

  const onError = (error) => {
    if (error?.response?.status === SESSION_EXPIRED_STATUS_CODE) {
      Cookies.remove(cacheToken)
    }

    return Promise.reject(error.response)
  }

  return baseApiClient({ ...options })
    .then(onSuccess)
    .catch(onError)
}

export default request
