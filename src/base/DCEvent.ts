import { ClientEvents } from 'discord.js'

export default class DCEvent implements IEvent {
  public name: keyof ClientEvents = 'debug'
  public once = false
  execute: (...args: any[]) => void

  constructor({ name, once = false, execute }: IEvent) {
    this.name = name
    this.once = once
    this.execute = execute
  }
}
