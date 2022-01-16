const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = []

const commandFolder = './commands';
const commandFiles = fs.readdirSync(commandFolder, (err, files) => {
	if (err) console.error(err);
	let jsfiles = files.filter(f => f.endsWith('.js'));
	if(jsfiles.length <= 0) {
		console.log("No commands to deploy!");
		return;
	}
})

for (const file of commandFiles){
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

// Global command
// rest.put(Routes.applicationCommands(clientId), { body: commands })
// 	.then(() => console.log('Successfully registered to global application commands.'))
// 	.catch(console.error);

// Guild command
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
.then(() => console.log('Successfully registered to guild application commands.'))
.catch(console.error);