import { Command } from '../custom-client';

const argsInfo: Command = {
    name: 'args-info',
    description: 'Information about the arguments provided.',
    args: true,
    usage: '[list of args]',
    execute(message, args) {
        if (args[0] === 'foo') {
            return message.channel.send('bar');
        }
        message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
    },
};

module.exports = argsInfo;