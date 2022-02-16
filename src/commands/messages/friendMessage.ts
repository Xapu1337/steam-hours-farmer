import {ChatEvent} from "../../types/events";

export default new ChatEvent("chatMessage", async (client, message) => {
    console.log(message);
});

