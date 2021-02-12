export { getServerTime }

function getServerTime () {
  // TODO get time from server
  //   const time = (
  //     await app.$axios
  //       .$get('https://www.binance.com/api/v3/time')
  //       .catch((error) => {
  //         console.log(error)
  //         return false
  //       })
  //   ).serverTime
  return Math.round(Date.now() / 1000)
}
