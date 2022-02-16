import SteamClient from "../types/structs/SteamClient";
import consola from "consola";
import chalk from "chalk";
import dayjs from "dayjs";
export default class Utility {
    private client: SteamClient;

    constructor(client: SteamClient) {
        this.client = client;
    }
    /**
     * Stylized print
     * Result: [TITLE (default: LOG) @ TIME] CONTENT
     * @param content Text that will be printed
     * @param title OPTIONAL title that replaces "LOG"
     */
    printLn(content: string, title?: string) {
        // This results in an error, but it's there from colors
        // It's extending the String prototype.
        // @ts-ignore
        consola.log(`${chalk.white("[") + chalk.cyanBright(title || "LOG") + chalk.whiteBright(" @ ") + chalk.blue(dayjs().format("HH:mm")) + chalk.white("]")} ${content}`);
    }


    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }

}
