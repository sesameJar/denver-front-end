
// const getServerTime = async () => {
//   const time = (
//     await app.$axios
//       .$get('https://www.binance.com/api/v3/time')
//       .catch((error) => {
//         console.log(error)
//         return false
//       })
//   ).serverTime
//   return Math.round(time / 1000)
// }

export { getServerTime }
function getServerTime () {
  return Math.round(Date.now() / 1000)
}
