/* eslint-disable no-var */
/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
export const currentTimestamp = () => new Date().getTime()

const removeEmpty = (obj) =>
  Object.entries(obj)
    .map(([k, v]) => [k, v && typeof v === 'object' ? removeEmpty(v) : v])
    // eslint-disable-next-line eqeqeq
    .reduce((a, [k, v]) => (v == null || v == undefined || v == '' ? a : ((a[k] = v), a)), {})

const formatCode = (text, start, end, concat = '...') => {
  if (!text) return text
  const total = start + end
  const textStr = text.toString()
  const { length } = textStr
  if (total >= length) return text
  return [textStr.slice(0, start), textStr.slice(length - end)].join(concat)
}

const numberFormatter = (num, digits) => {
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'm' },
    { value: 1e9, symbol: 'g' },
    { value: 1e12, symbol: 't' },
    { value: 1e15, symbol: 'p' },
    { value: 1e18, symbol: 'e' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0'
}

const formatAddress = (address, start = 20, end = 0, concat = '...') => {
  if (address?.pro?.na) return address?.pro?.na
  if (!address?.a) return ''
  const total = start + end
  const textStr = address?.a?.toString()
  const { length } = textStr
  if (total >= length) return address?.a
  return [textStr.slice(0, start), textStr.slice(length - end)].join(concat)
}

export { removeEmpty, formatCode, numberFormatter, formatAddress }
