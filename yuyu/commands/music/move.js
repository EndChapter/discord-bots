const { Command } = require('discord.js-commando');

module.exports = class MoveSongCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'move',
      memberName: 'move',
      aliases: ['m', 'movesong'],
      description: 'Sıra içindeki bir şarkıyı karar verilen yerine taşır!',
      group: 'music',
      guildOnly: true,
      throttling: {
        usages: 1,
        duration: 5
      },
      args: [
        {
          key: 'oldPosition',
          type: 'integer',
          prompt: ':notes: Taşımak istediğin şarkının sıradaki yeri kaç?'
        },
        {
          key: 'newPosition',
          type: 'integer',
          prompt: ':notes: Taşımak istediğin şarkının yeni yeri neresi?'
        }
      ]
    });
  }
  async run(message, { oldPosition, newPosition }) {
    if (
      oldPosition < 1 ||
      oldPosition > message.guild.musicData.queue.length ||
      newPosition < 1 ||
      newPosition > message.guild.musicData.queue.length ||
      oldPosition == newPosition
    ) {
      message.reply(':x: Geçerli bir yer numarası girin ve tekrar deneyin!');
      return;
    }
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply(':no_entry: Lütfen bir sesli kanala girin ve tekrar deneyin!');
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
        `:no_entry: Bunu yapabilmen için bot ile aynı kanalda olman şart!`
      );
      return;
    } else if (message.guild.musicData.loopSong) {
      message.reply(
        ':x: Bunu yapabilmen için **loop** komutunu kapatıp **move** komutunu açmalısın.'
      );
      return;
    }

    const songName = message.guild.musicData.queue[oldPosition - 1].title;

    MoveSongCommand.array_move(
      message.guild.musicData.queue,
      oldPosition - 1,
      newPosition - 1
    );

    message.channel.send(`**${songName}** şarkısı şu pozisyona taşındı: ${newPosition}`);
  }
  // https://stackoverflow.com/a/5306832/9421002
  static array_move(arr, old_index, new_index) {
    while (old_index < 0) {
      old_index += arr.length;
    }
    while (new_index < 0) {
      new_index += arr.length;
    }
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }
};
