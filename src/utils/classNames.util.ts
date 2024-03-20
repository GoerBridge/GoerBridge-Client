/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
export function ClassNames(obj) {
  let className = ''
  for (const key in obj) {
    if (key && obj.hasOwnProperty(key)) {
      const item = obj[key]
      if (item) className += ` ${key}`
    }
  }

  if (className) return className.substr(1)
  return className
}
