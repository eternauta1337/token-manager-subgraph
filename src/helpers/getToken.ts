
import { Address } from '@graphprotocol/graph-ts'
import { Token } from '../../generated/schema'
import { MiniMeToken as MiniMeTokenContract } from '../../generated/MiniMeToken/MiniMeToken'

export function getToken(tokenAddress: Address): Token {
  let token = Token.load(tokenAddress.toHexString())

  if (!token) {
    token = new Token(tokenAddress.toHexString())

    let tokenContract = MiniMeTokenContract.bind(tokenAddress)

    token.name = tokenContract.name()
    token.address = tokenAddress
    token.symbol = tokenContract.symbol()
    token.totalSupply = tokenContract.totalSupply()
    token.transferable = tokenContract.transfersEnabled()
    token.holders = new Array<string>()

    token.save()
  }

  return token!
}
