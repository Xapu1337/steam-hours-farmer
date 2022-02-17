import {Event} from "../types/events"
export default new Event('loggedOn', (client, details: Record<string, any>, parental: Record<string, any>) => {
  client.utilities.printLn(`Welcome ${client.configuration.accountName}!`, "STEAM");
  client.setPersona(1);
  client.gamesPlayed(client.configuration.defaultGame.map(game => isNaN(Number(game)) ? game : Number(game)));
});
