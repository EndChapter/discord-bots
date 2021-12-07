const { Command } = require('discord.js-commando');
const db = require('quick.db');

module.exports = class DeletePlaylistCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'delete-playlist',
      group: 'music',
      memberName: 'delete-playlist',
      guildOnly: true,
      description: 'Senin kaydedilmiş playlistlerinden birini siler',
      args: [
        {
          key: 'playlistName',
          prompt: 'Hangi playlisti silmek istersin?',
          type: 'string'
        }
      ]
    });
  }

  run(message, { playlistName }) {
    // check if user has playlists or user is in the db
    const dbUserFetch = db.get(message.member.id);
    if (!dbUserFetch) {
      message.reply('Kaydedilmiş playlist\'in yok!');
      return;
    }
    const savedPlaylistsClone = dbUserFetch.savedPlaylists;
    if (savedPlaylistsClone.length == 0) {
      message.reply('Kaydedilmiş playlist\'in yok!');
      return;
    }

    let found = false;
    let location;
    for (let i = 0; i < savedPlaylistsClone.length; i++) {
      if (savedPlaylistsClone[i].name == playlistName) {
        found = true;
        location = i;
        break;
      }
    }
    if (found) {
      savedPlaylistsClone.splice(location, 1);
      db.set(message.member.id, { savedPlaylists: savedPlaylistsClone });
      message.reply(`**${playlistName}** playlistini kayıtlı playlistlerin arasından sildim!`);
    } else {
      message.reply(`Şu isimle playlistin yok: ${playlistName}`);
    }
  }
};
