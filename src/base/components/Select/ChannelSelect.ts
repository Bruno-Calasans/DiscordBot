import { ChannelSelectMenuBuilder, Interaction } from 'discord.js'

export type IChannelSelect = Component<ChannelSelectMenuBuilder>

export default class ChannelSelect implements IChannelSelect {
  public data
  execute: (interation: Interaction) => void
  constructor({ data, execute }: IChannelSelect) {
    this.data = data
    this.execute = execute
  }
}
