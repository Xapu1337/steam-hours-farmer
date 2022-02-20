
export default class Config {
    public accountName: string = process.env.ACCOUNT_NAME;
    public accountPassword: string = process.env.ACCOUNT_PASSWORD;
    public allowedAccounts: any[] = JSON.parse(process.env.ALLOWED_USERS);
    public defaultGame: any[] = JSON.parse(process.env.DEFAULT_GAMES);
    public prefix: string = process.env.PREFIX;

    public verifyAccount(): void {
        if (!this.accountName || !this.accountPassword) {
            throw new Error('Account name and password are required');
        }

        if (!Array.isArray(this.allowedAccounts) || !this.allowedAccounts.length) {
            throw new Error('Allowed accounts are required, note that it should be an array like: [id1, id2]');
        }

        if (!Array.isArray(this.defaultGame) || !this.defaultGame.length) {
            throw new Error('Default game is required, note that it should be an array like: [gameID, "Custom Game"]');
        }
    }

}
