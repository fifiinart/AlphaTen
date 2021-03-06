// Requirements
const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const keep_alive = require('./keep-alive.js');
let config = require('./config.js');

// Client creation
const client = new Commando.CommandoClient({
  owner: config.owner,
  commandPrefix: config.prefix,
  unknownCommandResponse: false,
  commandEditableDuration: 60
});

// Command/Default Registry
client.registry.registerDefaults()
  .registerGroups([
    ['misc', 'Miscellaneous'],
    ['info', 'Information']
  ])
  .registerCommandsIn(path.join(__dirname, "commands"));

// Events
client.on('ready', async () => {
    console.log(`Alpha Ten v. ${config.version} is logged into ${Array.from(client.guilds).length} guilds and ready to be used.. use "${client.commandPrefix}help".`);
    client.user.setActivity(`${client.commandPrefix}help in ${Array.from(client.guilds).length} guilds`, {
      type: "LISTENING"
    });
    for (let guild of client.guilds.values()) {
      guild.members.get(client.user.id)
        .setNickname(`(${guild.commandPrefix.trim()}) Alpha Ten`)
    }
  })
  .on('commandPrefixChange', async (guild, prefix) => {
    if (guild) guild.member(client.user.id)
      .setNickname(`(${(prefix !== null ? prefix : client.commandPrefix).trim()}) Alpha Ten`)
  })
  .on('guildCreate', guild => {
    client.user.setActivity(`${client.commandPrefix}help in ${Array.from(client.guilds).length} guilds`, {
      type: "LISTENING"
    })

    // Chaos of Stars # announcements-alpha-ten
    client.guilds.get('549078916908843008')
      .channels.get('549092227230466068')
      .send(`**Alpha Ten has joined a server! 🎉🎉🎉**
    *Server Name:* ${guild.name} (${guild.nameAcronym})
    *Sever Owner:* ${guild.owner.user.tag}
    *Time Joined:* ${Date()}
  `)
  })
  .on('guildDelete', guild => {
    client.user.setActivity(`${client.commandPrefix}help in ${Array.from(client.guilds).length} guilds`, {
      type: "LISTENING"
    })

    // Chaos of Stars # announcements-alpha-ten
    client.guilds.get('549078916908843008')
      .channels.get('549092227230466068')
      .send(`**Alpha Ten has left a server! 😔😔😔**
    *Guild Name:* ${guild.name} (${guild.nameAcronym})
    *Guild Owner:* ${guild.owner.user.tag}
    *Time Joined:* ${Date()}
  `)
  });

// Provider settings
client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3'))
    .then(db => new Commando.SQLiteProvider(db))
  )
  .catch(console.error);

keep_alive();
client.login(config.botToken);