import { Client, Events } from 'discord.js'

export default {
  name: Events.ClientReady,
  once: true,
  execute: async (client: Client) => {
    console.log(`Bot "${client.user?.username}" is online!`)
  },
}
