import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const BASE_PATH = path.join(process.cwd(), 'src')

const FOLDERS = {
  COMMANDS: path.join(BASE_PATH, 'commands'),
  EVENTS: path.join(BASE_PATH, 'events'),
  HANDLERS: path.join(BASE_PATH, 'handlers'),
}

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env
export { DISCORD_TOKEN, CLIENT_ID, GUILD_ID, BASE_PATH, FOLDERS }
