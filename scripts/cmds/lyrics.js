const axios = require("axios");

module.exports = {
  config: {
    name: 'lyrics',
    version: '2.0',
    author: 'ArYAN',
    role: 0,
    category: 'music',
    longDescription: {
      en: 'Get Songs Lyrics',
    },
    guide: {
      en: '{prefix}lyrics [ Song Name ]',
    },
  },

onStart: async function ({ api, event, args }) {
    const songName = args.join(" ");
    if (!songName) {
      api.sendMessage("⛔ 𝗜𝗻𝘃𝗮𝗹𝗶𝗱 𝗧𝗶𝘁𝗹𝗲\n\n➤ Please provide a song name!", event.threadID, event.messageID);
      return;
    }

    const apiUrl = `https://ai-technology.onrender.com/api/lyrics?songName=${encodeURIComponent(songName)}`;
    try {
      const response = await axios.get(apiUrl);
      const { lyrics, title, artist, image } = response.data;
      if (!lyrics) {
        api.sendMessage("⛔ 𝗡𝗼𝘁 𝗙𝗼𝘂𝗻𝗱\n\n➤ Sorry, lyrics not found, pease provide another song name!", event.threadID, event.messageID);
        return;
      }
      let message = `📌 𝗛𝗘𝗥𝗘 𝗜𝗦 𝗟𝗬𝗥𝗜𝗖𝗦\n\nℹ️ 𝗧𝗶𝘁𝗹𝗲\n➪ ${title}\n✨𝗔𝗿𝘁𝗶𝘀𝘁\n➪ ${artist}\n🎶 𝗟𝘆𝗿𝗶𝗰𝘀\n${lyrics}`;
      let attachment = await global.utils.getStreamFromURL(image);
      api.sendMessage({ body: message, attachment }, event.threadID, (err, info) => {
        let id = info.messageID;
      });
    } catch (error) {
      console.error(error);
      api.sendMessage("⛔ 𝗦𝗲𝗿𝘃𝗲𝗿 𝗘𝗿𝗿𝗼𝗿\n\n➤ Sorry, there was an error getting the lyrics!", event.threadID, event.messageID);
    }
  },
};