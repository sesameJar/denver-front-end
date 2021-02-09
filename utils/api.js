import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import { ThreeIdConnect, EthereumAuthProvider } from '3id-connect'

export { getUserProfile, creatUserProfile, addLike, getAuthenticatedAPI}

/**
 * Get api connection
 * @function getAPI
 * @returns api connection for reading public data
 */
function getAPI () {
  const ceramic = new Ceramic('https://ceramic-clay.3boxlabs.com')
  const aliases = {
    basicProfile: 'kjzl6cwe1jw14blngzz896wlixmclprl7nxkpj9s1fgiph2quok8894q7f5mkk0',
  }
  const idx = new IDX({ ceramic, aliases })
  return idx
}

/**
 * Get authenticated api connection
 * @returns authenticated api connection for reading encrypted data and writing data
 */
async function getAuthenticatedAPI () {
  // using the community Ceramic dev node
  const ceramic = new Ceramic('https://ceramic-clay.3boxlabs.com')
  const addresses = await window.ethereum.enable()
  // setting up an authenticated connection using an Ethereum provider
  const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0])
  await ThreeIdConnect.connect(authProvider)
  const provider = await ThreeIdConnect.getDidProvider()
  await ceramic.setDIDProvider(provider)
  // set alias for the defintionIDs used by our app
  const aliases = {
    basicProfile: 'kjzl6cwe1jw14blngzz896wlixmclprl7nxkpj9s1fgiph2quok8894q7f5mkk',
  }
  const idx = new IDX({ ceramic, aliases })
  return idx
}

/**
 * Get user data
 * @function getUserProfile
 * @returns user profile
 */
async function getUserProfile (ethAddress) {
  const api = getAPI()
  const user = await api.get('basicProfile')
  return user
}

/**
 * Update user data
 * @function creatUserProfile
 * @param {json} profile - content to write
 * @returns user profile
 */
async function creatUserProfile (profile) {
  const api = getAPI()
  const user = await api.set('basicProfile', profile)
  return user
}

/**
 * Add challenge to list of likes
 * @function addLike
 * @param {number} challengeId - challenge id the user liked
 * @returns true if added; false if already existed
 */
async function addLike (challengeId) {
  const api = getAPI()
  const user = await api.get('basicProfile')
  if (user.like.includes(challengeId)) {
    return false
  }
  const like = user.like.push(challengeId)
  await user.merge('basicProfile', { like })
  return user
}
