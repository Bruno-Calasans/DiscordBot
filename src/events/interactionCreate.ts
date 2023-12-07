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
        return log.error('No command found')
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

      if (!btn) return log.error('No button found')

      try {
        btn.execute(interaction)
      } catch (error) {
        log.error(error as string)
      }
    }

    if (interaction.isAnySelectMenu()) {
      const selects = interaction.client.selects
      const customId = interaction.customId
      const select = selects.get(customId)

      if (!select) return log.error('No select found')

      try {
        select.execute(interaction)
      } catch (error) {
        log.error(error as string)
      }
    }

    if (interaction.isModalSubmit()) {
      const modals = interaction.client.modals
      const customId = interaction.customId
      const modal = modals.get(customId)

      if (!modal) return log.error('No modal found')

      try {
        modal.execute(interaction)
      } catch (error) {
        log.error(error as string)
      }
    }

    if (interaction.isContextMenuCommand()) {
      const ctxCommandName = interaction.commandName
      const ctxCommand = interaction.client.commands.get(ctxCommandName)

      if (!ctxCommand) {
        return log.error('No context command found')
      }

      try {
        await ctxCommand.execute(interaction)
      } catch (error) {
        await interaction.reply({
          content: 'There was an error while executing this context command!',
          ephemeral: true,
        })
      }
    }
  },
})
