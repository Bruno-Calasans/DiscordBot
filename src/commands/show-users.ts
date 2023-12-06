import Command from '../base/Command'
import { ActionRowBuilder, SlashCommandBuilder } from 'discord.js'

export default new Command({
  data: new SlashCommandBuilder()
    .setName('show-users')
    .setDescription('Give u a user select'),
  execute: async (interaction) => {
    if (!interaction.isRepliable()) {
      return
    }

    const select = interaction.client.selects.get('users')

    if (!select) {
      return await interaction.reply('No select found')
    }

    const selectRow = new ActionRowBuilder().addComponents(select.data) as any

    await interaction
      .reply({
        components: [selectRow],
      })
      .catch(async () => {
        await interaction.reply('Ops! Something goes wrong :(')
      })
  },
})
