import { ButtonBuilder, Interaction } from 'discord.js'

export type IButton = Component<ButtonBuilder>

export default class Button implements IButton {
  public data = new ButtonBuilder()
  execute: (interation: Interaction) => void
  constructor({ data, execute }: IButton) {
    this.data = data
    this.execute = execute
  }
}
