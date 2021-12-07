const { Command } = require('discord.js-commando');
const { prefix } = require('../../config.json');

module.exports = class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'skip',
      aliases: ['skip-song', 'advance-song', 'next'],
      memberName: 'skip',
      group: 'music',
      description: 'Şu an çalan şarkıdan sonraki şarkıya geçer!',
      guildOnly: true
    });
  }

  run(message) {
    const voiceChannel = message.member.voice.channel;
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
    } else if (message.guild.triviaData.isTriviaRunning) {
      message.reply(`Trivia'yı geçemezsiniz! ${prefix}end-trivia kullanın`);
      return;
    }
    message.guild.musicData.loopSong = false;
    message.guild.musicData.songDispatcher.end();
  }
};
