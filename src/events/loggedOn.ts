import {Event} from "../types/events"
import {EPersonaState} from "steam-user";

export default new Event('loggedOn', (client) => {
  client.utilities.printLn(`You are logged in as ${client.configuration.accountName}`, "STEAM");
  client.utilities.printLn(`Your SteamID is ${client.steamID}`, "STEAM");
  client.utilities.printLn(`Launching default games: ${client.configuration.defaultGame.join(", ")}`, "STEAM");



  client.setPersona(EPersonaState.Online);
  client.gamesPlayed(client.configuration.defaultGame.map(game => isNaN(Number(game)) ? game : Number(game)));
});
