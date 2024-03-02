/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-prototype-builtins */
export class ObjectUtils {
  static getIn(obj, path, def, convertValue) {
    try {
      /**
       * If the path is a string, convert it to an array
       * @param  {String|Array} path The path
       * @return {Array}             The path array
       */
      const stringToPath = function (path: any) {
        // If the path isn't a string, return it
        if (typeof path !== 'string') return path
        // Create new array
        const output = []
        // Split to an array with dot notation
        path.split('.').forEach(function (item) {
          // Split to an array with bracket notation
          item.split(/\[([^}]+)\]/g).forEach(function (key) {
            // Push to the new array
            if (key.length > 0) {
              output.push(key)
            }
          })
        })
        return output
      }

      // Get the path as an array
      path = stringToPath(path)
      // Cache the current object
      let current = obj || {}

      // For each item in the path, dig into the object
      for (let i = 0; i < path.length; i++) {
        // If the item isn't found, return the default (or null)
        if (typeof current[path[i]] === 'undefined') return def
        // Otherwise, update the current  value
        current = current[path[i]]
      }

      if (current && convertValue) return convertValue(current)
      return current
    } catch (error) {
      return def
    }
  }

  static cleanObj(obj) {
    obj = obj || {}

    if (Array.isArray(obj)) {
      return obj.map((item) =>
        Object.keys(item).reduce(
          (acc, key) =>
            item[key] === undefined || item[key] === null || item[key] === '' ? acc : { ...acc, [key]: item[key] },
          {},
        ),
      )
    }

    return Object.keys(obj).reduce(
      (acc, key) =>
        obj[key] === undefined || obj[key] === null || obj[key] === '' ? acc : { ...acc, [key]: obj[key] },
      {},
    )
  }

  static isEmptyObj(obj) {
    for (const prop in obj) {
      if (obj.hasOwnProperty(prop)) return false
    }
    return JSON.stringify(obj) === JSON.stringify({})
  }

  static isHasValue(obj) {
    return !ObjectUtils.isEmptyObj(obj)
  }

  static selects(obj, keys) {
    return keys.reduce((acc, key) => {
      acc[key] = obj[key]
      return acc
    }, {})
  }

  static toQueryString(query, keyOfItemsMustBeEndCode) {
    try {
      const cleanedObj = Object.keys(query).reduce(
        (acc, key) =>
          query[key] === undefined || query[key] === null || query[key] === '' || query[key]?.length === 0 // query[key] === []
            ? acc
            : { ...acc, [key]: query[key] },
        {},
      )

      let output = '?'
      for (const key in cleanedObj) {
        if (cleanedObj[key]) {
          const item = cleanedObj[key]
          if (keyOfItemsMustBeEndCode && keyOfItemsMustBeEndCode.includes(key)) {
            output += `${key}=${encodeURIComponent(item)}&`
          } else {
            output += `${key}=${item}&`
          }
        }
      }

      return output.slice(0, output.length - 1)
    } catch (error) {
      return ''
    }
  }

  // Function to convert objects containing nested objects and arrays to array pairs similar to Object.entries()
  static toArray(val) {
    if (!val) return []

    // By default (val is not object or array, return the original value)
    let result = val
    let arr = []

    // If object passed the result is the return value of Object.entries()
    if (typeof val === 'object' && !Array.isArray(val)) {
      result = Object.entries(val)
      // If one of the results is an array or object, run this function on them again recursively
      arr = result.map((attr) => {
        return {
          key: attr[0],
          value: typeof attr[1] === 'object' ? this.toArray(attr[1]) : attr[1],
        }
      })
    }

    // If array passed, run this function on each value in it recursively
    else if (Array.isArray(val)) {
      arr = val.map((attr) => {
        if (typeof attr === 'object') {
          return this.toArray(attr)
        }
        return {
          key: attr,
          value: attr,
        }
      })
    }

    return arr
  }
}
