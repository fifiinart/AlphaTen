const {
  Command
} = require('discord.js-commando');
const {
  RichEmbed
} = require('discord.js');
const config = require('../../config.js')

module.exports = class UserInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'user-info',
      memberName: 'user-info',
      group: 'info',
      aliases: ['useri', 'userinfo'],
      description: 'Gives info about a user.',
      details: "Gives all info about a user.",
      examples: [`${client.commandPrefix}user-info`, `${client.commandPrefix}userinfo user#0000`],
      args: [{
        key: 'user',
        prompt: 'Who do you want to get information on?',
        type: 'user',
        default: msg => msg.author
      }]
    })
  }

  async run(msg, args) {
    let clientUser = this.client.user;
    let status;
    switch (args.user.presence.status) {
      case "online":
        status = "Online";
        break;
      case "idle":
        status = "Idle";
        break;
      case "dnd":
        status = "Do Not Disturb";
        break;
      case "offline":
        status = "Offline";
        break;
    }
    let game;
    if (args.user.presence.game) {
      switch (args.user.presence.game.type) {
        case 0:
          game = `Playing ${args.user.presence.game.toString()}`;
          break;
        case 1:
          game = `Streaming ${args.user.presence.game.toString()} at ${args.user.presence.game.url}`;
          break;
        case 2:
          game = `Listening to ${args.user.presence.game.toString()}`;
          break;
        case 3:
          game = `Watching ${args.user.presence.game.toString()}`;
          break;
      }
    } else {
      game = "No current activity"
    }
    let embed = new RichEmbed({
      "title": `${args.user.username} Info`,
      "author": {
        "name": clientUser.username,
        "icon_url": clientUser.avatarURL
      },
      "color": config.embedColor,
      "timestamp": Date.now(),
      "thumbnail": {
        "url": args.user.avatarURL
      },
      "footer": {
        text: `Requested by ${msg.author.username}`,
        icon_url: msg.author.avatarURL
      },
      "fields": [{
          "name": "Tag",
          "value": args.user.tag,
          "inline": true
        },
        {
          "name": "ID",
          "value": args.user.id,
          "inline": true
        },
        {
          "name": "Presence",
          "value": `Status: ${status}
          Activity: ${game}`,
          "inline": true
        },
        {
          "name": "Type",
          "value": `${args.user.bot ? "Bot" : "User"}`,
          "inline": true
        },
        {
          "name": "Created At",
          "value": `${new Date(args.user.createdTimestamp)}`,
          "inline": true
        }
      ]
    })
    msg.embed(embed)
  }
}