import Command from '../base/Command'
import { SlashCommandBuilder } from 'discord.js'

export default new Command({
  data: new SlashCommandBuilder()
    .setName('first')
    .setDescription('First Command'),
  execute: async (interaction) => {
    if (!interaction.isRepliable()) {
      return
    }
    await interaction.reply(
      `Hiiii, ${interaction.user.tag}. Now, go fuck yourself`,
    )
  },
})
