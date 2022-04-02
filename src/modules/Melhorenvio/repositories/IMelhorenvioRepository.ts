import {
    IIntegrationId,
    ISaveTrackingInformation
} from '../dto/IIntegrationId';

interface IMelhorenvioRepository {
    saveIntegrationId(
        paymentId: string,
        idTag: string
    ): Promise<IIntegrationId>;
    getIntegrationID(): Promise<IIntegrationId[]>;
    saveTrackingInformation({
        paymentId,
        amount,
        tracking_code,
        dimensions,
        weight,
        date_updated
    }: ISaveTrackingInformation): Promise<ISaveTrackingInformation>;
}
export { IMelhorenvioRepository };
