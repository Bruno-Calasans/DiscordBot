import { ButtonBuilder, Interaction } from 'discord.js'

interface IButton {
  data: ButtonBuilder
  execute: (interation: Interaction) => void
}

export default class Button implements IButton {
  public data = new ButtonBuilder()
  execute(interation: Interaction) {}
  constructor({ data, execute }: IButton) {
    this.data = data
    this.execute = execute
  }
}
