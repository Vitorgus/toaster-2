module.exports = {
    name: 'ping',
    description: 'Ping!',
    cooldown: 5000,
    execute: message => {
        message.channel.send('🏓 Pong!');
    },
};