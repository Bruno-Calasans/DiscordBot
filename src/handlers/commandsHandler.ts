/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, REST, Routes } from 'discord.js'
import {
  FOLDERS,
  CLIENT_ID,
  GUILD_ID,
  DISCORD_TOKEN,
} from '../config/variables'
import getFilesFromFolder from '../helpers/getFilesFromFolder'

// Load all the commands into client.commands prop
export default async function commandsHandler(client: Client) {
  console.log('Registering commands')

  const commands: string[] = []
  const commandsFiles = getFilesFromFolder(FOLDERS.COMMANDS)

  for (const file of commandsFiles) {
    const command = require(file.path).default

    if (command.data && command.execute) {
      const commandName = command.data.name

      client.commands.set(commandName, command)
      console.log(`Command "${commandName}" has been registered!`)

      commands.push(command.data.toJSON())
    } else {
      console.log(
        `[WARNING] The command at ${file.base} is missing a required "data" or "execute" property.`,
      )
    }
  }

  const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN)

  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    )

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = (await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands },
    )) as any

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`,
    )
  } catch (error) {
    console.error(error)
  }
}
