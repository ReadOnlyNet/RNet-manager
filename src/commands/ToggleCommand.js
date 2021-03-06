'use strict';

const {Command} = require('@rnet.cf/rnet-core');

class ToggleCommand extends Command {
	constructor(...args) {
		super(...args);

		this.aliases      = ['command'];
		this.file         = 'ToggleCommand';
		this.group        = 'Manager';
		this.description  = 'Enable/disable a command';
		this.usage        = 'command [command name]';
		this.permissions  = 'serverAdmin';
		this.overseerEnabled = true;
		this.noDisable    = true;
		this.disableDM    = true;
		this.expectedArgs = 1;
	}

	execute({ message, args, guildConfig }) {
		const command = this.rnet.commands.find(c => c.name.toLowerCase() === args[0]);

		if (!guildConfig) {
			return this.error(message.channel, 'No settings for this server.');
		}

		if (!command) {
			return this.error(message.channel, `I can't find the ${args[0]} command`);
		}

		if (command.noDisable) {
			return this.error(message.channel, `I can't disable the ${args[0]} command`);
		}

		let key = `commands.${args[0]}`;

		guildConfig.commands[command.name] = guildConfig.commands[command.name] || {};

		if (typeof guildConfig.commands[command.name] === 'boolean') {
			guildConfig.commands[command.name] = !guildConfig.commands[command.name];
		} else if (typeof guildConfig.commands[command.name] === 'object') {
			guildConfig.commands[command.name].enabled = !guildConfig.commands[command.name].enabled;
		} else {
			guildConfig.commands[command.name] = true;
		}

		return this.rnet.guilds.update(guildConfig._id, { $set: { [key]: guildConfig.commands[command.name] } })
			.then(() => this.success(message.channel, guildConfig.commands[command.name] ?
				`Enabled ${command.name}` : `Disabled ${command.name}`))
			.catch(() => this.error(message.channel, 'Something went wrong.'));
	}
}

module.exports = ToggleCommand;
