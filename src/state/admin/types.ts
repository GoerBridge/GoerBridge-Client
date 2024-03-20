export interface Owner {
  owner: string
  addressDetail: any
}
export const initPaginationWithData = {
  data: undefined,
  page: 1,
  page_size: 10,
  total: 0,
  loading: true,
}

export const ADDRESS_TYPE = {
  address: 'address', // as wallet
  contract: 'contract', // as contract not token
  tokenErc20: 'tokenErc20', // as token
}

export const ABI_ACTION_TYPE = {
  read: 'read',
  write: 'write',
}

export const ABI_TYPE = {
  string: 'string',
  function: 'function',
  bool: 'bool',
  uint256: 'uint256',
  uint8: 'uint8',
  address: 'address',
  fallback: 'fallback',
  type: 'type',
}
