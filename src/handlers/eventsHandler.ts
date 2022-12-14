/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client } from 'discord.js'
import { FOLDERS } from '../config/variables'
import getFilesFromFolder from './../helpers/getFilesFromFolder'

export default function eventsHandler(client: Client) {
  console.log('Registrando Eventos')
  const eventsFiles = getFilesFromFolder(FOLDERS.EVENTS)

  for (const file of eventsFiles) {
    const event = require(file.path).default
    console.log(`Event "${event.name}" has been registered!`)

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args))
    } else {
      client.on(event.name, (...args) => event.execute(...args))
    }
  }
}
