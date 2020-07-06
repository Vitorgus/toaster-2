import { Client, Collection, Message } from 'discord.js';
import fs = require('fs');

export interface Command {
    name: string;
    description: string;
    aliases?: string[];
    args?: boolean;
    usage?: string;
    guildOnly?: boolean;
    cooldown?: number;
    execute(message: Message, args: string[]): void;
}

export default class CustomClient extends Client {
    constructor(options = {}) {
        super(options);

        const commandDir = fs.readdirSync('./build/commands', { withFileTypes: true });

        const commandFiles = commandDir.filter(file => file.isFile() && file.name.endsWith('.js'));

        const commandFolders = commandDir.filter(folder => folder.isDirectory());

        for (const file of commandFiles) {
            const command = require(`./commands/${file.name}`) as Command;

            // set a new item in the Collection
            // with the key as the command name and the value as the exported module
            this.commands.set(command.name, command);
        }

        for (const folder of commandFolders) {
            const dir = fs.readdirSync(`./build/commands/${folder.name}`, { withFileTypes: true });

            const files = dir.filter(file => file.isFile() && file.name.endsWith('.js'));

            for (const file of files) {
                const command = require(`./commands/${folder.name}/${file.name}`) as Command;

                // same as the previous loop
                this.commands.set(command.name, command);
            }
        }
    }


    commands = new Collection<string, Command>();

    prefix = 'jarvis ';

    getCommand = (commandName: string) => {
        return this.commands.get(commandName)
            || this.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    };
}