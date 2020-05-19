import { BigInt } from '@graphprotocol/graph-ts'
import { ClaimedTokens as ClaimedTokensEvent } from '../generated/MiniMeToken/MiniMeToken'
import { Transfer as TransferEvent } from '../generated/MiniMeToken/MiniMeToken'
import { NewCloneToken as NewCloneTokenEvent } from '../generated/MiniMeToken/MiniMeToken'
import { Approval as ApprovalEvent } from '../generated/MiniMeToken/MiniMeToken'
import { getToken } from './helpers/getToken'
import { getTokenHolder } from './helpers/getTokenHolder'

export function handleTransfer(event: TransferEvent): void {
  let tokenAddress = event.address
  let token = getToken(tokenAddress)

  let transferedAmount = event.params._amount

  let sendingHolder = getTokenHolder(event.params._from)
  if (sendingHolder) {
    sendingHolder.balance = sendingHolder.balance.minus(transferedAmount)
  }

  let receivingHolder = getTokenHolder(event.params._to)
  let receivingHolderPrevBalance = receivingHolder.balance
  if (receivingHolder) {
    receivingHolder.balance = receivingHolder.balance.plus(transferedAmount)

    // If new holder, add to holders array.
    let holders = token.holders
    if (receivingHolderPrevBalance.equals(new BigInt(0)) && !holders.includes(receivingHolder.id)) {
      holders.push(receivingHolder.id)
      token.holders = holders

      token.save()
    }
  }

  sendingHolder.save()
  receivingHolder.save()
}

export function handleClaimedTokens(event: ClaimedTokensEvent): void {}
export function handleNewCloneToken(event: NewCloneTokenEvent): void {}
export function handleApproval(event: ApprovalEvent): void {}
