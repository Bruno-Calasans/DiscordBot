import { SlashCommandBuilder, Interaction } from 'discord.js'

export default class Command implements CustomCommand {
  public data = new SlashCommandBuilder()
  execute: (interation: Interaction) => void

  constructor({ data, execute }: CustomCommand) {
    this.data = data
    this.execute = execute
  }
}
