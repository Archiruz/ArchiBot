require('dotenv').config();

const { REST, Routes } = require('discord.js')

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_IDS.split(",");
    
const rest = new REST({ version: '10' }).setToken(token);

// Uncomment these for deleting individual commands
// for guild-based commands
// rest.delete(Routes.applicationGuildCommand(clientId, guildId, 'commandId'))
// 	.then(() => console.log('Successfully deleted guild command'))
// 	.catch(console.error);

// // for global commands
// rest.delete(Routes.applicationCommand(clientId, 'commandId'))
// 	.then(() => console.log('Successfully deleted application command'))
// 	.catch(console.error);

// Delete all commands (untested official code)
// for guild-based commands
// rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
// 	.then(() => console.log('Successfully deleted all guild commands.'))
// 	.catch(console.error);

// // for global commands
// rest.put(Routes.applicationCommands(clientId), { body: [] })
// 	.then(() => console.log('Successfully deleted all application commands.'))
// 	.catch(console.error);

// Old way of deleting all commands
for(id in guildId){
    rest.get(Routes.applicationGuildCommands(clientId, id))
        .then(data => {
            const promises = [];
            for (const command of data) {
                const deleteUrl = `${Routes.applicationGuildCommands(clientId, id)}/${command.id}`;
                promises.push(rest.delete(deleteUrl));
            }
            return Promise.all(promises);
        });
}

