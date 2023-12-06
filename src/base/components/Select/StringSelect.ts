import { StringSelectMenuBuilder, Interaction } from 'discord.js'

export type IStringSelect = Component<StringSelectMenuBuilder>

export default class StringSelect implements IStringSelect {
  public data
  execute: (interation: Interaction) => void
  constructor({ data, execute }: IStringSelect) {
    this.data = data
    this.execute = execute
  }
}
