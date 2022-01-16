# ArchiBot
My Discord Bot for personal use

# Installing
```terminal
npm install
```

# Setting up
config.json

```json
{
    "clientId": "",
    "guildId":"",
    "token": "",
    "token_telegram" : "",
    "prefix": "",
    "chat_ids" : "",
    "channel_ids" : ""
}
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