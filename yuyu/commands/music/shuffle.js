const { Command } = require('discord.js-commando');
const Pagination = require('discord-paginationembed');

module.exports = class ShuffleQueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'shuffle',
      memberName: 'shuffle',
      group: 'music',
      description: 'Şarkı sırasını karıştırır!',
      guildOnly: true
    });
  }
  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply(':no_entry: Lütfen bir ses kanalına girin ve tekrar deneyin!');
      return;
    }

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      message.reply(':x: Şu anda hiç bir müzik oynatılmıyor!');
      return;
    } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply(
        `:no_entry: Bunu kullanmak için botla aynı ses kanalında olmalısınız!`
      );
      return;
    } else if (message.guild.musicData.loopSong) {
      message.reply(
        ':x:  **shuffle** komutu kullanılmadan önce **loop** komutu kapatılmalı!'
      );
      return;
    }
    if (message.guild.musicData.queue.length < 1) {
      message.reply(':x: Sırada şarkı yok!');
      return;
    }

    shuffleQueue(message.guild.musicData.queue);

    const queueClone = message.guild.musicData.queue;
    const queueEmbed = new Pagination.FieldsEmbed()
      .setArray(queueClone)
      .setAuthorizedUsers([message.author.id])
      .setChannel(message.channel)
      .setElementsPerPage(10)
      .formatField('# - Şarkı', function(e) {
        return `**${queueClone.indexOf(e) + 1}**: ${e.title}`;
      });

    queueEmbed.embed
      .setColor('#ff7373')
      .setTitle(':twisted_rightwards_arrows: Yeni Müzik Sırası!');
    queueEmbed.build();
  }
};

function shuffleQueue(queue) {
  for (let i = queue.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [queue[i], queue[j]] = [queue[j], queue[i]];
  }
}
