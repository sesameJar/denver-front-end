import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import { ThreeIdConnect, EthereumAuthProvider } from '3id-connect'

export { getUserProfile, creatUserProfile, addLike, removeLike, getAuthenticatedAPI }

/**
 * Get api connection
 * @function getAPI
 * @returns api connection for reading public data
 */
function getAPI () {
  const ceramic = new Ceramic('https://ceramic-clay.3boxlabs.com')
  const aliases = {
    basicProfile: 'kjzl6cwe1jw14blngzz896wlixmclprl7nxkpj9s1fgiph2quok8894q7f5mkk0'
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
  const threeIdConnect = new ThreeIdConnect()
  // setting up an authenticated connection using an Ethereum provider
  const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0])
  await threeIdConnect.connect(authProvider)
  const provider = await threeIdConnect.getDidProvider()
  // use default alias for the defintionIDs
  await ceramic.setDIDProvider(provider)
  const idx = new IDX({ ceramic })
  console.log('idx', idx)
  return idx
}

/**
 * Get user data
 * @function getUserProfile
 * @returns user profile
 */
async function getUserProfile (ethAddress) {
  const api = await getAPI()
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
  const api = await getAuthenticatedAPI()
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
  const api = await getAuthenticatedAPI()
  const user = await api.get('basicProfile')
  console.log('User likes before:', user)
  // iniitialize as array of one element if the "starRelayLikes" key is not present
  const isKeyUndefined = !user?.starRelayLikes
  const isValueNotArray = !user?.starRelayLikes?.length
  if (isKeyUndefined || isValueNotArray) {
    await api.merge('basicProfile', { starRelayLikes: [Number(challengeId)] })
    return true
  }
  const likes = await user.starRelayLikes
  if (likes.includes(Number(challengeId))) {
    return false
  }
  likes.push(Number(challengeId))
  await api.merge('basicProfile', { starRelayLikes: likes })
  console.log('User likes after:', user)
  return true
}

/**
 * Remove challenge from list of likes
 * @function addLike
 * @param {number} challengeId - challenge id the user liked
 * @returns true if removed; false unchanged
 */
async function removeLike (challengeId) {
  const api = await getAuthenticatedAPI()
  const user = await api.get('basicProfile')
  console.log('User likes before:', user)
  // iniitialize as array of one element if the "starRelayLikes" key is not present
  const isKeyUndefined = !user?.starRelayLikes
  const isValueNotArray = !user?.starRelayLikes?.length
  if (isKeyUndefined || isValueNotArray) {
    await api.merge('basicProfile', { starRelayLikes: [] })
    return false
  }
  const likes = await user.starRelayLikes
  if (!likes.includes(Number(challengeId))) {
    return false
  }
  likes.pop(Number(challengeId))
  await api.merge('basicProfile', { starRelayLikes: likes })
  console.log('User likes after:', user)
  return true
}
