import {Command} from "../../types/structs/Command";

export default new Command({
    name: "setcurrentgame",
    run: async ({client, message, args}) => {
        if (!args || args === []) return client.chat.sendFriendMessage(message.steamid_friend, "Please specify a game.");
        let spaceSeperator = "%space%"
        let games = args.map(game => isNaN(Number(game)) ? game.replace(spaceSeperator, " ") : Number(game))
        client.gamesPlayed(games);
        await client.chat.sendFriendMessage(message.steamid_friend, "Set current game to " + games.join(""));
    }
})
