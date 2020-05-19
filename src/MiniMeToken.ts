import { ClaimedTokens as ClaimedTokensEvent } from "../generated/MiniMeToken/MiniMeToken"
import { Transfer as TransferEvent } from "../generated/MiniMeToken/MiniMeToken"
import { NewCloneToken as NewCloneTokenEvent } from "../generated/MiniMeToken/MiniMeToken"
import { Approval as ApprovalEvent } from "../generated/MiniMeToken/MiniMeToken"
import getToken from './helpers/getToken'
import getTokenHolder from './helpers/getTokenHolder'

export function handleTransfer(event: TransferEvent): void {
  let tokenAddress = event.address
  let token = _getToken(tokenAddress)

  let transferedAmount = event.params._amount

  let sendingHolder = _getTokenHolder(event.params._from.toHexString())
  let receivingHolder = _getTokenHolder(event.params._to.toHexString())

  sendingHolder.balance = sendingHolder.balance.minus(transferedAmount)
  receivingHolder.balance = receivingHolder.balance.plus(transferedAmount)

  let holders = token.holders
  if (!holders.includes(receivingHolder.id)) {
    holders.push(receivingHolder.id)
    token.holders = holders

    token.save()
  }

  sendingHolder.save()
  receivingHolder.save()
}

export function handleClaimedTokens(event: ClaimedTokensEvent): void {}
export function handleNewCloneToken(event: NewCloneTokenEvent): void {}
export function handleApproval(event: ApprovalEvent): void {}
