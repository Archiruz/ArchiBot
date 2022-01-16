const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js')

const wait = require('util').promisify(setTimeout);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('handhold')
		.setDescription('Send handholding gif'),
	async execute(interaction) {
        const attachment = new MessageAttachment("images/handholding.gif");
        await interaction.deferReply();
        await wait(2000);
        await interaction.editReply({files: [attachment]});
	}
};