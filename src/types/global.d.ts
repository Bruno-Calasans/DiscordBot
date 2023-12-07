import Command from '../base/Command'
import Button from '../base/components/Button'
import StringSelect from '../base/components/Select/StringSelect'
import RoleSelect from '../base/components/Select/RoleSelect'
import ChannelSelect from '../base/components/Select/ChannelSelect'
import UserSelect from '../base/components/Select/UserSelect'
import Modal from '../base/components/Modal'
import Context from '../base/Context'
import {
  SlashCommandBuilder,
  Interaction,
  Collection,
  ClientEvents,
  ModalBuilder,
  ContextMenuCommandBuilder,
} from 'discord.js'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BOT_TOKEN: string
      CLIENT_ID: string
      GUILD_ID: string
    }
  }

  type ComponentBuilder = ComponentBuilder | ModalBuilder
  type Select = StringSelect | RoleSelect | ChannelSelect | UserSelect
  type Components = Button | Select

  interface CustomCommand {
    data: SlashCommandBuilder
    execute: (interaction: Interaction) => unknown
  }

  interface ContextCommand {
    data: ContextMenuCommandBuilder
    execute: (interaction: Interaction) => unknown
  }

  interface Component<Builder extends ComponentBuilder> {
    data: Builder
    execute: (interaction: Interaction) => unknown
  }

  interface IEvent {
    name: keyof ClientEvents
    once?: boolean
    execute: (...args: any[]) => void
  }
}

declare module 'discord.js' {
  export interface BaseClient {
    commands: Collection<string, Command | Context>
    buttons: Collection<string, Button>
    selects: Collection<string, Select>
    modals: Collection<string, Modal>
  }
}

export {}
