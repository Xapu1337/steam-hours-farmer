import {ChatEvent} from "../types/events";
import {CommandType} from "../types/commands";

export default new ChatEvent("friendMessage", async (client, message) => {

    if (!client.configuration.allowedAccounts.includes(message.steamid_friend.accountid)) return;
    console.log(`[${message.steamid_friend.accountid}] ${message.message}`);
    if (!message.message.startsWith(client.configuration.prefix)) return;
    console.log(`[${message.steamid_friend.accountid}] ${message.message}`);

    const args = message.message.slice(client.configuration.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    console.log(client.commands.get(command));
    if (!client.commands.has(command)) return;
    console.log(`[${message.steamid_friend.accountid}] ${message.message}`);

    const cmd: CommandType = client.commands.get(command);

    try {
        console.log(`[${message.steamid_friend.accountid}] ${message.message}`);
        await cmd.run({client, message, args});
    } catch (error) {
        console.error(error);
        await client.chat.sendFriendMessage(message.steamid_friend, 'there was an error trying to execute that command!');
    }
});

