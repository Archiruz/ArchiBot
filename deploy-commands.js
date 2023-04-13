require('dotenv').config();
const token = process.env.TOKEN;
const serverIds = process.env.GUILD_IDS.split(",");
const clientId = process.env.CLIENT_ID;

const fs = require('fs');
const { REST, Routes } = require('discord.js');

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

const rest = new REST({ version: '10' }).setToken(token);

// Global command
rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(() => console.log('Successfully registered to global application commands.'))
	.catch(console.error);

// Guild command
// MAKE IT ACCEPT MULTIPLE GUILD IDS
// for(id of serverIds){
// 	rest.put(Routes.applicationGuildCommands(clientId, id), { body: commands })
// 	.then(() => console.log('Successfully registered to guild application commands.'))
// 	.catch(console.error);
// }