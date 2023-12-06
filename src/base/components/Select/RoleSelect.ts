import { RoleSelectMenuBuilder, Interaction } from 'discord.js'

export type IRoleSelect = Component<RoleSelectMenuBuilder>

export default class RoleSelect implements IRoleSelect {
  public data
  execute: (interation: Interaction) => void
  constructor({ data, execute }: IRoleSelect) {
    this.data = data
    this.execute = execute
  }
}
