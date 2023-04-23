
import SteamClient from "./types/structs/SteamClient";

import consola from "consola";


(async () => {

    await import("dotenv/config");
    // debug log process.env but remove the password
    consola.log(process.env);
    try {
        await new SteamClient().run();
    } catch (e) {
        consola.error(e);
    }
    consola.success("Connected to Steam");
})();

