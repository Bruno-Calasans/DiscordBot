import { blue, green, red, yellow, white } from 'colors'

export const LOGCOLORS = {
  info: blue,
  warn: yellow,
  success: green,
  error: red,
  debug: white,
} as const

export default {
  info(text: string) {
    console.log(LOGCOLORS.info(text))
  },

  warn(text: string) {
    console.log(LOGCOLORS.warn(text))
  },

  success(text: string) {
    console.log(LOGCOLORS.success(text))
  },

  error(text: string) {
    console.log(LOGCOLORS.error(text))
  },

  debug(text: string) {
    console.log(LOGCOLORS.debug(text))
  },
}
