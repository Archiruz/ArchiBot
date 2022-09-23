# ArchiBot
My shitty personal discord bot with personal Telegram to Discord forward feature  
Very experimental, expect bad code structure and broken stuff idk

## Installing
```terminal
npm install
```

## Setting up
### .env options
```
CLIENT_ID=454756873457578456467
GUILD_IDS=35683456557585,564575683546,2453677647
TOKEN=Enter.YourDiscord.TokenHere
TOKEN_TELEGRAM=Enter:Your-TelegramTokenHere
PREFIX=cok
CHAT_IDS=-1003535634524,-100542346246245,-1002456345442
CHANNEL_IDS=384138050123570
INVITE_LINKS=www.google.com
```
Invite links option is optional and it currently only supports one link 

### Deploying slash command
```terminal
node deploy-commands.js
```
Slash commands are deployed in specified guild IDs in ```.env``` by default  
You can change it so they are deployed globally by uncommenting some lines in that file

### Deleting slash commands
```terminal
node delete-commands.js
```


## License
ArchiBot is licensed under [GNU General Public License v3.0](https://www.gnu.org/licenses/gpl-3.0-standalone.html)