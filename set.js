const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUsvSk5tN0ZObXYwV2JjZU1PSlpMY2p0SFN0V2dvUTcxendreldiUHhVVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTzZLSzdKTjdRVW1uTnZqSzBLY2tJa01DQlRyY3p4bkNxSzdJZFByVCtXMD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJSzJPZ2U4dHd6M2pzbkxjN1pJeXhpdVA3d2UyOUFHRk5xRnNoVHltM1VJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJONXB4WFBOSzF6dG4yeXF6TEZjSnh2YmFlbEc1Q3lsbHJHL3pidWlhZUJZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndBd0phWW9GV0t1SlI0Sy9DNmJXSzRpemtsRktkSkdZUzVXUmU5Qi92bUU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImR2cWhxM2JDTXp5NEYyWGpBeUNzN1NRbEg0NlBCdWF1Y2NYMGdFdjVwQk09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUpLY2lDT3YybVZzU0pVdEdTZlYwRlFzd21rKzV5VmFSV2tWZGhPNFFVST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYTcyTDI5UnRwM1NFZ3B3NVlsTVg5L3NUcU5hSGRiQUpJcCsvVE1XWFhqdz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkhncURDR0NZT0ZWL1ZQR0lSQlcwbjNpTlZZWlJHNTlWNGVYc0lQQWIvTHlEcWRRMkR1VkJpc3VVUWplZkIvQjZ1QUxJVTdaaFUwc0RYN0djMFZ0ZkRRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk4LCJhZHZTZWNyZXRLZXkiOiJ2VXVXTkVta0NBWEtldzBOSDd0ektnZFh6aEhYMVkzU2RSbGd5SnBDYXNVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI3NzgzNTgzMDY4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijg2RTgyMERDNUMzRjVCQkFCOTMyOEU4NkI1OTFCNjE3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTY3NTU4NTN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI3NzgzNTgzMDY4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjRBNEM1OUE3MTM4QkE1QTg1NEE0Njc2OTFGQjkzQTIzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTY3NTU4NTZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjlES1RHQ000IiwibWUiOnsiaWQiOiIyNzc4MzU4MzA2ODo1M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZmB8J2ZjyBCb2ksKkZyYW5rICDwnZmB8J2ZjyDgvIYgIOC8hiDwk4Og8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr8JKQq/CSkKvwkpCr4oGpKiIsImxpZCI6IjU3OTk1NTMwNjQxNTA5OjUzQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSWZSd0tZQkVQYnUxOFVHR0FrZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMlVKeXJSMy8vWTk5dVlFendGZHIrSTdvRlJwSDZLdE9LcXZjVU42ajNGMD0iLCJhY2NvdW50U2lnbmF0dXJlIjoiV3B5UjEreUN5dWhQMXRwc3RFU0FRU2F1UENaa2hPSnVuUEYyTkMweTBKVWlvc1gxOXc4Nm1GbXJZanM0VnU1ZkFWRHJqSnBQNUJNVy9MWHdBZ1hUQkE9PSIsImRldmljZVNpZ25hdHVyZSI6ImR1V09KczRIVHlrWUxDRFdYMC9pWjh2WDYyOWJvQytIZThLRlpZendlN3o3OTdiSHZLdnl1OXdCYWlpNUhEMjhacVlJcmNVc2pPOXk4Ky9iUVdQOERBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc3ODM1ODMwNjg6NTNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZGxDY3EwZC8vMlBmYm1CTThCWGEvaU82QlVhUitpclRpcXIzRkRlbzl4ZCJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU2NzU1ODQ0LCJsYXN0UHJvcEhhc2giOiIyVjc3cVUiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU9vaSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "✩░▒▓▆▅▃▂▁𝐅+𝙁▁▂▃▅▆▓▒░✩    𓆩 ͜• ᭄𓆪 𓆩𓂍𓆪 𓆩𓂍𓆪 ",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "27783583068",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝙁𝙏 Boi,*Frank  𝙁𝙏 ',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/j8v9gs.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    AUDIO_CHATBOT : process.env.AUDIO_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
