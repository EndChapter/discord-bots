const { Command } = require('discord.js-commando');

module.exports = class ResumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'resume',
      aliases: ['resume-song', 'continue'],
      memberName: 'resume',
      group: 'music',
      description: 'Durdurulmuş bir şarkıyı devam ettirir!',
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
      message.guild.musicData.songDispatcher === null
    ) {
      message.reply(':x: There is no song playing right now!');
      return;
    } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply(
        `:no_entry: Bunu yapabilmek için bot ile aynı ses kanalında olmak zorundasın!`
      );
      return;
    }

    message.reply(':play_pause: Şarkı Devam Ettirildi!');
    message.guild.musicData.songDispatcher.resume();
  }
};
