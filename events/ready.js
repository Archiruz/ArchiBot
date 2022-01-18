module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setPresence({
			activities: [{name: 'stuff', type: 'WATCHING', url: 'https://twitter.com/archiruz'}],
			status: 'online'
		})
        console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};