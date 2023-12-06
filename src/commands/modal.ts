import Command from '../base/Command'
import { SlashCommandBuilder } from 'discord.js'

export default new Command({
  data: new SlashCommandBuilder()
    .setName('modal')
    .setDescription('Give u a modal'),
  execute: async (interaction) => {
    if (!interaction.isRepliable()) return
    if (!interaction.isChatInputCommand()) return
    const modal = interaction.client.modals.get('register')?.data

    if (!modal) {
      return await interaction.reply('No modal found')
    }

    await interaction.showModal(modal).catch(async () => {
      await interaction.reply('Ops! Something goes wrong :(')
    })
  },
})
