
import {ChatEvents, Events} from "./global";



export class Event<Key extends keyof Events> {
    constructor(
        public event: Key,
        public run: (client, ...args: Events[Key]) => any
    ) {
    }
}

export class ChatEvent<key extends keyof ChatEvents> {
    constructor(
        public event: key,
        public run: (client, ...args: ChatEvents[key]) => any
    ) {
    }
}
