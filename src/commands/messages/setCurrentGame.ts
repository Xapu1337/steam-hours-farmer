import {Command} from "../../types/structs/Command";

export default new Command({
    name: "setcurrentgame",
    run: async ({client, message, args}) => {
        if (!args || args == [] || args.length < 0) return client.chat.sendFriendMessage(message.steamid_friend, "Please specify a game.");
        let spaceSeperator = "[S]"
        try {
            // funny thing, abusing var to make it global scope
            var games = JSON.parse(args.join(" ").replace(spaceSeperator, " "));
        } catch (e) {
            console.log(e);
            return client.chat.sendFriendMessage(message.steamid_friend, "Please specify a valid game. (Note that you need to provide type array. (e.g. [\"CS:GO\", 420]))");
        }
        if (!Array.isArray(games) || games.length === 0) return client.chat.sendFriendMessage(message.steamid_friend, "Please specify a game. (Note that you need to provide type array. (e.g. [\"CS:GO\", 420]))");
        client.gamesPlayed(games);
        const game = games.filter(game => typeof game === "number");
        const customGame = games.filter(game => typeof game === "string");
        await client.chat.sendFriendMessage(message.steamid_friend, `Changed games!`);
        await client.chat.sendFriendMessage(message.steamid_friend,
            "/pre Custom Games: " +
            (customGame.length === 0
                ? customGame[0]
                : customGame.join(", ")), { containsBbCode: true });

        await client.chat.sendFriendMessage(message.steamid_friend, "/pre Farming hours for:", { containsBbCode: true });

        for (const game1 of game) {
            await client.chat.sendFriendMessage(message.steamid_friend,
                `https://store.steampowered.com/app/${game1}`, { containsBbCode: true });
        }
    }
})
