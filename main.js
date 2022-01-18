// Read environment variables
require('dotenv').config();
// CLIENT_ID, GUILD_IDS, TOKEN, TOKEN_TELEGRAM, PREFIX, CHAT_IDS, CHANNEL_IDS

// Require the necessary discord.js classes
const fs = require('fs');
const path = require('path');
const download = require('download');
const { Client, Collection, Intents, Message } = require('discord.js');
const { Telegraf } = require('telegraf');
const console = require('console');

const prefix = process.env.PREFIX
const discordChannelIDs = process.env.CHANNEL_IDS.split(",")

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });
const tele = new Telegraf(process.env.TOKEN_TELEGRAM);

client.commands = new Collection();

// Command Handler
const commandFolder = './commands';
const commandFiles = fs.readdirSync(commandFolder, (err, files) => {
	if (err) console.error(err);
	let jsfiles = files.filter(f => f.endsWith('.js'));
	if(jsfiles.length <= 0) {
		console.log("No commands to load!");
		return;
	}
})

for (const file of commandFiles){
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// Event Handler
const eventFolder = './events';
const eventFiles = fs.readdirSync(eventFolder, (err, files) => {
	if (err) console.error(err);
	let jsfiles = files.filter(f => f.endsWith('.js'));
	if (jsfiles.length <= 0) {
		console.log("No events found!");
		return;
	}
})

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

// Interaction Handler
client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({content: 'Error executing this command!', ephemeral: true});
	}
});

// Forwarder
const chatIdsArr = process.env.CHAT_IDS.split(',');
const downloadPath = `./temp`

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendToDiscord(file, caption, filename, deleteFiles){
	if (!caption)
	for(const id of discordChannelIDs) {
		client.channels.cache.get(id).send({
			files:[file]
		})
		.then(console.log(`Sent message to ${client.channels.cache.get(id).name}`))
		.catch(console.error)
	}
	else {
		for(const id of discordChannelIDs) {
			text = caption.match(/(.+)/)[1]
			client.channels.cache.get(id).send({
				content:text,
				files:[file]
			})
			.then(console.log(`Sent message to ${client.channels.cache.get(id).name}`))
			.catch(console.error)
		}
	}
	sleep(10000)
		.then(()=>{deleteFiles(filename)})
		.then(()=>{console.log("File deleted")})
		.catch(console.log)
}

function deleteFiles(filename){
	fs.unlink(`${downloadPath}/${filename}`, (err) => {
		if (err) return console.error
	})
}

tele.on('channel_post', async (ctx) => {
	// Check telegram channel
	const channelUpdate = ctx.channelPost
	console.log("Message detected!")
	try {
		if(chatIdsArr.includes(ctx.chat.id.toString())) {
			const propName = Object.keys(ctx.channelPost);
			if(propName.includes('photo')) {				
				const caption = channelUpdate.caption;
				const fileId = channelUpdate.photo[channelUpdate.photo.length-1].file_id
				ctx.telegram.getFileLink(fileId).then(async file => {
					const fileLink = file.href
					const filePathname = file.pathname
					const filename = filePathname.replace(/^.*[\\\/]/, '')
					await download(fileLink,downloadPath)
						.then(async () => {
							console.log(`${filename} downloaded`)							
						})
						.then(async () => {
							filepath = `./temp/${filename}`
							console.log(`Sending ${filename} to Discord`)
							sendToDiscord(filepath, caption, filename, deleteFiles)
						})
				})
			} else
	
			if(propName.includes('animation')) {
				const caption = channelUpdate.caption;
				const fileId = channelUpdate.animation.file_id
				ctx.telegram.getFileLink(fileId).then(async file => {
					const fileLink = file.href
					const filePathname = file.pathname
					const filename = filePathname.replace(/^.*[\\\/]/, '')
					await download(fileLink,downloadPath)
						.then(async () => {
							console.log(`${filename} downloaded`)							
						})
						.then(async () => {
							filepath = `./temp/${filename}`
							console.log(`Sending ${filename} to Discord`)
							sendToDiscord(filepath, caption, filename, deleteFiles)
						})
				})
			} else
	
			if(propName.includes('video')) {
				const caption = channelUpdate.caption;
				const fileId = channelUpdate.video.file_id
				ctx.telegram.getFileLink(fileId).then(async file => {
					const fileLink = file.href
					const filePathname = file.pathname
					const filename = filePathname.replace(/^.*[\\\/]/, '')
					await download(fileLink,downloadPath)
						.then(async () => {
							console.log(`${filename} downloaded`)							
						})
						.then(async () => {
							filepath = `./temp/${filename}`
							console.log(`Sending ${filename} to Discord`)
							sendToDiscord(filepath, caption, filename, deleteFiles)
						})
				})
			} else {
				console.log('I will not do anything')
			}
		}
	} catch (error) {
		console.error(error)
	}
})

client.on('messageCreate', message => {
	if (message.content === `${prefix}send`){
		message.channel.send('gaung kontol')
	}
})

// Login to Telegram and Discord with your client's token
client.login(process.env.TOKEN);
tele.launch();

// Enable graceful stop
process.once('SIGINT', () => tele.stop('SIGINT'));
process.once('SIGTERM', () => tele.stop('SIGTERM'));

console.log(commandFiles);
console.log(eventFiles);