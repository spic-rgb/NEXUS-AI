




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUFoMWtKakUxUkNMZzRNajNVNnRNWlo4bmwxdEpXMVU3dzBSYlRoeG1XOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRGxvT1FTNlNiV3VjU3RFZEpURFNIeCtvd0Q4ZThpV1JwNVlZbDU3VmFXND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2SXduUHBSZldpTXRWT2R4TURjMVJlZXRoM2lMVlI2cERndnNDRzgzRzNJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyWEFXSWtOQy9lY3FpeGNFRFpBZ3hnT20vRlVWY1BLbXY5YUlYbEMwSjJBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9IQUl5a0s0RnhNOWhya0lzMTJ6Z3doUldKVEo1N0w5ZFlRem9NVEVuSFU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ijl1NDM2NGFhdFMzbUVHVDUyUWJ5ZzMxeWN2NU11enplUGlmZHNxVktURTg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0p2NmFORStSY1pDTWZwd1B5UnBpYStvcmpHZ0pVS1pkcXI4YUVEVlMxTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNU1JeXRWUkptdGkxK0gvbDlUSHM3aXcxME80NEFEOG05bDNlMFNZSWQxZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik04TmlTRkxtZ0xLNGJrdXVRTmlON2Q4SlZVUFZwbDEwcFRKemd6QW50MnliZVV3MDJVZEx2ME8wN0xXMFVGL1Z3Z0d4NmNjcEk2RS94VVk5cFJnVENnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MiwiYWR2U2VjcmV0S2V5IjoiMElmTEozd2hHZUxsZEhPZHc5eEVISzY2Y1ZBbENCSjFlU2JOTGgxOStSQT0iLCJwcm9jZXNzZWRIaXN0b3J5TWVzc2FnZXMiOltdLCJuZXh0UHJlS2V5SWQiOjYxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6NjEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sInJlZ2lzdGVyZWQiOnRydWUsInBhaXJpbmdDb2RlIjoiUUxEMVhEWVAiLCJtZSI6eyJpZCI6IjI2MzcxOTQ5NTA2NzoyMUBzLndoYXRzYXBwLm5ldCIsImxpZCI6IjgwMjU2MzEyNTg2Mjg0OjIxQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSlAyMHZvSEVQYk10c0VHR0MwZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoieGNaWStDUDFvc3NZcXVBZmdMNDdSekY0WHJwaHVKbVE1aW05Z21sTitIRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiNVFWMzU5NjRjMGlUWnMzSS9laERSVVIzWnhLcUR6bHlOMHd6MVhsdXlVTGF4eENSUTZYSTAwRlJSck1UMzBlR3o5cUM1d0xhY2RPc3EzaEFTME8yQUE9PSIsImRldmljZVNpZ25hdHVyZSI6InZuS3I4R0RPbFpPSzN1OW5CbEtVUkRxOUVVVlJXYm9sVmF0YzZDNlpQZ3FVek5zcWhyL3huRU95U2RVMnVEY01jY0Y2c3JVNFFiV3liRHFRTElraERBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzE5NDk1MDY3OjIxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNYR1dQZ2o5YUxMR0tyZ0g0QytPMGN4ZUY2NlliaVprT1lwdllKcFRmaHgifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJyb3V0aW5nSW5mbyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNBVUlBZz09In0sImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NzgyMjIxMywibGFzdFByb3BIYXNoIjoiMlAxWWhmIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "254710772666",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "yes",
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
