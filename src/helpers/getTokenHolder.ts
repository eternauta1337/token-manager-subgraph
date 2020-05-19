import { BigInt, Address } from '@graphprotocol/graph-ts'
import { TokenHolder } from '../../generated/schema'

export function getTokenHolder(holderAddress: Address): TokenHolder | null {
  if (holderAddress == new Address(0)) {
    return null
  }

  let tokenHolderId = 'holderAddress-' + holderAddress.toHexString()

  let tokenHolder = TokenHolder.load(tokenHolderId)

  if (!tokenHolder) {
    tokenHolder = new TokenHolder(tokenHolderId)
    tokenHolder.address = holderAddress
    tokenHolder.balance = new BigInt(0)

    let approvals = new Array<string>()
    tokenHolder.approvals = approvals

    tokenHolder.save()
  }

  return tokenHolder
}
