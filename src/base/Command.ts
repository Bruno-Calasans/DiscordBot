import { SlashCommandBuilder, Interaction } from 'discord.js'

interface ICommand {
  data: SlashCommandBuilder
  execute: (interation: Interaction) => void
}

export default class Command implements ICommand {
  public data = new SlashCommandBuilder()
  execute(interation: Interaction) {}

  constructor({ data, execute }: ICommand) {
    this.data = data
    this.execute = execute
  }
}
