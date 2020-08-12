module.exports = (str) => {
  const year = (new Date()).getFullYear()
  return `🚀 ${year} > ${str} > ${year}`
}