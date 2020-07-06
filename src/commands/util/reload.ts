import CustomClient, { Command } from '../../custom-client';

const reload: Command = {
    name: 'reload',
    description: 'Reloads a command',
    args: true,
    execute: (message, args) => {
        const client = message.client as CustomClient;
        const commandName = args[0].toLowerCase();
        const command = client.getCommand(commandName);

        if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

        delete require.cache[require.resolve(`./${command.name}.js`)];

        try {
            const newCommand = require(`./${command.name}.js`) as Command;
            client.commands.set(newCommand.name, newCommand);
            message.channel.send(`Command \`${command.name}\` was reloaded!`);
        }
        catch (error) {
            console.log(error);
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            message.channel.send(`There was an error while reloading a command \`${command.name}\`:\n\`${error.message}\``);
        }

    },
};

module.exports = reload;