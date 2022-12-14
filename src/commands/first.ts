import { SlashCommandBuilder } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
    .setName('first')
    .setDescription('First Command'),

  execute: async (interaction) => {
    if (!interaction.isRepliable()) {
      return
    }
    await interaction.reply('Hello')
  },
} as CustomCommand
