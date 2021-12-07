const { Command } = require('discord.js-commando');

module.exports = class JoinCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'join',
      memberName: 'join',
      aliases: ['summon'],
      group: 'music',
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      description:
        'Admine senin ses kanalında müzik çalıyorken bot summonlamasını sağlar.'
    });
  }

  async run(message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply(':no_entry: Lütfen önce bir ses kanalına giriş yap!');
      return;
    }
    if (message.guild.triviaData.isTriviaRunning == true) {
      message.reply(':x: Lütfen trivia bittikten sonra tekrar deneyin!');
      return;
    }
    if (message.guild.musicData.isPlaying != true) {
      message.reply(':x: Şu anda herhangi bir şarkı çalmıyor!');
      return;
    }
    try {
      await voiceChannel.join();
      return;
    } catch {
      message.reply(
        ':x Kanallar arasında hareket etmeye çalışırken bir şeyler ters gitti'
      );
      return;
    }
  }
};
