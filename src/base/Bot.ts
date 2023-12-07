/* eslint-disable @typescript-eslint/no-var-requires */
import path from 'path'
import log from '../helpers/log'
import fileUtils from '../helpers/fileUtils'
import Command from './Command'
import DCEvent from './DCEvent'
import Button from './components/Button'
import StringSelect from './components/Select/StringSelect'
import RoleSelect from './components/Select/RoleSelect'
import ChannelSelect from './components/Select/ChannelSelect'
import UserSelect from './components/Select/UserSelect'
import { BOT_TOKEN, CLIENT_ID, FOLDERS, GUILD_ID } from '../config/variables'
import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  REST,
  Routes,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js'
import Modal from './components/Modal'
import Context from './Context'

export default class Bot {
  public client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildMembers,
    ],
    //partial data
    partials: [
      Partials.User,
      Partials.Channel,
      Partials.GuildMember,
      Partials.GuildScheduledEvent,
      Partials.Message,
      Partials.Reaction,
      Partials.ThreadMember,
    ],
  })

  start() {
    this.loadConfigs()
    this.client.login(BOT_TOKEN)
  }

  async loadConfigs() {
    log.debug('Loading settings...\n')
    this.client.commands = new Collection()
    this.client.buttons = new Collection()
    this.client.selects = new Collection()
    this.client.modals = new Collection()
    this.loadCommands()
    this.loadEvents()
    this.loadComponents()
    await this.updateCommands()
    log.debug('\nSettings loaded!')
  }

  loadCommands() {
    log.warn('Loading commands...')

    const commandsFiles = fileUtils.getFiles(FOLDERS.COMMANDS)

    // getting commands from files
    for (const file of commandsFiles) {
      const command = require(file.path).default as unknown

      // valid command file
      if (
        command &&
        (command instanceof Command || command instanceof Context)
      ) {
        const commandName = command.data.name
        this.client.commands.set(commandName, command)
        log.info(`✅ Command "${commandName}" has been loaded`)
      } else {
        log.error(`❌ The file "${file.base}" is a invalid command! `)
      }
    }
    log.success('Commands loaded!\n')
  }

  loadEvents() {
    log.warn('Loading events...')
    const eventsFiles = fileUtils.getFiles(FOLDERS.EVENTS)

    for (const file of eventsFiles) {
      const event = require(file.path).default as DCEvent

      if (event && event instanceof DCEvent) {
        if (event.once) {
          this.client.once(event.name, (...args) => event.execute(...args))
        } else {
          this.client.on(event.name, (...args) => event.execute(...args))
        }
        log.info(`✅ Event "${event.name}" has been loaded`)
      } else {
        log.error(`❌ The file "${file.base}" is a invalid event! `)
      }
    }
    log.success('Events Loaded!\n')
  }

  loadComponents() {
    log.warn('Loading components...')
    const folders = fileUtils.getFolders(FOLDERS.COMPONENTS)

    for (const folder of folders) {
      const componentFolder = path.join(FOLDERS.COMPONENTS, folder)
      const files = fileUtils.getFiles(componentFolder)

      // no files
      if (files.length === 0) continue

      // importing files
      for (const file of files) {
        const component = require(file.path).default as unknown

        if (component && component instanceof Button) {
          this.client.buttons.set(file.name, component)
          log.info(`✅ Button "${file.name}" has been loaded`)
        } else if (
          component &&
          (component instanceof StringSelect ||
            component instanceof RoleSelect ||
            component instanceof ChannelSelect ||
            component instanceof UserSelect)
        ) {
          this.client.selects.set(file.name, component)
          log.info(`✅ Select "${file.name}" has been loaded`)
        } else if (component && component instanceof Modal) {
          this.client.modals.set(file.name, component)
          log.info(`✅ Modal "${file.name}" has been loaded`)
        } else {
          log.error(`❌ The file "${file.base}" is a invalid component! `)
        }
      }
    }

    log.success('Components loaded!\n')
  }

  async updateCommands() {
    const commands = this.client.commands
    log.warn(`Updating ${commands.size} commands...`)

    const rest = new REST({ version: '10' }).setToken(BOT_TOKEN)
    const commandsJson: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []

    for (const command of commands.values()) {
      commandsJson.push(command.data.toJSON() as any)
    }

    try {
      // The put method is used to fully refresh all commands in the guild with the current set
      const data = (await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        {
          body: commandsJson,
        },
      )) as any

      log.success(`Commands updated!`)
    } catch (error) {
      log.error(error as string)
    }
  }
}
