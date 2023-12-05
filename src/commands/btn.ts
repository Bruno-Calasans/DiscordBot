import Command from '../base/Command'
import {
  ActionRowBuilder,
  ComponentType,
  SlashCommandBuilder,
} from 'discord.js'

export default new Command({
  data: new SlashCommandBuilder()
    .setName('btn')
    .setDescription('Give u a button'),
  execute: async (interaction) => {
    if (!interaction.isRepliable()) {
      return
    }

    const btn = interaction.client.buttons.get('yt')

    if (!btn) {
      return await interaction.reply('No button found')
    }

    const btnRow = new ActionRowBuilder().addComponents(btn.data)

    await interaction
      .reply({
        components: [btnRow as any],
      })
      .catch(async () => {
        await interaction.reply('Ops! Something goes wrong :(')
      })
  },
})
