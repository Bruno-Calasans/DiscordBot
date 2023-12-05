/* eslint-disable prettier/prettier */
import { Events, Interaction } from 'discord.js'
import DCEvent from '../base/DCEvent'
import log from '../helpers/log'

export default new DCEvent({
  name: Events.InteractionCreate,
  execute: async (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
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
    }

    if (interaction.isButton()) {
      const buttons = interaction.client.buttons
      const customId = interaction.customId
      const btn = buttons.get(customId)
      console.log(customId)

      if (!btn) return log.error('No button found')

      try {
        btn.execute(interaction)
      } catch (error) {
        log.error(error as string)
      }
    }
  },
})
