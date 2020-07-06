import { Command } from '../../custom-client';

const ping: Command = {
    name: 'ping',
    description: 'Ping!',
    cooldown: 5000,
    execute: message => {
        message.channel.send('🏓 Pong!');
    },
};

module.exports = ping;