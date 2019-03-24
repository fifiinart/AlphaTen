const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const keep_alive = require('./keep-alive.js');
require('dotenv')
  .config();
const client = new Commando.CommandoClient({
  owner: '521817052470575105',
  commandPrefix: 'alpha ',
  unknownCommandResponse: false
});
client.registry.registerDefaults()
  .registerGroups([
    ['misc', 'Miscellaneous']
  ])
  .registerCommandsIn(path.join(__dirname, "commands"));
client.on('ready', () => {
  console.log(`Logged in and ready to be used.. use "${client.commandPrefix}help".`)
});
client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3'))
    .then(db => new Commando.SQLiteProvider(db))
  )
  .catch(console.error);
client.login(process.env.BOT_TOKEN);