import { NewVesting as NewVestingEvent } from '../generated/TokenManager/TokenManager'
import { RevokeVesting as RevokeVestingEvent } from '../generated/TokenManager/TokenManager'
import { ScriptResult as ScriptResultEvent } from '../generated/TokenManager/TokenManager'
import { RecoverToVault as RecoverToVaultEvent } from '../generated/TokenManager/TokenManager'
import { TokenManager as TokenManagerContract } from '../generated/TokenManager/TokenManager'

export function handleNewVesting(event: NewVestingEvent): void {}
export function handleRevokeVesting(event: RevokeVestingEvent): void {}
export function handleScriptResult(event: ScriptResultEvent): void {}
export function handleRecoverToVault(event: RecoverToVaultEvent): void {}
