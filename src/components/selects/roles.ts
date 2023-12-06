import RoleSelect from '../../base/components/Select/RoleSelect'
import { RoleSelectMenuBuilder } from 'discord.js'

export default new RoleSelect({
  data: new RoleSelectMenuBuilder()
    .setCustomId('roles')
    .setPlaceholder('Select a Role')
    .setMinValues(1)
    .setMaxValues(1),
  async execute(interation) {
    if (!interation.isRepliable()) return
    if (interation.isRoleSelectMenu()) {
      const option = interation.values
      await interation.reply(`You selected the role "${option}".`)
    }
  },
})
