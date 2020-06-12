import { Command } from '../custom-client';

const server: Command = {
    name: 'server',
    description: 'Display server info',
    guildOnly: true,
    execute: message => {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
    },
};

module.exports = server;