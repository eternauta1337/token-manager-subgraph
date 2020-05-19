// TheGraph APIs.
import { BigInt, Address, log } from "@graphprotocol/graph-ts"

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

function _getToken(tokenAddress: Address): Token {
  let token = Token.load(tokenAddress.toHexString())

  if (!token) {
    token = new Token(tokenAddress.toHexString())

    let tokenContract = MiniMeTokenContract.bind(tokenAddress)

    token.name = tokenContract.name()
    token.symbol = tokenContract.symbol()
    token.totalSupply = tokenContract.totalSupply()
    token.transferable = tokenContract.transfersEnabled()
    token.holders = new Array<string>()

    token.save()
  }

  return token!
}

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
export function handleNewVesting(event: NewVestingEvent): void {}
export function handleRevokeVesting(event: RevokeVestingEvent): void {}
export function handleScriptResult(event: ScriptResultEvent): void {}
export function handleRecoverToVault(event: RecoverToVaultEvent): void {}
