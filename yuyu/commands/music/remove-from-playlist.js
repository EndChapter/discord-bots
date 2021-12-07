const { Command } = require('discord.js-commando');
const db = require('quick.db');

module.exports = class SaveToPlaylistCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'remove-from-playlist',
      aliases: ['delete-song', 'remove-song'],
      group: 'music',
      memberName: 'remove-from-playlist',
      guildOnly: true,
      description: 'Playlistten bir şarkı siler!',
      args: [
        {
          key: 'playlist',
          prompt: 'Video silmek istediğin playlist nedir??',
          type: 'string'
        },
        {
          key: 'index',
          prompt:
            'Playlistten silmek istediğin videonun index(numarası)i nedir?',
          type: 'string',
          validate: function validateIndex(index) {
            return index > 0;
          }
        }
      ]
    });
  }

  async run(message, { playlist, index }) {
    // check if user has playlists or user is in the db
    const dbUserFetch = db.get(message.member.id);
    if (!dbUserFetch) {
      message.reply('Sıfır kaydedilmiş Playlist\'in var!');
      return;
    }
    const savedPlaylistsClone = dbUserFetch.savedPlaylists;
    if (savedPlaylistsClone.length == 0) {
      message.reply('Sıfır kaydedilmiş Playlist\'in var!');
      return;
    }

    let found = false;
    let location;
    for (let i = 0; i < savedPlaylistsClone.length; i++) {
      if (savedPlaylistsClone[i].name == playlist) {
        found = true;
        location = i;
        break;
      }
    }
    if (found) {
      const urlsArrayClone = savedPlaylistsClone[location].urls;
      if (urlsArrayClone.length == 0) {
        message.reply(`**${playlist}** boş!`);
        return;
      }

      if (index > urlsArrayClone.length) {
        message.reply(
          `The index you provided is larger than the playlist's length`
        );
        return;
      }
      const title = urlsArrayClone[index - 1].title;
      urlsArrayClone.splice(index - 1, 1);
      savedPlaylistsClone[location].urls = urlsArrayClone;
      db.set(message.member.id, { savedPlaylists: savedPlaylistsClone });
      message.reply(
        `**${title}** şarkısını şu listeden sildim: **${savedPlaylistsClone[location].name}**`
      );
      return;
    } else {
      message.reply(`Bu isimle playlist yok: **${playlist}**`);
      return;
    }
  }
};
