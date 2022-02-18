
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
    }

}
