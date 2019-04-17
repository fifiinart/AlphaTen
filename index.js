const Discord = require('discord.js');
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
  console.log(`Logged into ${Array.from(client.guilds).length} guilds and ready to be used.. use "${client.commandPrefix}help".`);
  client.user.setActivity(`${client.commandPrefix}help in ${Array.from(client.guilds).length} guilds`, {
    type: "LISTENING"
  })
});
client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3'))
    .then(db => new Commando.SQLiteProvider(db))
  )
  .catch(console.error);
client.login(process.env.BOT_TOKEN);