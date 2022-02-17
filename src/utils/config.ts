
export default class Config {
    public accountName: string = process.env.ACCOUNT_NAME;
    public accountPassword: string = process.env.ACCOUNT_PASSWORD;
    public allowedAccounts: any[] = process.env.ALLOWED_ACCOUNTS.split(',');
    public defaultGame: any[] = process.env.DEFAULT_GAMES.split(',').filter(entry => /\S/.test(entry));
    public prefix: string = process.env.PREFIX;

    public verifyAccount(): void {
        if (!this.accountName || !this.accountPassword) {
            throw new Error('Account name and password are required');
        }
    }

}
