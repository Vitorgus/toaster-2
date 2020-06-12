import { Command } from '../custom-client';

const user: Command = {
    name: 'user',
    description: 'Display user info',
    execute: message => {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    },
};

module.exports = user;