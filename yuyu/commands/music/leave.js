const { Command } = require('discord.js-commando');

module.exports = class LeaveCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      aliases: ['end', 'stop'],
      group: 'music',
      memberName: 'leave',
      guildOnly: true,
      description: 'Herhangi bir ses kanalından çıkmaya yarar! Tabi bot eğer ses kanalındaysa...'
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply(':no_entry: Bir ses kanalına gir ve tekrar dene!');
      return;
    } else if (
      typeof message.guild.musicData.songDispatcher == 'undefined' ||
      message.guild.musicData.songDispatcher == null
    ) {
      if (
        message.guild.musicData.isPlaying == false &&
        message.guild.me.voice.channel
      ) {
        message.guild.me.voice.channel.leave();
      } else {
        message.reply(':x: Şu anda herhangi bir müzik çalmıyor!');
      }
      return;
    } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply(
        `:no_entry: Bunu yapabilmen için bot ile aynı ses kanalında olman şart!`
      );
      return;
    } else if (message.guild.triviaData.isTriviaRunning) {
      message.reply(
        `Müzik triviasını durdurmak için stop-trivia komutunu kullanman gerek!`
      );
    } else if (!message.guild.musicData.queue) {
      message.reply(':x: Sırada herhangi bir şarkı yok');
      return;
    } else if (message.guild.musicData.songDispatcher.paused) {
      message.guild.musicData.songDispatcher.resume();
      message.guild.musicData.queue.length = 0;
      message.guild.musicData.loopSong = false;
      message.guild.musicData.skipTimer = true;
      setTimeout(() => {
        message.guild.musicData.songDispatcher.end();
      }, 100);
      message.reply(
        `:grey_exclamation: ${this.client.user.username} kanalı terk etti.`
      );
      return;
    } else {
      message.guild.musicData.queue.length = 0;
      message.guild.musicData.skipTimer = true;
      message.guild.musicData.loopSong = false;
      message.guild.musicData.loopQueue = false;
      message.guild.musicData.songDispatcher.end();
      message.reply(
        `:grey_exclamation: ${this.client.user.username} kanalı terk etti.`
      );
      return;
    }
  }
};
