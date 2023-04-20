/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */

export const removeEmpty = (obj) =>
  Object.entries(obj)
    .map(([k, v]) => [k, v && typeof v === 'object' ? removeEmpty(v) : v])
    // eslint-disable-next-line eqeqeq
    .reduce((a, [k, v]) => (v == null || v == undefined || v == '' ? a : ((a[k] = v), a)), {})

export const formatCode = (text, start, end, concat = '...') => {
  if (!text) return text
  const total = start + end
  const textStr = text.toString()
  const { length } = textStr
  if (total >= length) return text
  return [textStr.slice(0, start), textStr.slice(length - end)].join(concat)
}
