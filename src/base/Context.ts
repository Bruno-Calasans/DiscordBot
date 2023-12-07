import { ContextMenuCommandBuilder, Interaction } from 'discord.js'

export default class Context implements ContextCommand {
  public data = new ContextMenuCommandBuilder()
  execute: (interation: Interaction) => void

  constructor({ data, execute }: ContextCommand) {
    this.data = data
    this.execute = execute
  }
}
