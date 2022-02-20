import {Command} from "../../types/structs/Command";

export default new Command({
    name: "currentgame",
    async run({client, message, args}) {
        let customGames = client.configuration.defaultGame.filter(game => typeof game === "string");
        let games = client.configuration.defaultGame.filter(game => typeof game === "number");
        await client.chat.sendFriendMessage(message.steamid_friend,
            "/pre Custom Games: " +
            (customGames.length === 0
                ? customGames[0]
                : customGames.join(", ")), { containsBbCode: true });

        await client.chat.sendFriendMessage(message.steamid_friend, "/pre Farming hours for:", { containsBbCode: true });

        for (const game1 of games) {
            await client.chat.sendFriendMessage(message.steamid_friend,
                `https://store.steampowered.com/app/${game1}`, { containsBbCode: true });
        }
    }
})
