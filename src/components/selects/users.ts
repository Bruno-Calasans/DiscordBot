import UserSelect from './../../base/components/Select/UserSelect'
import { UserSelectMenuBuilder } from 'discord.js'

export default new UserSelect({
  data: new UserSelectMenuBuilder()
    .setCustomId('users')
    .setPlaceholder('Select users')
    .setMinValues(1)
    .setMaxValues(2),
  async execute(interation) {
    if (!interation.isRepliable()) return
    if (interation.isUserSelectMenu()) {
      const options = interation.values
      await interation.reply(`You selected the users "${options.join(', ')}".`)
    }
  },
})
