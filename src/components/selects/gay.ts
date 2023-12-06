import StringSelect from '../../base/components/Select/StringSelect'
import {
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from 'discord.js'

export default new StringSelect({
  data: new StringSelectMenuBuilder()
    .setCustomId('gay')
    .setPlaceholder("___ i'm gay")
    .setMinValues(1)
    .setMaxValues(1)
    .addOptions(
      new StringSelectMenuOptionBuilder().setLabel('Yes').setValue('yes'),
      new StringSelectMenuOptionBuilder().setLabel('No').setValue('no'),
      new StringSelectMenuOptionBuilder().setLabel('Maybe').setValue('maybe'),
      new StringSelectMenuOptionBuilder().setLabel('Blank').setValue('blank'),
    ),
  async execute(interation) {
    if (!interation.isRepliable()) return
    if (interation.isStringSelectMenu()) {
      const option = interation.values[0]
      await interation.reply(`You selected "${option}". I'knew you are gay`)
    }
  },
})
