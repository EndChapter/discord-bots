const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Youtube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const { youtubeAPI } = require('../../config.json');
let {
  playLiveStreams,
  playVideosLongerThan1Hour,
  maxQueueLength,
  AutomaticallyShuffleYouTubePlaylists
} = require('../../options.json');
const youtube = new Youtube(youtubeAPI);
const db = require('quick.db');
const Pagination = require('discord-paginationembed');

if (typeof playLiveStreams !== 'boolean') playLiveStreams = true;
if (typeof maxQueueLength !== 'number' || maxQueueLength < 1) {
  maxQueueLength = 1000;
}
if (typeof AutomaticallyShuffleYouTubePlaylists !== 'boolean') {
  AutomaticallyShuffleYouTubePlaylists = false;
}
if (typeof playVideosLongerThan1Hour !== 'boolean') {
  playVideosLongerThan1Hour = true;
}

module.exports = class PlayCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'play',
      aliases: ['play-song', 'add', 'p'],
      memberName: 'play',
      group: 'music',
      description: 'Youtube\'dan herhangi bir şarkıyı veya playlisti oynat!',
      guildOnly: true,
      clientPermissions: ['SPEAK', 'CONNECT'],
      throttling: {
        usages: 2,
        duration: 5
      },
      args: [
        {
          key: 'query',
          prompt: ':notes: Hangi şarkı veya playlisti dinlemek istiyorsun? Sonraki mesajında yazarsan bilebilim.',
          type: 'string',
          validate: function(query) {
            return query.length > 0 && query.length < 200;
          }
        }
      ]
    });
  }

  async run(message, { query }) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      message.reply(':no_entry: Lütfen bir ses kanalına gir ve tekrar dene!');
      return;
    }

    if (message.guild.triviaData.isTriviaRunning) {
      message.reply(':x: Lütfen trivia bitikten sonra tekrar dene!');
      return;
    }

    if (!this.isNull(db.get(message.member.id))) {
      const userPlaylists = db.get(message.member.id).savedPlaylists;
      const found = userPlaylists.find(element => element.name == query);
      if (found) {
        const embed = new MessageEmbed()
          .setColor('#ff0000')
          .setTitle(':eyes: Açıklama Lütfen.')
          .setDescription(
            `**${query}** adıyla bir playlistin var, playlisti oynatmak mı istedin youtube'dan sorgu yapmak mı istedin?`
          )
          .addField(':arrow_forward: Playlist', '1. Kayıtlı playlisti oynat')
          .addField(':mag: YouTube', '2. Youtube\'da ara')
          .addField(':x: Cancel', '3. cancel')
          .setFooter('yazarak 1 ile 3 arasında bir sayı belirt.');
        const clarifyEmbed = await message.channel.send({ embed });
        message.channel
          .awaitMessages(msg => msg.content > 0 && msg.content < 4, {
            max: 1,
            time: 30000,
            errors: ['time']
          })
          .then(async function onClarifyResponse(response) {
            const msgContent = response.first().content;
            // Play a saved playlist
            if (msgContent == 1) {
              if (clarifyEmbed) {
                clarifyEmbed.delete();
              }
              const urlsArray =
                userPlaylists[userPlaylists.indexOf(found)].urls;
              if (!urlsArray.length) {
                message.reply(
                  `'${query}' playlist boş, oynatmak için önce şarkı ekle!`
                );
                return;
              }
              urlsArray.map(element =>
                message.guild.musicData.queue.push(element)
              );
              if (message.guild.musicData.isPlaying) {
                // Saved Playlist Added to Queue Message
                PlayCommand.createResponse(message)
                  .addField(
                    'Playlist Eklendi',
                    `:new: **${query}** ${urlsArray.length} şarkı sıraya eklendi!`
                  )
                  .build();
              } else if (!message.guild.musicData.isPlaying) {
                message.guild.musicData.isPlaying = true;
                PlayCommand.playSong(message.guild.musicData.queue, message);
              }
              // Search for the query on YouTube
            } else if (msgContent == 2) {
              await PlayCommand.searchYoutube(query, message, voiceChannel);
              return;
            } else if (msgContent == 3) {
              clarifyEmbed.delete();
              return;
            }
          })
          .catch(function onClarifyError() {
            if (clarifyEmbed) {
              clarifyEmbed.delete();
            }
            return;
          });
        return;
      }
    }

    // Handles playlist Links (if a user entered a YouTube playlist link)
    if (
      query.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)
    ) {
      const playlist = await youtube.getPlaylist(query).catch(function() {
        message.reply(':x: Playlist gizli veya mevcut değil!');
        return;
      });
      const videosArr = await playlist.getVideos().catch(function() {
        message.reply(
          ':x: Playlist\'deki videolardan birini sıraya eklerken bir sorun oluştu!'
        );
        return;
      });

      if (AutomaticallyShuffleYouTubePlaylists) {
        for (let i = videosArr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [videosArr[i], videosArr[j]] = [videosArr[j], videosArr[i]];
        }
      }

      for (let i = 0; i < videosArr.length; i++) {
        // prevent processing of private videos
        if (
          videosArr[i].raw.status.privacyStatus == 'private' ||
          videosArr[i].raw.status.privacyStatus == 'privacyStatusUnspecified'
        ) {
          continue;
        } else {
          try {
            const video = await videosArr[i].fetch();
            if (message.guild.musicData.queue.length < maxQueueLength) {
              message.guild.musicData.queue.push(
                PlayCommand.constructSongObj(
                  video,
                  voiceChannel,
                  message.member.user
                )
              );
            } else {
              message.reply(
                `Şarkı eklemeyi şarkı sırası sınırına ulaşıldığından beri bıraktım: ${maxQueueLength}`
              );
              break;
            }
          } catch (err) {
            return console.error(err);
          }
        }
      }
      if (!message.guild.musicData.isPlaying) {
        message.guild.musicData.isPlaying = true;
        return PlayCommand.playSong(message.guild.musicData.queue, message);
      } else if (message.guild.musicData.isPlaying) {
        const playlistCount =
          message.guild.musicData.queue.length -
          message.guild.musicData.queue.length;
        // Added playlist to queue message
        PlayCommand.createResponse(message)
          .addField(
            'Playlist Eklendi',
            `[${playlist.title}](${playlist.url})
              ,  ${playlistCount} tane şarkı ekledi!`
          )
          .build();
        return;
      }
    }

    // This if statement checks if the user entered a youtube url, it can be any kind of youtube url
    if (
      query.match(/^(http(s)?:\/\/)?(m.)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/)
    ) {
      const id = query
        .replace(/(>|<)/gi, '')
        .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)[2]
        .split(/[^0-9a-z_\-]/i)[0];
      let failedToFetchVideo = false;
      const video = await youtube.getVideoByID(id).catch(function() {
        message.reply(
          ':x: Sağladığın youtube videosunu sıraya eklerken bir sorun oluştu!'
        );
        failedToFetchVideo = true;
      });
      if (failedToFetchVideo) return;
      if (
        video.raw.snippet.liveBroadcastContent === 'live' &&
        !playLiveStreams
      ) {
        message.reply(
          'Canlı yayınlar bu serverda devre dışı bırakıldı! Yönetici ile iletişime geçin.'
        );
        return;
      }

      if (video.duration.hours !== 0 && !playVideosLongerThan1Hour) {
        message.reply(
          '1 saatten uzun videolar bu serverda devre dışı bırakıldı! yönetici ile iletişime geçin.'
        );
        return;
      }

      if (message.guild.musicData.queue.length > maxQueueLength) {
        message.reply(
          `Sıra şu limite ulaştı: ${maxQueueLength}, lütfen biraz bekle`
        );
        return;
      }
      message.guild.musicData.queue.push(
        PlayCommand.constructSongObj(video, voiceChannel, message.member.user)
      );
      if (
        !message.guild.musicData.isPlaying ||
        typeof message.guild.musicData.isPlaying == 'undefined'
      ) {
        message.guild.musicData.isPlaying = true;
        return PlayCommand.playSong(message.guild.musicData.queue, message);
      } else if (message.guild.musicData.isPlaying) {
        // Added song to queue message (link/url)

        PlayCommand.createResponse(message)
          .addField('Sıraya eklendi', `:new: [${video.title}](${video.url})`)
          .build();
        return;
      }
    }

    // if user provided a song/video name
    await PlayCommand.searchYoutube(query, message, voiceChannel);
  }
  isNull = x => (x === null ? true : false);

  static playSong(queue, message) {
    const classThis = this; // use classThis instead of 'this' because of lexical scope below
    if (queue[0].voiceChannel == undefined) {
      // happens when loading a saved playlist
      queue[0].voiceChannel = message.member.voice.channel;
    }
    if (message.guild.me.voice.channel !== null) {
      if (message.guild.me.voice.channel.id !== queue[0].voiceChannel.id) {
        queue[0].voiceChannel = message.guild.me.voice.channel;
      }
    }
    queue[0].voiceChannel
      .join()
      .then(function(connection) {
        const dispatcher = connection
          .play(
            ytdl(queue[0].url, {
              filter: 'audio',
              quality: 'highestaudio',
              highWaterMark: 1 << 25
            })
          )
          .on('start', function() {
            message.guild.musicData.songDispatcher = dispatcher;
            // Volume Settings
            if (!db.get(`${message.guild.id}.serverSettings.volume`)) {
              dispatcher.setVolume(message.guild.musicData.volume);
            } else {
              dispatcher.setVolume(
                db.get(`${message.guild.id}.serverSettings.volume`)
              );
            }

            message.guild.musicData.nowPlaying = queue[0];
            queue.shift();
            // Main Message
            PlayCommand.createResponse(message).build();
          })
          .on('finish', function() {
            // Save the volume when the song ends
            db.set(
              `${message.member.guild.id}.serverSettings.volume`,
              message.guild.musicData.songDispatcher.volume
            );

            queue = message.guild.musicData.queue;
            if (message.guild.musicData.loopSong) {
              queue.unshift(message.guild.musicData.nowPlaying);
            } else if (message.guild.musicData.loopQueue) {
              queue.push(message.guild.musicData.nowPlaying);
            }
            if (queue.length >= 1) {
              classThis.playSong(queue, message);
              return;
            } else {
              message.guild.musicData.isPlaying = false;
              message.guild.musicData.nowPlaying = null;
              message.guild.musicData.songDispatcher = null;
              if (
                message.guild.me.voice.channel &&
                message.guild.musicData.skipTimer
              ) {
                message.guild.me.voice.channel.leave();
                message.guild.musicData.skipTimer = false;
                return;
              }
              if (message.guild.me.voice.channel) {
                setTimeout(function onTimeOut() {
                  if (
                    message.guild.musicData.isPlaying == false &&
                    message.guild.me.voice.channel
                  ) {
                    message.guild.me.voice.channel.leave();
                    message.channel.send(
                      ':zzz: Uzun süre aktivite olmaması sebebi ile kanalı terk ediyorum.'
                    );
                  }
                }, Number.MAX_SAFE_INTEGER);
              }
            }
          })
          .on('error', function(e) {
            message.reply(':x: Şarkıyı oynatamıyorum!');
            console.error(e);
            if (queue.length > 1) {
              queue.shift();
              classThis.playSong(queue, message);
              return;
            }
            message.guild.resetMusicDataOnError();
            if (message.guild.me.voice.channel) {
              message.guild.me.voice.channel.leave();
            }
            return;
          });
      })
      .catch(function() {
        message.reply(':no_entry: Senin kanalına katılmak için iznim yok!');
        message.guild.resetMusicDataOnError();
        if (message.guild.me.voice.channel) {
          message.guild.me.voice.channel.leave();
        }
        return;
      });
  }

  // static createVideosResultsEmbed(namesArray, firstVideo) {
  //   return new MessageEmbed()
  //     .setColor('#ff0000')
  //     .setTitle(`:mag: Search Results!`)
  //     .addField(':notes: Result 1', namesArray[0])
  //     .setURL(firstVideo.url)
  //     .addField(':notes: Result 2', namesArray[1])
  //     .addField(':notes: Result 3', namesArray[2])
  //     .addField(':notes: Result 4', namesArray[3])
  //     .addField(':notes: Result 5', namesArray[4])
  //     .setThumbnail(firstVideo.thumbnails.high.url)
  //     .setFooter('Choose a song by commenting a number between 1 and 5')
  //     .addField(':x: Cancel', 'to cancel ');
  // }

  static async searchYoutube(query, message, voiceChannel) {
    const videos = await youtube.searchVideos(query, 1).catch(async function() {
      await message.reply(
        ':x: İstediğin videoyu ararken bir sorun oluştu!'
      );
      return;
    });
    if (!videos) {
      message.reply(
        `:x: Ne aradığını bulmaya çalışırken sorun yaşıyorum, lütfen daha açık ol.`
      );
      return;
    }
    // if (videos.length < 5) {
    //   message.reply(
    //     `:x: I had some trouble finding what you were looking for, please try again or be more specific.`
    //   );
    //   return;
    // }
    // const vidNameArr = [];
    // for (let i = 0; i < videos.length; i++) {
    //   vidNameArr.push(
    //     `${i + 1}: [${videos[i].title
    //       .replace(/&lt;/g, '<')
    //       .replace(/&gt;/g, '>')
    //       .replace(/&apos;/g, "'")
    //       .replace(/&quot;/g, '"')
    //       .replace(/&amp;/g, '&')
    //       .replace(/&#39;/g, "'")}](${videos[i].shortURL})`
    //   );
    // }
    // vidNameArr.push('cancel');
    // const embed = PlayCommand.createVideosResultsEmbed(vidNameArr, videos[0]);
    // var songEmbed = await message.channel.send({ embed });
    // message.channel
    //   .awaitMessages(
    //     function(msg) {
    //       return (
    //         (msg.content > 0 && msg.content < 6) || msg.content === 'cancel'
    //       );
    //     },
    //     {
    //       max: 1,
    //       time: 60000,
    //       errors: ['time']
    //     }
    //   )
    //   .then(function(response) {
    //     const videoIndex = parseInt(response.first().content);
    //     if (response.first().content === 'cancel') {
    //       songEmbed.delete();
    //       return;
    //     }
    youtube
      .getVideoByID(videos[0].id)
      .then(function(video) {
        // if (
        //   video.raw.snippet.liveBroadcastContent === 'live' &&
        //   !playLiveStreams
        // ) {
        //   songEmbed.delete();
        //   message.reply(
        //     'Live streams are disabled in this server! Contact the owner'
        //   );
        //   return;
        // }

        // if (video.duration.hours !== 0 && !playVideosLongerThan1Hour) {
        //   songEmbed.delete();
        //   message.reply(
        //     'Videos longer than 1 hour are disabled in this server! Contact the owner'
        //   );
        //   return;
        // }

        // if (message.guild.musicData.queue.length > maxQueueLength) {
        //   songEmbed.delete();
        //   message.reply(
        //     `The queue hit its limit of ${maxQueueLength}, please wait a bit before attempting to add more songs`
        //   );
        //   return;
        // }
        message.guild.musicData.queue.push(
          PlayCommand.constructSongObj(video, voiceChannel, message.member.user)
        );
        if (message.guild.musicData.isPlaying == false) {
          message.guild.musicData.isPlaying = true;
          // if (songEmbed) {
          //   songEmbed.delete();
          // }
          PlayCommand.playSong(message.guild.musicData.queue, message);
        } else if (message.guild.musicData.isPlaying == true) {
          // if (songEmbed) {
          //   songEmbed.delete();
          // }
          // Added song to queue message (search)
          PlayCommand.createResponse(message)
            .addField('Sıraya Eklendi', `:new: [${video.title}](${video.url})`)
            .build();
          return;
        }
      })
      .catch(function() {
        // if (songEmbed) {
        //   songEmbed.delete();
        // }
        message.reply(
          ':x: Youtube ID\'sini almaya çalışırken bir sorun oluştu.'
        );
        return;
      });
    // })
    // .catch(function() {
    //   if (songEmbed) {
    //     songEmbed.delete();
    //   }
    //   message.reply(
    //     ':x: Please try again and enter a number between 1 and 5 or cancel.'
    //   );
    //   return;
    // });
  }

  static constructSongObj(video, voiceChannel, user) {
    let duration = this.formatDuration(video.duration);
    if (duration == '00:00') duration = 'Live Stream';
    return {
      url: `https://www.youtube.com/watch?v=${video.raw.id}`,
      title: video.title,
      rawDuration: video.duration,
      duration,
      thumbnail: video.thumbnails.high.url,
      voiceChannel,
      memberDisplayName: user.username,
      memberAvatar: user.avatarURL('webp', false, 16)
    };
  }
  // prettier-ignore
  static formatDuration(durationObj) {
    return `${durationObj.hours ? (durationObj.hours + ':') : ''}${durationObj.minutes ? durationObj.minutes : '00'
      }:${(durationObj.seconds < 10)
        ? ('0' + durationObj.seconds)
        : (durationObj.seconds
          ? durationObj.seconds
          : '00')
      }`;
  }

  // Create Embed Messages
  static createResponse(message) {
    // Builds Member ID Array for buttons
    const channelInfo = message.member.voice.channel.members;
    const rawMembers = Object.fromEntries(channelInfo);
    const memberArray = [Object.keys(rawMembers)];

    const songTitle = `[${message.guild.musicData.nowPlaying.title}](${message.guild.musicData.nowPlaying.url})\n`;

    const embed = new MessageEmbed()
      .setThumbnail(message.guild.musicData.nowPlaying.thumbnail)
      .setColor('#ff0000')
      .addField(
        'Uzunluk',
        ':stopwatch: ' + message.guild.musicData.nowPlaying.duration,
        true
      )
      .addField(
        'Ses',
        ':loud_sound: ' +
          (message.guild.musicData.songDispatcher.volume * 100).toFixed(0) +
          '%',
        true
      )
      .setFooter(
        `${message.guild.musicData.nowPlaying.memberDisplayName} tarafından istendi!`,
        message.guild.musicData.nowPlaying.memberAvatar
      );

    const videoEmbed = new Pagination.Embeds()
      .setArray([embed])
      .setAuthorizedUsers(memberArray[0])
      .setDisabledNavigationEmojis(['all'])
      .setChannel(message.channel)
      .setDeleteOnTimeout(false) // change to true to delete the messages at the end of the song
      .setTimeout(buttonTimer(message))
      .setTitle(embedTitle(message))
      .setDescription(songTitle + PlayCommand.playbackBar(message))
      // Reaction Controls
      .setFunctionEmojis({
        // Volume Down Button
        '🔉': function(_, instance) {
          if (!message.guild.musicData.songDispatcher) return;

          videoEmbed
            .setDescription(songTitle + PlayCommand.playbackBar(message))
            .setTimeout(buttonTimer(message));

          if (message.guild.musicData.songDispatcher.volume > 0) {
            message.guild.musicData.songDispatcher.setVolume(
              message.guild.musicData.songDispatcher.volume - 0.1
            );
            const embed = instance.array[0];
            embed.fields[1].value =
              ':loud_sound: ' +
              (message.guild.musicData.songDispatcher.volume * 100).toFixed(0) +
              '%';
          }
        },
        // Volume Up Button
        '🔊': function(_, instance) {
          if (!message.guild.musicData.songDispatcher) return;

          videoEmbed
            .setDescription(songTitle + PlayCommand.playbackBar(message))
            .setTimeout(buttonTimer(message));

          if (message.guild.musicData.songDispatcher.volume < 2) {
            message.guild.musicData.songDispatcher.setVolume(
              message.guild.musicData.songDispatcher.volume + 0.1
            );
            const embed = instance.array[0];
            embed.fields[1].value =
              ':loud_sound: ' +
              (message.guild.musicData.songDispatcher.volume * 100).toFixed(0) +
              '%';
          }
        },
        // Stop Button
        '⏹️': function() {
          if (!message.guild.musicData.songDispatcher) return;

          videoEmbed
            .setDescription(songTitle + PlayCommand.playbackBar(message))
            .setTitle(':stop_button: Durduruldu')
            .setTimeout(100);

          if (message.guild.musicData.songDispatcher.paused == true) {
            message.guild.musicData.songDispatcher.resume();
            message.guild.musicData.queue.length = 0;
            message.guild.musicData.loopSong = false;
            message.guild.musicData.loopQueue = false;
            message.guild.musicData.skipTimer = true;
            setTimeout(() => {
              message.guild.musicData.songDispatcher.end();
            }, 100);
          } else {
            message.guild.musicData.queue.length = 0;
            message.guild.musicData.skipTimer = true;
            message.guild.musicData.loopSong = false;
            message.guild.musicData.loopQueue = false;
            message.guild.musicData.songDispatcher.end();
          }
          message.reply(`:grey_exclamation: Kanaldan ayrılınıyor.`);
        },
        // Play/Pause Button
        '⏯️': function() {
          if (!message.guild.musicData.songDispatcher) return;

          if (message.guild.musicData.songDispatcher.paused == false) {
            message.guild.musicData.songDispatcher.pause();
            videoEmbed
              .setDescription(songTitle + PlayCommand.playbackBar(message))
              .setTitle(embedTitle())
              .setTimeout(600000);
          } else {
            message.guild.musicData.songDispatcher.resume();

            videoEmbed
              .setDescription(songTitle + PlayCommand.playbackBar(message))
              .setTitle(embedTitle())
              .setTimeout(buttonTimer(message));
          }
        }
      });

    if (message.guild.musicData.queue.length) {
      const songOrSongs = ' Şarkı'; // eslint-disable-line
      videoEmbed
        .addField(
          'Sıra',
          ':notes: ' + message.guild.musicData.queue.length + songOrSongs,
          true
        )
        .addField(
          'Sıradaki Şarkı',
          `:track_next: [${message.guild.musicData.queue[0].title}](${message.guild.musicData.queue[0].url})`
        )
        // Next track Button
        .addFunctionEmoji('⏭️', function() {
          if (!message.guild.musicData.songDispatcher) return;

          videoEmbed
            .setDescription(songTitle + PlayCommand.playbackBar(message))
            .setTitle(':next_track: Geçildi')
            .setTimeout(100);
          if (message.guild.musicData.songDispatcher.paused)
            message.guild.musicData.songDispatcher.resume();
          message.guild.musicData.loopSong = false;
          setTimeout(() => {
            message.guild.musicData.songDispatcher.end();
          }, 100);
        })
        // Repeat One Song Button
        .addFunctionEmoji('🔂', function() {
          if (!message.guild.musicData.songDispatcher) return;

          if (message.guild.musicData.loopSong) {
            message.guild.musicData.loopSong = false;
          } else {
            message.guild.musicData.loopQueue = false;
            message.guild.musicData.loopSong = true;
          }
          videoEmbed
            .setDescription(songTitle + PlayCommand.playbackBar(message))
            .setTitle(embedTitle(message))
            .setTimeout(buttonTimer(message));
        })
        // Repeat Queue Button
        .addFunctionEmoji('🔁', function() {
          if (!message.guild.musicData.songDispatcher) return;

          if (message.guild.musicData.loopQueue)
            message.guild.musicData.loopQueue = false;
          else {
            message.guild.musicData.loopSong = false;
            message.guild.musicData.loopQueue = true;
          }
          videoEmbed
            .setDescription(songTitle + PlayCommand.playbackBar(message))
            .setTitle(embedTitle())
            .setTimeout(buttonTimer(message));
        });
    } else {
      // Repeat One Song Button (when queue is 0)
      videoEmbed.addFunctionEmoji('🔂', function() {
        if (!message.guild.musicData.songDispatcher) return;

        if (message.guild.musicData.loopSong) {
          message.guild.musicData.loopSong = false;
        } else {
          message.guild.musicData.loopQueue = false;
          message.guild.musicData.loopSong = true;
        }
        videoEmbed
          .setDescription(songTitle + PlayCommand.playbackBar(message))
          .setTitle(embedTitle())
          .setTimeout(buttonTimer(message));
      });
    }
    return videoEmbed;

    function buttonTimer(message) {
      const totalDurationObj = message.guild.musicData.nowPlaying.rawDuration;
      let totalDurationInMS = 0;
      Object.keys(totalDurationObj).forEach(function(key) {
        if (key == 'hours') {
          totalDurationInMS =
            totalDurationInMS + totalDurationObj[key] * 3600000;
        } else if (key == 'minutes') {
          totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 60000;
        } else if (key == 'seconds') {
          totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 1000;
        }
      });

      let timer =
        totalDurationInMS - message.guild.musicData.songDispatcher.streamTime;

      // Allow controls to stay for at least 30 seconds
      if (timer < 30000) timer = 30000;

      // Uncomment below for 5 min maximum timer limit
      // if (timer > 300000) timer = 300000;

      // Live Stream timer

      if (totalDurationInMS == 0) timer = 864000000;
      return timer;
    }

    function embedTitle() {
      let embedTitle = ':musical_note: Şimdi Oynatılıyor';
      if (message.guild.musicData.loopQueue)
        embedTitle = embedTitle + ' :repeat: Sırada';
      if (message.guild.musicData.loopSong)
        embedTitle = embedTitle + ' :repeat_one: Şarkı';
      if (message.guild.musicData.songDispatcher.paused)
        embedTitle = ':pause_button: Paused';

      return embedTitle;
    }
  }

  static playbackBar(message) {
    if (message.guild.musicData.nowPlaying.duration == 'Live Stream') {
      return '';
    }

    const passedTimeInMS = message.guild.musicData.songDispatcher.streamTime;
    const passedTimeInMSObj = {
      seconds: Math.floor((passedTimeInMS / 1000) % 60),
      minutes: Math.floor((passedTimeInMS / (1000 * 60)) % 60),
      hours: Math.floor((passedTimeInMS / (1000 * 60 * 60)) % 24)
    };
    const passedTimeFormatted = PlayCommand.formatDuration(passedTimeInMSObj);

    const totalDurationObj = message.guild.musicData.nowPlaying.rawDuration;
    const totalDurationFormatted = PlayCommand.formatDuration(totalDurationObj);

    let totalDurationInMS = 0;
    Object.keys(totalDurationObj).forEach(function(key) {
      if (key == 'hours') {
        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 3600000;
      } else if (key == 'minutes') {
        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 60000;
      } else if (key == 'seconds') {
        totalDurationInMS = totalDurationInMS + totalDurationObj[key] * 1000;
      }
    });
    const playBackBarLocation = Math.round(
      (passedTimeInMS / totalDurationInMS) * 10
    );
    let playBack = '';
    for (let i = 1; i < 12; i++) {
      if (playBackBarLocation == 0) {
        playBack = ':musical_note:▬▬▬▬▬▬▬▬▬▬▬▬';
        break;
      } else if (playBackBarLocation == 10) {
        playBack = '▬▬▬▬▬▬▬▬▬▬▬▬:musical_note:';
        break;
      } else if (i == playBackBarLocation * 2) {
        playBack = playBack + ':musical_note:';
      } else {
        playBack = playBack + '▬';
      }
    }
    playBack = `${passedTimeFormatted}  ${playBack}  ${totalDurationFormatted}`;
    return playBack;
  }
};
