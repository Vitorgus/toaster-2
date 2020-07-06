import CustomClient, { Command } from '../../custom-client';

const help: Command = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5000,
    execute: (message, args) => {
        const client = message.client as CustomClient;
        const prefix = client.prefix;
        const data = [];
        // const { commands, getCommand } = client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(client.commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = client.getCommand(name);

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        data.push(`**Cooldown:** ${command.cooldown ? (command.cooldown / 1000).toFixed(1) : '3.0'} second(s)`);

        message.channel.send(data, { split: true });

    },
};

module.exports = help;
