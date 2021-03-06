import { Command } from '../custom-client';

const kick: Command = {
    name: 'kick',
    description: 'Info about kicking a player',
    guildOnly: true,
    execute: message => {
        if (!message.mentions.users.size) {
            return message.reply('you need to tag a user in order to kick them!');
        }
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
    },
};

module.exports = kick;