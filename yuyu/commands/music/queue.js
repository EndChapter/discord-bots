const { Command } = require('discord.js-commando');
const Pagination = require('discord-paginationembed');

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'queue',
      aliases: ['song-list', 'next-songs', 'q'],
      group: 'music',
      memberName: 'queue',
      guildOnly: true,
      description: 'Şarkı sırasını görüntüler!'
    });
  }

  run(message) {
    if (message.guild.triviaData.isTriviaRunning) {
      message.reply(':x: Trivia bitince tekrar deneyin!');
      return;
    }
    if (message.guild.musicData.queue.length == 0) {
      message.reply(':x: Sırada şarkı yok!');
      return;
    }
    const queueClone = message.guild.musicData.queue;
    const queueEmbed = new Pagination.FieldsEmbed()
      .setArray(queueClone)
      .setAuthorizedUsers([message.author.id])
      .setChannel(message.channel)
      .setElementsPerPage(8)
      .formatField('# - Şarkı', function(e) {
        return `**${queueClone.indexOf(e) + 1}**: [${e.title}](${e.url})`;
      });

    queueEmbed.embed.setColor('#ff7373').setTitle('Müzik sırası');
    queueEmbed.build();
  }
};
