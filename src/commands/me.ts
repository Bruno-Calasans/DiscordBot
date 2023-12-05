import Command from '../base/Command'
import { SlashCommandBuilder } from 'discord.js'

export default new Command({
  data: new SlashCommandBuilder().setName('me').setDescription('Talk about me'),
  execute: async (interaction) => {
    if (!interaction.isRepliable()) {
      return
    }
    const user = interaction.user
    await interaction.reply(
      `Hello, ${user.username}. You joined at Discord at ${user.createdAt}`,
    )
  },
})
