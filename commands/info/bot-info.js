const {
  Command
} = require('discord.js-commando');

const {
  RichEmbed
} = require('discord.js');

const config = require('../../config.js')

class BotInfoCommand extends Command {

  constructor(client) {

    super(client, {
      name: 'bot-info',
      memberName: 'bot-info',
      aliases: ['boti', 'botinfo'],
      group: 'info',
      description: 'Gives bot info.',
      details: 'Gives all info about the bot.',
      clientPermissions: ["MANAGE_MESSAGES"],
      examples: ['alpha botinfo', 'alpha boti']
    })

  }

  run(msg) {
    const clientUser = this.client.user;
    let status;
    switch (clientUser.presence.status) {
      case "online":
        status = "Online";
        break;
      case "offline":
        status = "Offline";
        break;
      case "idle":
        status = "Idle";
        break;
      case "dnd":
        status = "Do Not Disturb";
        break;
    }
    msg.embed(new RichEmbed({
      "title": `${clientUser.username} Info`,
      "author": {
        "name": clientUser.username,
        "icon_url": clientUser.avatarURL
      },
      "color": config.embedColor,
      "timestamp": Date.now(),
      "thumbnail": {
        "url": clientUser.avatarURL
      },
      "footer": {
        text: clientUser.username,
        icon_url: clientUser.avatarURL
      },
      "fields": [{
          name: "General:",
          value: `Tag: ${clientUser.tag}

          Created At: ${clientUser.createdAt}

          Status: ${status}

          ID: ${clientUser.id}

          Prefix: ${this.client.commandPrefix}

          Version: ${config.version}

          Owners: fifiinart#2490, Fellow Hashbrown#7076

          `
        },
        {
          name: "Links:",
          value: `Invite Link: https://discordapp.com/api/oauth2/authorize?client_id=545025725866967050&permissions=0&scope=bot

          Source Code: https://repl.it/@fifiinart/Alpha-Ten-Beta

          Github Repo: https://github.com/fifiinart/AlphaTen
          
          Link to my server: https://discord.gg/JTB4Cq4`
        }
      ]
    }));
  }

}

module.exports = BotInfoCommand;