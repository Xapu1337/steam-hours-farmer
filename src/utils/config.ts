
export default class Config {
    public accountName: string = process.env.ACCOUNT_NAME;
    public accountPassword: string = process.env.ACCOUNT_PASSWORD;

    public verifyAccount(): void {
        if (!this.accountName || !this.accountPassword) {
            throw new Error('Account name and password are required');
        }
    }

}
