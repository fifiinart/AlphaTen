const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const keep_alive = require('./keep-alive.js');
let config = require('./config.js');
const client = new Commando.CommandoClient({
  owner: config.owner,
  commandPrefix: config.prefix,
  unknownCommandResponse: false
});
client.registry.registerDefaults()
  .registerGroups([
    ['misc', 'Miscellaneous']
  ])
  .registerCommandsIn(path.join(__dirname, "commands"));
client.on('ready', () => {
  console.log(`Alpha Ten Beta v. ${config.version} is logged into ${Array.from(client.guilds).length} guilds and ready to be used.. use "${client.commandPrefix}help".`);
  client.user.setActivity(`${client.commandPrefix}help in ${Array.from(client.guilds).length} guilds`, {
    type: "LISTENING"
  });
});
client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3'))
    .then(db => new Commando.SQLiteProvider(db))
  )
  .catch(console.error);
client.login(config.botToken);