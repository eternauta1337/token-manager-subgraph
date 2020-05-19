import { BigInt } from "@graphprotocol/graph-ts"
import { TokenHolder } from "../../generated/schema"

export default function _getTokenHolder(holderAddress: string): TokenHolder {
  let tokenHolderId = 'holderAddress-' + holderAddress

  let tokenHolder = TokenHolder.load(tokenHolderId)

  if (!tokenHolder) {
    tokenHolder = new TokenHolder(tokenHolderId)
    tokenHolder.balance = new BigInt(0)

    let approvals = new Array<string>()
    tokenHolder.approvals = approvals

    tokenHolder.save()
  }

  return tokenHolder!
}
