require('dotenv')
  .config();
module.exports = {
  botToken: process.env.BOT_TOKEN,
  embedColor: 0x00FFFF,
  version: require('./package.json')
    .version,
  prefix: 'alpha ',
  owner: ['521817052470575105', '373317798430244864']
}