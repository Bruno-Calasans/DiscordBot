import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const BASE_PATH = path.join(process.cwd(), 'src')

const FOLDERS = {
  BASE_PATH,
  COMMANDS: path.join(BASE_PATH, 'commands'),
  EVENTS: path.join(BASE_PATH, 'events'),
  COMPONENTS: path.join(BASE_PATH, 'components'),
  CONTEXTS: path.join(BASE_PATH, 'contexts'),
}

const { BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env
export { BOT_TOKEN, CLIENT_ID, GUILD_ID, BASE_PATH, FOLDERS }
