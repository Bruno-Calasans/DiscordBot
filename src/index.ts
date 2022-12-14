/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client, Collection } from 'discord.js'
import { DISCORD_TOKEN } from './config/variables'
import loadhandlers from './functions/loadHandlers'

// Setting Commands Collection

// Initial Setup
const client = new Client({ intents: ['Guilds', 'GuildMessages'] })
client.commands = new Collection()
loadhandlers(client)

client.login(DISCORD_TOKEN)
