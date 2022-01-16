module.exports = {
    name : 'guildMemberAdd',
    execute(member) {
        console.log('User has joined a server');
        const channelId = '930722642271567882';
        const welcomeMessage = `Halo <@${member.id}>! Selamat datang di server!`;
        member.guild.channels.fetch(channelId).then(channel =>{
            channel.send(welcomeMessage)
        });
    },
};