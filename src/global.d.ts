import {
  SlashCommandBuilder,
  Interaction,
  Collection,
  Events,
  Client,
} from 'discord.js'
import Command from './base/Command'
import Button from './base/components/Button'
import StringSelect from './base/components/Select/StringSelect'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string
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
    commands: Collection<string, Command>
    buttons: Collection<string, Button>
    selects: Collection<string, StringSelect>
  }
}

export {}
