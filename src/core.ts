import SteamClient from "./types/structs/SteamClient";
import {config as dotenv} from "dotenv";
import consola from "consola";


dotenv();
/*
 * Note: 32767 means every intent
 * it's better to write then the mess it usually causes
 */
try {
    new SteamClient().run();
} catch (e) {
    consola.error(e);
}

