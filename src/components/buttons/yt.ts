import Button from '../../base/components/Button'
import { ButtonBuilder, ButtonStyle } from 'discord.js'

export default new Button({
  data: new ButtonBuilder()
    .setLabel('Click me')
    .setStyle(ButtonStyle.Primary)
    .setCustomId('yt'),
  async execute(interation) {
    if (!interation.isRepliable()) return
    await interation.reply('Vai à merda, fdp')
  },
})
