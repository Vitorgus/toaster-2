import { Client, Collection, Message } from 'discord.js';
import fs = require('fs');
import path = require("path")

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
    }

    registerCommands(dirPath: string) {
        const pathDir = path.join(__dirname, dirPath);

        const commandDir = fs.readdirSync(pathDir, { withFileTypes: true });

        const commandSubDirs = commandDir.filter(dir => dir.isDirectory());

        const dirList = [
            pathDir,
            ...commandSubDirs.map(dir => path.join(pathDir, dir.name))
        ];

        // console.log(dirList);

        for (const dir of dirList) {
            const readDir = fs.readdirSync(dir, { withFileTypes: true });

            const files = readDir.filter(file => file.isFile() && file.name.endsWith('.js'));

            for (const file of files) {
                const command = require(`${dir}/${file.name}`) as Command;

                // set a new item in the Collection
                // with the key as the command name and the value as the exported module
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