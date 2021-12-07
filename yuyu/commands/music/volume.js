const { Command } = require('discord.js-commando');
const db = require('quick.db');

module.exports = class VolumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'volume',
      aliases: ['change-volume', 'v', 'vol'],
      group: 'music',
      memberName: 'volume',
      guildOnly: true,
      description: 'Sesin yüksekliğini ayarlar!',
      throttling: {
        usages: 1,
        duration: 5
      },
      args: [
        {
          key: 'wantedVolume',
          prompt:
            ':loud_sound: Sesi 1 ile 200 arasında ayarlayabilirsin! Lütfen ayarlamak istediğin aralığı yaz!',
          type: 'integer',
          // default: 25,
          validate: function(wantedVolume) {
            return wantedVolume >= 1 && wantedVolume <= 200;
          }
        }
      ]
    });
  }

  run(message, { wantedVolume }) {
    const voiceChannel = message.member.voice.channel;
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
        `:no_entry: Bunu yapman için bot ile aynı kanalda olman gerekli!`
      );
      return;
    }
    const volume = wantedVolume / 100;
    message.guild.musicData.volume = volume;
    db.set(`${message.member.guild.id}.serverSettings.volume`, volume);
    message.guild.musicData.songDispatcher.setVolume(volume);
    message.reply(`:loud_sound: Ses şuna ayarlandı: ${wantedVolume}%!`);
  }
};
