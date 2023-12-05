import { StringSelectMenuBuilder, Interaction } from 'discord.js'

interface IStringSelect {
  data: StringSelectMenuBuilder
  execute: (interation: Interaction) => void
}

export default class StringSelect implements IStringSelect {
  public data
  execute: (interation: Interaction) => void
  constructor({ data, execute }: IStringSelect) {
    this.data = data
    this.execute = execute
  }
}
