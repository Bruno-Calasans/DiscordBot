import { Client, Events } from 'discord.js'
import DCEvent from '../base/DCEvent'
import log from '../helpers/log'

export default new DCEvent({
  name: Events.ClientReady,
  once: true,
  execute: async (client: Client) => {
    log.info(`Bot "${client.user?.username}" is online!`)
  },
})
