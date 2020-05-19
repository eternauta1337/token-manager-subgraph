import { BigInt } from "@graphprotocol/graph-ts"
import {
  Contract,
  NewVesting,
  RevokeVesting,
  ScriptResult,
  RecoverToVault
} from "../generated/Contract/Contract"
import { ExampleEntity } from "../generated/schema"

export function handleNewVesting(event: NewVesting): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.receiver = event.params.receiver
  entity.vestingId = event.params.vestingId

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.hasInitialized(...)
  // - contract.MAX_VESTINGS_PER_ADDRESS(...)
  // - contract.spendableBalanceOf(...)
  // - contract.assignVested(...)
  // - contract.getEVMScriptExecutor(...)
  // - contract.getRecoveryVault(...)
  // - contract.getVesting(...)
  // - contract.onTransfer(...)
  // - contract.transferableBalance(...)
  // - contract.allowRecoverability(...)
  // - contract.appId(...)
  // - contract.ISSUE_ROLE(...)
  // - contract.getInitializationBlock(...)
  // - contract.vestingsLengths(...)
  // - contract.canPerform(...)
  // - contract.getEVMScriptRegistry(...)
  // - contract.ASSIGN_ROLE(...)
  // - contract.BURN_ROLE(...)
  // - contract.canForward(...)
  // - contract.kernel(...)
  // - contract.onApprove(...)
  // - contract.isPetrified(...)
  // - contract.MINT_ROLE(...)
  // - contract.maxAccountTokens(...)
  // - contract.REVOKE_VESTINGS_ROLE(...)
  // - contract.token(...)
  // - contract.isForwarder(...)
}

export function handleRevokeVesting(event: RevokeVesting): void {}

export function handleScriptResult(event: ScriptResult): void {}

export function handleRecoverToVault(event: RecoverToVault): void {}
