const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Replies with your input!')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The input to echo back')),
    async execute(interaction) {
        const input = interaction.options.getString('input');
        if (input) return await interaction.reply(`${input}`);
        return interaction.reply('No option was provided!');
    }
};
