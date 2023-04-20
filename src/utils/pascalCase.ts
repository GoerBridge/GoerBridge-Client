export const toPascalCase = (string: string) => {
  // eslint-disable-next-line func-names
  return string.replace(/\w+/g, function (w) {
    return w[0].toUpperCase() + w.slice(1).toLowerCase()
  })
}
