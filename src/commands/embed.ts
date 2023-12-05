import Command from '../base/Command'
import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'

export default new Command({
  data: new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Return an embed'),
  execute: async (interaction) => {
    if (!interaction.isRepliable()) return

    const embed = new EmbedBuilder()
      .setTitle('This is a fine embed')
      .setURL('https://discordjs.guide/popular-topics/embeds') //   title's url
      .setColor(0x0099ff) // title's color
      .setDescription('Some description here')
      //   main image
      .setImage(
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbDTCr4r3QL8uevlGKWbvFG4NeaAHk5tmLzvd82fAMp3QBsI6ODj2nRkl3FmaZPqwLoWU&usqp=CAU',
      )
      // right corner image
      .setThumbnail(
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/73790822-f2ce-45aa-bcb9-9f89327637d6/ddee2nm-97d068a7-f542-4503-b717-b5febc12b0a3.png/v1/fill/w_894,h_894/discord_logo___uwu_by_mgs551_ddee2nm-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODk0IiwicGF0aCI6IlwvZlwvNzM3OTA4MjItZjJjZS00NWFhLWJjYjktOWY4OTMyNzYzN2Q2XC9kZGVlMm5tLTk3ZDA2OGE3LWY1NDItNDUwMy1iNzE3LWI1ZmViYzEyYjBhMy5wbmciLCJ3aWR0aCI6Ijw9ODk0In1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.ULmqwZGGeYezZa9cloAeGH-1uTMAR3S4CKCzIblPoPo',
      )
      .setTimestamp(Date.now())
      .addFields(
        // numa linha
        { name: 'Regular field title 1', value: 'Some value here' },
        // espaçamento
        { name: '\u200B', value: '\u200B' },
        // numa mesma linha
        {
          name: 'Inline field title 2',
          value: 'Some value here',
          inline: true,
        },
        {
          name: 'Inline field title 3',
          value: 'Some value here',
          inline: true,
        },
      )
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
        url: 'https://discord.js.org',
      })
      .setFooter({
        text: 'Some footer text here',
        iconURL: 'https://i.imgur.com/AfFp7pu.png',
      })

    await interaction.reply({
      embeds: [embed],
    })
  },
})
