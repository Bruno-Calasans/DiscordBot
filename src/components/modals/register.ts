import Modal from '../../base/components/Modal'
import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} from 'discord.js'

const modal = new ModalBuilder().setTitle('Register').setCustomId('register')
const firstRow = new ActionRowBuilder().addComponents(
  new TextInputBuilder()
    .setLabel('Email')
    .setCustomId('email')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('Enter your email')
    .setRequired(),
)

const secondRow = new ActionRowBuilder().addComponents(
  new TextInputBuilder()
    .setLabel('Age')
    .setCustomId('age')
    .setStyle(TextInputStyle.Short)
    .setPlaceholder('Enter your age')
    .setRequired(),
)
modal.addComponents(firstRow as any, secondRow as any)

export default new Modal({
  data: modal,
  async execute(interation) {
    if (!interation.isRepliable()) return

    if (interation.isModalSubmit()) {
      const email = interation.fields.getTextInputValue('email')
      const age = interation.fields.getTextInputValue('age')
      await interation.reply(
        `Hello, ${interation.user.tag}\n 
        You have ben registered with the email "${email}".\n
        You are ${age} years old`,
      )
    }
  },
})
