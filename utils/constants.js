// Application constants

// Status of blockchain related functions
const CONTRACT_STATUS = {
  SUCCESS: 'SUCCESS',
  INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS',
  USER_REJECTED: 'USER_REJECTED',
  UNCLASSIFIED_FAILURE: 'UNCLASSIFIED_FAILURE'
}

const CHARITY_LIST = [
  { charity: 'Anti-COVID Foundation', address: '0x6e9D5a362cf5fa2ECcC10a1e241A3D0e3E3f3440' },
  { charity: 'Toronto General Hospital', address: '0x4636e7712d5C6941Ad7Dfa2b205E1c77040c866c' },
  { charity: 'Red Cross Foundation', address: '0x88C77440EE0Eb10f48DacDa297BffC44b4953ead' },
  { charity: 'Lijia\'s laptop for more cool dApps', address: '0x9023F2CBDCFeE8db8044d67B01f77018Cc5944b2' }
]

export { CONTRACT_STATUS, CHARITY_LIST }
