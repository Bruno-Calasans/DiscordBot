import { ModalBuilder, Interaction } from 'discord.js'

export type IModal = Component<ModalBuilder>

export default class Modal implements IModal {
  public data = new ModalBuilder()
  execute: (interation: Interaction) => void
  constructor({ data, execute }: IModal) {
    this.data = data
    this.execute = execute
  }
}
