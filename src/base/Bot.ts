/* eslint-disable @typescript-eslint/no-var-requires */
import { BOT_TOKEN, CLIENT_ID, FOLDERS } from '../config/variables'
import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  REST,
  Routes,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js'
import log from '../helpers/log'
import fileUtils from '../helpers/fileUtils'
import Command from './Command'
import DCEvent from './DCEvent'

export default class Bot {
  public commands = new Collection<string, Command>()
  public events = new Collection<string, DCEvent>()
  // public buttons: ComponentsButton = new Collection()
  // public selects: ComponentsSelect = new Collection()
  // public modals: ComponentsModal = new Collection()
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
    this.client.commands = new Collection<string, Command>()
    this.client.on('ready', () => {
      this.loadCommands()
      this.registerCommands()
      this.loadEvents()
      this.registerEvents()
      this.updateCommands()
    })
    this.client.login(BOT_TOKEN)
  }

  registerCommands() {
    if (!this.client) return
    if (!this.commands) return

    log.warn('Registering commands...')

    for (const [name, command] of this.commands) {
      this.client.commands.set(name, command)
      log.info(`Command "${name}" is registered`)
    }

    log.warn('Commands registered!')
  }

  loadCommands() {
    if (!this.client) return

    log.warn('Loading commands...')

    const commands: Command[] = []
    const commandsFiles = fileUtils.getFiles(FOLDERS.COMMANDS)

    // getting commands from files
    for (const file of commandsFiles) {
      const command = require(file.path).default as Command

      // valid command file
      if (command && command instanceof Command) {
        const commandName = command.data.name

        if (commandName) {
          this.commands.set(commandName, command)
          commands.push(command)
        }

        // adding components
        // if (buttons) buttons.forEach((run, key) => this.buttons.set(key, run))
        // if (selects) selects.forEach((run, key) => this.selects.set(key, run))
        // if (modals) modals.forEach((run, key) => this.modals.set(key, run))

        // adding command to
        commands.push(command)
        log.info(`✅ Command "${commandName}" has been loaded!`)
      } else {
        log.error(`❌ The file "${file.base}" is a invalid command! `)
      }
    }
    log.warn('Commands loaded!')
  }

  loadEvents() {
    log.warn('Loading events...')
    const eventsFiles = fileUtils.getFiles(FOLDERS.EVENTS)

    for (const file of eventsFiles) {
      const event = require(file.path).default as DCEvent

      if (event && event instanceof DCEvent) {
        this.events.set(event.name, event)
        log.info(`Event "${event.name}" has been loaded!`)
      }
    }
    log.warn('Events Loaded.')
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
    log.warn('Events registered!')
  }

  async updateCommands() {
    const rest = new REST({ version: '10' }).setToken(BOT_TOKEN)

    const commandsJson: RESTPostAPIChatInputApplicationCommandsJSONBody[] = []
    for (const command of this.commands.values()) {
      commandsJson.push(command.data.toJSON())
    }

    try {
      log.warn(`Refreshing ${this.commands.size} application (/) commands...`)

      // The put method is used to fully refresh all commands in the guild with the current set
      const data = (await rest.put(
        Routes.applicationCommands(CLIENT_ID),
        // Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        { body: commandsJson },
      )) as any

      log.success(
        `Successfully refreshed ${data.length} application (/) commands.`,
      )
    } catch (error) {
      log.error(error as string)
    }
  }
}
