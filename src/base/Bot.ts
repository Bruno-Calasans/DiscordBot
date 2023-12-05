/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  REST,
  Routes,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js'
import { BOT_TOKEN, CLIENT_ID, FOLDERS, GUILD_ID } from '../config/variables'
import log from '../helpers/log'
import fileUtils from '../helpers/fileUtils'
import Command from './Command'
import DCEvent from './DCEvent'
import Button from './components/Button'
import path from 'path'
import StringSelect from './components/Select/StringSelect'

export default class Bot {
  public commands = new Collection<string, Command>()
  public events = new Collection<string, DCEvent>()
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
    log.debug('Setting bot...\n')
    this.client.commands = new Collection<string, Command>()
    this.client.buttons = new Collection<string, Button>()
    this.client.selects = new Collection<string, StringSelect>()
    this.loadCommands()
    this.registerCommands()
    this.loadEvents()
    this.registerEvents()
    this.loadComponents()
    await this.updateCommands()
    log.debug('Settings loaded!')
  }

  registerCommands() {
    if (!this.client) return
    if (!this.commands) return

    log.warn('Registering commands...')

    for (const [name, command] of this.commands) {
      this.client.commands.set(name, command)
      log.info(`Command "${name}" is registered`)
    }

    log.success('Commands registered!\n')
  }

  loadCommands() {
    if (!this.client) return

    log.warn('Loading commands...')

    const commands: Command[] = []
    const commandsFiles = fileUtils.getFiles(FOLDERS.COMMANDS)

    // getting commands from files
    for (const file of commandsFiles) {
      const command = require(file.path).default as unknown

      // valid command file
      if (command && command instanceof Command) {
        const commandName = command.data.name

        if (commandName) {
          this.commands.set(commandName, command)
          commands.push(command)
        }

        // adding command to
        commands.push(command)
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
        this.events.set(event.name, event)
        log.info(`✅ Event "${event.name}" has been loaded`)
      } else {
        log.error(`❌ The file "${file.base}" is a invalid event! `)
      }
    }
    log.success('Events Loaded!\n')
  }

  registerEvents() {
    if (this.events.size === 0) return
    log.warn('Registering events...')
    for (const [name, event] of this.events) {
      log.info(`Event "${name}" is registered`)
      if (event.once) {
        this.client.once(name, (...args) => event.execute(...args))
      } else {
        this.client.on(name, (...args) => event.execute(...args))
      }
    }
    log.success('Events registered!\n')
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
        } else if (component && component instanceof StringSelect) {
          this.client.selects.set(file.name, component)
          log.info(`✅ Select "${file.name}" has been loaded`)
        } else {
          log.error(`❌ The file "${file.base}" is a invalid component! `)
        }
      }
    }

    log.success('Components loaded!\n')
  }

  async updateCommands() {
    log.warn(`Updating ${this.commands.size} application (/) commands...`)

    const rest = new REST({ version: '10' }).setToken(BOT_TOKEN)
    const commandsJson: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []

    for (const command of this.commands.values()) {
      commandsJson.push(command.data.toJSON())
    }

    try {
      // The put method is used to fully refresh all commands in the guild with the current set
      const data = (await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        {
          body: commandsJson,
        },
      )) as any

      log.success(
        `Successfully update ${data.length} application (/) commands.`,
      )
    } catch (error) {
      log.error(error as string)
    }
  }
}
