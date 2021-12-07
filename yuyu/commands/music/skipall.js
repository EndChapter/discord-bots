const { Command } = require('discord.js-commando');

module.exports = class SkipAllCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skipall',
      aliases: ['skip-all'],
      memberName: 'skipall',
      group: 'music',
      description: 'Sıradaki bütün şarkıları geçer!',
      guildOnly: true
    });
  }

  run(message) {
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
        `:no_entry:  Bunu kullanmak için botla aynı ses kanalında olmalısınız!`
      );
      return;
    }
    if (!message.guild.musicData.queue) {
      message.reply(':x: Sırada hiç şarkı yok!');
      return;
    }
    message.guild.musicData.queue.length = 0; // clear queue
    message.guild.musicData.loopSong = false;
    message.guild.musicData.loopQueue = false;
    message.guild.musicData.songDispatcher.end();
    return;
  }
};
