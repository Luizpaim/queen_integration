import {
    IIntegrationId,
    ISaveTrackingInformation
} from '@modules/Melhorenvio/dto/IIntegrationId';
import { IMelhorenvioRepository } from '@modules/Melhorenvio/repositories/IMelhorenvioRepository';
import { connection } from '@shared/infra/knex';

import { GetIntegrationId } from './ResponsemelhorenvioRepository';

class MelhorenvioRepository implements IMelhorenvioRepository {
    public async saveIntegrationId(
        paymentId: string,
        integrationId: string
    ): Promise<IIntegrationId> {
        const saveTag: any = await connection('payments_logistics')
            .where({
                pid: paymentId
            })
            .update({ integration_id: integrationId });
        return saveTag;
    }
    public async getIntegrationID(): Promise<IIntegrationId[]> {
        const type = 'melhorenvio';
        const currentDate = new Date();
        const deadline = 24 * 60 * 60 * 1000 * 7;
        const calculation = currentDate.setTime(
            currentDate.getTime() - deadline
        );

        const getIntegrationId: any = await connection('payments_logistics')
            .select({
                integrationId: 'payments_logistics.integration_id',
                melhorenvioEmail: 'configurations_logistics.melhorenvio_email',
                melhorenvioToken: 'configurations_logistics.melhorenvio_token'
            })
            .from('payments_logistics')
            .leftJoin('payments', 'payments.id', 'payments_logistics.pid')
            .leftJoin(
                'configurations_logistics_sender',
                'configurations_logistics_sender.id',
                'payments_logistics.contract'
            )
            .leftJoin(
                'configurations_logistics',
                'configurations_logistics.id',
                'configurations_logistics_sender.logistic_id'
            )
            .whereNull('payments_logistics.tracking_code')
            .andWhere({ 'payments_logistics.type': type })
            .andWhere('payments_logistics.date_created', '>=', currentDate)
            .andWhere('payments_logistics.date_created', '<', new Date());

        const getintegrationIdResponse = getIntegrationId.map(
            logisticsIntegrationId => {
                GetIntegrationId.setIntegrationId(logisticsIntegrationId);
                return {
                    integrationId: logisticsIntegrationId.integrationId,
                    melhorenvioEmail: logisticsIntegrationId.melhorenvioEmail,
                    melhorenvioToken: logisticsIntegrationId.melhorenvioToken
                };
            }
        );

        return getintegrationIdResponse;
    }
    public async saveTrackingInformation({
        integrationId,
        amount,
        tracking_code,
        dimensions,
        weight,
        date_updated
    }): Promise<ISaveTrackingInformation> {
        const saveTrackingInformation: any = await connection(
            'payments_logistics'
        )
            .where({ integration_id: integrationId })
            .update({
                amount,
                tracking_code,
                dimensions,
                weight,
                date_updated
            });
        return saveTrackingInformation;
    }
}
export { MelhorenvioRepository };
