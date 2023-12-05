/* eslint-disable prettier/prettier */
import { Events, Interaction } from 'discord.js'
import DCEvent from '../base/DCEvent'

export default new DCEvent({
  name: Events.InteractionCreate,
  execute: async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) {
      return
    }

    const commmandName = interaction.commandName
    const command = interaction.client.commands.get(commmandName)

    if (!command) {
      await interaction.reply('Command Not Found')
      return
    }

    try {
      await command.execute(interaction)
    } catch (error) {
      await interaction.reply({
        content: 'There was an error while executing this command!',
        ephemeral: true,
      })
    }
  },
})
