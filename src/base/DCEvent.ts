import { ClientEvents } from 'discord.js'

interface IDCEvent {
  name: keyof ClientEvents
  once?: boolean
  execute: (...args: any[]) => void
}

export default class DCEvent implements IDCEvent {
  public name: keyof ClientEvents = 'debug'
  public once = false
  execute(...args: any[]) {}

  constructor({ name, once = false, execute }: IDCEvent) {
    this.name = name
    this.once = once
    this.execute = execute
  }
}
