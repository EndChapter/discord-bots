const { Command } = require('discord.js-commando');
const PlayCommand = require('./play');

module.exports = class NowPlayingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'nowplaying',
      group: 'music',
      memberName: 'nowplaying',
      aliases: ['np', 'currently-playing', 'now-playing'],
      guildOnly: true,
      description: 'Şu anda çalan şarkıyı gösterir!'
    });
  }

  run(message) {
    if (
      (!message.guild.musicData.isPlaying &&
        !message.guild.musicData.nowPlaying) ||
      message.guild.triviaData.isTriviaRunning
    ) {
      message.reply(':no_entry: Lütfen önce bir ses kanalına giriş yap!');
      return;
    }

    PlayCommand.createResponse(message)
      .setColor('#e9f931')
      .build();
  }
};
