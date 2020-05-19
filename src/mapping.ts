// /// <reference path="../node_modules/assemblyscript/index.d.ts" />
// /// <reference path="../node_modules/@graphprotocol/graph-ts/chain/ethereum.ts" />

// TheGraph APIs.
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
// Entities.
import { Token, TokenHolder, Approval } from "../generated/schema"
// Events.
import { NewVesting as NewVestingEvent } from "../generated/TokenManager/TokenManager"
import { RevokeVesting as RevokeVestingEvent } from "../generated/TokenManager/TokenManager"
import { ScriptResult as ScriptResultEvent } from "../generated/TokenManager/TokenManager"
import { RecoverToVault as RecoverToVaultEvent } from "../generated/TokenManager/TokenManager"
import { ClaimedTokens as ClaimedTokensEvent } from "../generated/MiniMeToken/MiniMeToken"
import { Transfer as TransferEvent } from "../generated/MiniMeToken/MiniMeToken"
import { NewCloneToken as NewCloneTokenEvent } from "../generated/MiniMeToken/MiniMeToken"
import { Approval as ApprovalEvent } from "../generated/MiniMeToken/MiniMeToken"
// Contracts.
import { TokenManager as TokenManagerContract } from "../generated/TokenManager/TokenManager"
import { MiniMeToken as MiniMeTokenContract } from "../generated/MiniMeToken/MiniMeToken"

function _getTokenHolder(holderAddress: string): TokenHolder {
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

export function handleTransfer(event: TransferEvent): void {
  let transferedAmount = event.params._amount

  let sendingHolder = _getTokenHolder(event.params._from.toHexString())
  let receivingHolder = _getTokenHolder(event.params._to.toHexString())

  sendingHolder.balance = sendingHolder.balance.minus(transferedAmount)
  receivingHolder.balance = receivingHolder.balance.plus(transferedAmount)

  sendingHolder.save()
  receivingHolder.save()
}

// Unused handlers (for now).
export function handleClaimedTokens(event: ClaimedTokensEvent): void {}
export function handleNewCloneToken(event: NewCloneTokenEvent): void {}
export function handleApproval(event: ApprovalEvent): void {}
export function handleNewVesting(event: NewVestingEvent): void {}
export function handleRevokeVesting(event: RevokeVestingEvent): void {}
export function handleScriptResult(event: ScriptResultEvent): void {}
export function handleRecoverToVault(event: RecoverToVaultEvent): void {}
