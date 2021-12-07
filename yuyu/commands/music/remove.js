const { Command } = require('discord.js-commando');

module.exports = class RemoveSongCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'remove',
      memberName: 'remove',
      group: 'music',
      description: 'Sıradan spesifik bir şarkı siler!',
      guildOnly: true,
      args: [
        {
          key: 'songNumber',
          prompt:
            ':wastebasket: Hangi şarkıyı sıradan silmek istersin?(numara olarak)',
          type: 'integer'
        }
      ]
    });
  }
  run(message, { songNumber }) {
    if (songNumber < 1 || songNumber > message.guild.musicData.queue.length) {
      message.reply(':x: Lütfen geçerli bir şarkı numarası gir!');
      return;
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply(':no_entry: Lütfen bir ses kanalına gir ve tekrar dene!');
      return;
    }

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      message.reply(':x: Şu anda herhangi bir şarkı çalmıyor!');
      return;
    } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply(
        `:no_entry: Bunu yapabilmek için bot ile aynı ses kanalında olman gerekli!`
      );
      return;
    }

    message.guild.musicData.queue.splice(songNumber - 1, 1);
    message.reply(
      `:wastebasket: Şu numaradaki şarkı silindi: ${songNumber}!`
    );
  }
};
