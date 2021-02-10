import { ethers } from 'ethers'
import starRelayJson from '@/truffle/StarRelay'
import { CONTRACT_STATUS } from '@/utils/constants'

// Response and error should all be formatted as
// { status , response }
function handleResponse (response) {
  console.log(response)
  return {
    status: CONTRACT_STATUS.SUCCESS,
    response
  }
}

function handleError (error) {
  console.log(error)
  if (error.message.includes('insufficient funds')) {
    return {
      status: CONTRACT_STATUS.INSUFFICIENT_FUNDS,
      response: error.message
    }
  }
  if (error.message.includes('denied transaction signature')) {
    return {
      status: CONTRACT_STATUS.USER_REJECTED,
      response: error.message
    }
  }
  return {
    status: CONTRACT_STATUS.UNCLASSIFIED_FAILURE,
    response: error.message
  }
}

function getContractAddress (truffleConf, chainId) {
  if (!truffleConf || !chainId) { return '' }
  const { networks } = truffleConf
  if (networks[chainId.toString()]) {
    const address = networks[chainId.toString()].address
    return address || ''
  }
  return ''
}

export const state = () => ({
  contract: null
})

export const getters = {
  starRelayAddress: state =>
    getContractAddress(starRelayJson, state.chainId)
}

export const mutations = {
  setProviderAndSigner (state, { provider, signer }) {
    state.provider = provider
    state.signer = signer
  },
  setContract (state, contract) {
    state.starRelayContract = contract
  }
}

export const actions = {
  // Boostrap
  async bootstrap (vuexStore, web3) {
    const { commit } = vuexStore
    try {
      const provider = new ethers.providers.Web3Provider(web3.currentProvider)
      const signer = provider.getSigner()
      commit('setProviderAndSigner', { provider, signer })
      const chain = await provider.getNetwork()
      const starRelayAddress = getContractAddress(
        starRelayJson,
        chain.chainId
      )
      const starRelay = new ethers.Contract(
        starRelayAddress,
        starRelayJson.abi,
        signer
      )
      commit('setContract', starRelay)
    } catch (e) {
      console.log(e)
    }
  },
  // Start a challenge
  startChallenge (vuexStore, params) {
    const { state } = vuexStore
    const { beneficiary, invitedAddresses, endTimestamp, minEntryFee, ipfsHash } = params
    return state.starRelayContract
      .startChallenge(
        beneficiary,
        invitedAddresses,
        endTimestamp,
        minEntryFee,
        ipfsHash)
      .then(res => handleResponse(res))
      .catch(error => handleError(error))
  }
}
