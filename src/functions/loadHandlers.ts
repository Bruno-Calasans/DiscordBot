/* eslint-disable @typescript-eslint/no-var-requires */
import { Client } from 'discord.js'
import { FOLDERS } from '../config/variables'
import getFilesFromFolder from './../helpers/getFilesFromFolder'

export default function loadhandlers(client: Client) {
  const handlersFile = getFilesFromFolder(FOLDERS.HANDLERS)

  for (const file of handlersFile) {
    const handler = require(file.path).default
    handler(client)
  }
}
