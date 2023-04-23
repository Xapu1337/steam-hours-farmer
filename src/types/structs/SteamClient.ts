
import SteamUser from "steam-user";
import Utility from "../../utils/utility";
import Config from "../../utils/config";
import { Collection } from "@discordjs/collection";
import {CommandType} from "../commands";
import {ChatEvent, Event} from "../events";
import * as path from "path";
import klaw from "klaw";
import {ChatEvents, Events, Options} from "../global";
export default class SteamClient extends SteamUser {

    public commands: Collection<string, CommandType>;
    public utilities: Utility;
    public aliases: Collection<string, string>;
    public configuration: Config;

    constructor(options?: Options) {
        super(options);

        this.utilities = new Utility(this);
        this.configuration = new Config();
        this.aliases = new Collection<string, string>();
        this.commands = new Collection<string, CommandType>();

    }

    async run() {

        this.utilities.printLn(`Initializing...`, "STEAM");

        this.configuration.verifyAccount();


        await this.logOn({accountName: this.configuration.accountName, password: this.configuration.accountPassword});

        await klaw(path.join(__dirname, "../../commands/messages")).on("data", async (item) => {
            // Check if the file is a directory
            const cmdFile = path.parse(item.path);
            // Check if the file is a .ts file
            const category = item.path.match(/\w+(?=[\\/][\w\-.]+$)/)![0];
            if (!cmdFile.ext || cmdFile.ext !== ".ts") return;

            // Import the file
            const cmd: CommandType = await this.utilities.importFile(item.path);

            // if the command is not defined abort
            if (!cmd) return;

            // Assign the category to the command
            cmd.category = category;

            // If the command has aliases add them to the collection
            if (cmd.aliases) {
                cmd.aliases.forEach((alias) => {
                    this.aliases.set(alias, cmd.name);
                });
            }

            // Add the command to the collection
            this.commands.set(cmd.name, cmd);
        });


        await klaw(path.join(__dirname, "../../events")).on("data", async (item) => {
            const eventFile = path.parse(item.path);
            if (!eventFile.ext || eventFile.ext !== ".ts") return;

            const event: Event<keyof Events> = await this.utilities.importFile(item.path);
            if (!event) return;
            this.on(event.event, (...args: any) => {
                event.run(this, ...args);
            });
        });

        await klaw(path.join(__dirname, "../../chatEvents")).on("data", async (item) => {
            const eventFile = path.parse(item.path);
            if (!eventFile.ext || eventFile.ext !== ".ts") return;

            const event: ChatEvent<keyof ChatEvents> = await this.utilities.importFile(item.path);
            if (!event) return;
            this.chat.on(event.event, (...args: any) => {
                event.run(this, ...args);
            });
        });

        this.utilities.printLn(`Initialized`, "STEAM");

    }

}
