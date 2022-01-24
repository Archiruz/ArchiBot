# ArchiBot
My Discord Bot for personal use

# Installing
```terminal
npm install
```

# Setting up
.env

```
CLIENT_ID=454756873457578456467
GUILD_IDS=35683456557585,564575683546,2453677647
TOKEN=Enter.YourDiscord.TokenHere
TOKEN_TELEGRAM=Enter:Your-TelegramTokenHere
PREFIX=cok
CHAT_IDS=-1003535634524,-100542346246245,-1002456345442
CHANNEL_IDS=384138050123570
```

deploy slash command by
```terminal
node deploy-commands.js
```

delete slash commands by
```terminal
node delete-commands.js
```
Make sure it's set to global or guild in ``config.json``