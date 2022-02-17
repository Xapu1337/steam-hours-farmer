import {Command} from "../../types/structs/Command";

export default new Command({
    name: "setCurrentGame",
    run: async ({client, message, args}) => {
        if (!args || args === []) return client.chat.sendFriendMessage(message.steamid_friend, "Please specify a game.");

        client.gamesPlayed(args.map(game => isNaN(Number(game)) ? game : Number(game)));
        await client.chat.sendFriendMessage(message.steamid_friend, "Set current game to " + args.join(", "));
    }
})
