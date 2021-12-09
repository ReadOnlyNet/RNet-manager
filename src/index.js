const { Module } = require('@rnet.cf/rnet-core');
const commands = require('./commands');

/**
 * Manager Module
 * @class Manager
 * @extends Module
 */
class Manager extends Module {
	constructor(...args) {
		super(...args);
		this.module = 'Manager';
		this.friendlyName = 'Manager';
		this.description = 'Adds manager commands to rnet!';
		this.core = true;
		this.list = false;
		this.enabled = true;
		this.hasPartial = false;
		this.commands = commands;
	}

	start() {}
}

exports.Manager = Manager;
