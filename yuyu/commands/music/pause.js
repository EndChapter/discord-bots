const { Command } = require('discord.js-commando');

module.exports = class PauseCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'pause',
      aliases: ['pause-song', 'hold'],
      memberName: 'pause',
      group: 'music',
      description: 'Pause the current playing song!',
      guildOnly: true
    });
  }

  run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply(':no_entry: Lütfen önce bir ses kanalına giriş yap!');
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
        `:no_entry: Bunu yapabilmen için bot ile aynı kanalda olmak zorundasın!`
      );
      return;
    }

    message.reply(
      ':pause_button: Şarkı durduruldu devam ettirmek için resume komutunu kullan!'
    );

    message.guild.musicData.songDispatcher.pause();
  }
};
