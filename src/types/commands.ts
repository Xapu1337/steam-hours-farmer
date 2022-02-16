
import SteamClient from "./structs/SteamClient";
import {IncomingChatMessage, IncomingFriendMessage} from "./global";

/**
 * {
 *  name: "commandname",
 * description: "any description",
 * run: async({ interaction }) => {
 *
 * }
 * }
 */
export interface RunOptions {
    client: SteamClient;
    message: IncomingChatMessage | IncomingFriendMessage;
    args: string[];
}

type RunFunction = (options: RunOptions) => Promise<any>;

export type CommandType = {
    name: string;
    category?: string;
    aliases?: string[];
    run: RunFunction;
};
