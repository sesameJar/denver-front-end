export default function (context, inject) {
  const { app } = context
  const getServerTime = async () => {
    // Get from Binance server for now
    // TOOD consider syncing our own FE servers and getting it from there
    const time = (
      await app.$axios
        .$get('https://www.binance.com/api/v3/time')
        .catch((error) => {
          console.log(error)
          return false
        })
    ).serverTime
    return Math.round(time / 1000)
  }
  inject('getServerTime', getServerTime)
}
