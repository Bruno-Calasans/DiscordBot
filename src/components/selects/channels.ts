import ChannelSelect from '../../base/components/Select/ChannelSelect'
import { ChannelSelectMenuBuilder, ChannelType } from 'discord.js'

export default new ChannelSelect({
  data: new ChannelSelectMenuBuilder()
    .setCustomId('channels')
    .setPlaceholder('Select a Channel')
    .setMinValues(1)
    .setMaxValues(1)
    .setChannelTypes(),
  async execute(interation) {
    if (!interation.isRepliable()) return
    if (interation.isChannelSelectMenu()) {
      const option = interation.values
      await interation.reply(`You selected the channel "${option}".`)
    }
  },
})
