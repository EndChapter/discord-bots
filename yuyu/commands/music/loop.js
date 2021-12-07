const { Command } = require('discord.js-commando');

module.exports = class LoopCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'loop',
      aliases: [`repeat`],
      group: 'music',
      memberName: 'loop',
      guildOnly: true,
      description: 'Şu anda çalan şarkı için döngü ayarını açar!'
    });
  }

  run(message) {
    if (!message.guild.musicData.isPlaying) {
      message.reply(':x: Şu anda herhangi bir şarkı çalmıyor!');
      return;
    } else if (
      message.guild.musicData.isPlaying &&
      message.guild.triviaData.isTriviaRunning
    ) {
      message.reply(':x: Trivia\'da iken döngüye alamazsın!');
      return;
    } else if (
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    ) {
      message.reply(
        `Bunu yapabilmen için bot ile aynı ses kanalında olman gerek`
      );
      return;
    }

    if (message.guild.musicData.loopSong) {
      message.guild.musicData.loopSong = false;
      message.channel.send(
        `**${message.guild.musicData.nowPlaying.title}** artık döngüye alınmayacak :repeat: `
      );
    } else {
      message.guild.musicData.loopSong = true;
      message.channel.send(
        `**${message.guild.musicData.nowPlaying.title}** artık döngüde :repeat: `
      );
    }
  }
};
