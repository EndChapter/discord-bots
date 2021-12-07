const { Command } = require('discord.js-commando');

module.exports = class LoopQueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'loopqueue',
      memberName: 'loopqueue',
      aliases: ['loop-queue', 'queue-loop'],
      group: 'music',
      description: 'Sıranın x kere döngüye girmesini sağlar! - (Varsayılan olarak 1 defa)',
      guildOnly: true,
      args: [
        {
          key: 'numOfTimesToLoop',
          default: 1,
          type: 'integer',
          prompt: 'Sıranın kaç kere döngüye girmesini istersiniz?'
        }
      ]
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
      message.reply(':x: Şarkı trivisındayken döngüye giremezsiniz!');
      return;
    } else if (
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    ) {
      message.reply(
        `:no_entry: Bunu yapabilmen için bot ile aynı ses kanalında olman gerek!`
      );
      return;
    } else if (message.guild.musicData.queue.length == 0) {
      message.reply(`:x: Boş bir sıra döngüye giremez!`);
      return;
    } else if (message.guild.musicData.loopSong) {
      message.reply(
        ':x: Sırayı döngüye koy özelliğini kullanmak için **loop** komutunu kapamalısınız!'
      );
      return;
    }

    if (message.guild.musicData.loopQueue) {
      message.guild.musicData.loopQueue = false;
      message.channel.send(
        ':repeat: Sıra artık döngüye girmiyor!'
      );
    } else {
      message.guild.musicData.loopQueue = true;
      message.channel.send(':repeat: Sıra artık döngüye giriyor!');
    }
  }
};
