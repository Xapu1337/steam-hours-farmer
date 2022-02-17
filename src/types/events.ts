
import {ChatEvents, Events} from "./global";
import SteamClient from "./structs/SteamClient";



export class Event<Key extends keyof Events> {
    constructor(
        public event: Key,
        public run: (client: SteamClient, ...args: Events[Key]) => any
    ) {
    }
}

export class ChatEvent<key extends keyof ChatEvents> {
    constructor(
        public event: key,
        public run: (client: SteamClient, ...args: ChatEvents[key]) => any
    ) {
    }
}
