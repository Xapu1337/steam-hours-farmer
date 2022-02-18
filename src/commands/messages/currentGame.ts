import {Command} from "../../types/structs/Command";

export default new Command({
    name: "currentgame",
    async run({client, message, args}) {
        await client.chat.sendFriendMessage(message.steamid_friend,
            `Custom games: ${client.configuration.defaultGame.filter(game => typeof game === "string").join(", ")}
             games: ${client.configuration.defaultGame.filter(game => typeof game === "number").join(", ")}`);
    }
})
