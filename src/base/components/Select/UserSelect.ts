import { UserSelectMenuBuilder, Interaction } from 'discord.js'

export type IUserSelect = Component<UserSelectMenuBuilder>

export default class UserSelect implements IUserSelect {
  public data
  execute: (interation: Interaction) => void
  constructor({ data, execute }: IUserSelect) {
    this.data = data
    this.execute = execute
  }
}
