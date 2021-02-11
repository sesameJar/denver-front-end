const ipfsClient = require('ipfs-http-client')

// TODO: These configuration options should come from .env
const infuraIpfsClient = ipfsClient({
  host: process.env.INFURA_URL,
  port: process.env.INFURA_PORT,
  protocol: 'https'
  // timeout: '5m' // FIXME configure this or leave blank?
})

module.exports = infuraIpfsClient
