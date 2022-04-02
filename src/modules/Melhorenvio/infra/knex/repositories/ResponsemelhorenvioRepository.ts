import searchTagQueue from 'src/queue/searchTagQueue';

class ResponseGetIntegrationIdRepository {
    public integrationId: string;
    public melhorenvioEmail: string;
    public melhorenvioToken: string;

    constructor() {}

    public async setIntegrationId(logisticsIntegrationId) {
        this.integrationId = logisticsIntegrationId.integrationId;
        this.melhorenvioEmail = logisticsIntegrationId.melhorenvioEmail;
        this.melhorenvioToken = logisticsIntegrationId.melhorenvioToken;
        await searchTagQueue.add({
            integrationId: this.integrationId,
            melhorenvioEmail: this.melhorenvioEmail,
            melhorenvioToken: 'Bearer ' + this.melhorenvioToken
        });
        return;
    }
}
export const GetIntegrationId = new ResponseGetIntegrationIdRepository();
