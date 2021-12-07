const { Command } = require('discord.js-commando');

module.exports = class StopMusicTriviaCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'stop-trivia',
      aliases: [
        'stop-music-trivia',
        'skip-trivia',
        'end-trivia',
        'stop-trivia'
      ],
      memberName: 'stop-trivia',
      group: 'music',
      description: 'Müzik trivia\'sını bitirir!',
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT']
    });
  }
  run(message) {
    if (!message.guild.triviaData.isTriviaRunning) {
      message.reply(':x: Şu anda hiçbir quiz çalışmıyor!');
      return;
    }

    if (message.guild.me.voice.channel !== message.member.voice.channel) {
      message.reply(':no_entry: Lütfen bir ses kanalına katılın ve tekrar deneyin!');
      return;
    }

    if (!message.guild.triviaData.triviaScore.has(message.author.username)) {
      message.reply(
        ':stop_sign: Bitirmek için trivia\'ya katılmalısın'
      );
      return;
    }

    message.guild.triviaData.triviaQueue.length = 0;
    message.guild.triviaData.wasTriviaEndCalled = true;
    message.guild.triviaData.triviaScore.clear();
    message.guild.musicData.songDispatcher.end();
    return;
  }
};
