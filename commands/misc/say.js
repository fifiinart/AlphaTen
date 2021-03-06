const {
  Command
} = require('discord.js-commando');

class SayCommand extends Command {

  constructor(client) {

    super(client, {
      name: 'say',
      memberName: 'say',
      group: 'misc',
      aliases: ['echo', 'repeat'],
      description: 'A command that repeats whatever you say.',
      details: "Make me repeat your wordsmaking it look like I'm a parrot",
      examples: ['alpha say Hello World', 'alpha repeat Who Am I?'],
      guildOnly: true,
      args: [{
        key: 'text',
        prompt: 'What do you wish for me to say?',
        type: 'string'
      }, {
        key: 'channel',
        prompt: 'Where do you want to say it?',
        type: 'channel',
        default: msg => msg.channel
      }]
    })

  }

  run(msg, {
    text,
    channel
  }) {
    channel.send(`${msg.author.toString()} said: \`${text}\``)
  }

}

module.exports = SayCommand;