const { Command } = require('discord.js-commando');

module.exports = class SkipToCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skipto',
      memberName: 'skipto',
      group: 'music',
      description:
        'Sıradaki belirli bir şarkıya atlayın, şarkı numarasını bağımsız değişken olarak sağlayın!',
      guildOnly: true,
      args: [
        {
          key: 'songNumber',
          prompt:
            'Atlamak istediğiniz şarkının sırasındaki numara nedir ?, 1\'den büyük olması gerekir!',
          type: 'integer'
        }
      ]
    });
  }

  run(message, { songNumber }) {
    if (songNumber < 1 && songNumber >= message.guild.musicData.queue.length) {
      message.reply(':x: Lütfen geçerli bir şarkı numarası girin!');
      return;
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply(':no_entry: Lütfen bir ses kanalına katılın ve tekrar deneyin!');
      return;
    }

    if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      message.reply(':x: Şu anda çalan şarkı yok!');
      return;
    } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply(
        `:no_entry: Bunu kullanmak için botla aynı ses kanalında olmalısınız!`
      );
      return;
    }

    if (message.guild.musicData.queue < 1) {
      message.reply(':x: Sırada şarkı yok!');
      return;
    }

    if (!message.guild.musicData.loopQueue) {
      message.guild.musicData.queue.splice(0, songNumber - 1);
      message.guild.musicData.loopSong = false;
      message.guild.musicData.songDispatcher.end();
    } else if (message.guild.musicData.loopQueue) {
      const slicedBefore = message.guild.musicData.queue.slice(
        0,
        songNumber - 1
      );
      const slicedAfter = message.guild.musicData.queue.slice(songNumber - 1);
      message.guild.musicData.queue = slicedAfter.concat(slicedBefore);
      message.guild.musicData.songDispatcher.end();
    }
  }
};
