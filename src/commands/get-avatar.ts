import Context from '../base/Context'
import { ContextMenuCommandBuilder, ApplicationCommandType } from 'discord.js'

export default new Context({
  data: new ContextMenuCommandBuilder()
    .setName('get-avatar')
    .setType(ApplicationCommandType.User),
  execute: async (interaction) => {
    if (!interaction.isRepliable()) {
      return
    }

    if (interaction.isUserContextMenuCommand()) {
      await interaction.reply(interaction.targetUser.displayAvatarURL())
    }
  },
})
