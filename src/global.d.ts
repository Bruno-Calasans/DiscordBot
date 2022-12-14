import {
  SlashCommandBuilder,
  Interaction,
  Collection,
  Events,
  Client,
} from 'discord.js'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_TOKEN: string
      CLIENT_ID: string
      GUILD_ID: string
    }
  }

  interface CustomCommand {
    data: SlashCommandBuilder
    execute: (interaction: Interaction) => unknown
  }

  interface EventFile {
    name: keyof Events
    once?: boolean
    execute: Client['on'] | Client['once']
  }
}

declare module 'discord.js' {
  export interface BaseClient {
    commands: Collection<string, CustomCommand>
  }
}

export {}
