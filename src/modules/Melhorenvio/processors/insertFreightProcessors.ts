
import axios from 'axios';
import { DoneCallback, Job } from 'bull';
import { MelhorenvioRepository } from '../infra/knex/repositories/MelhorenvioRepository';

export async function insertFreightProcessors(job: Job, done: DoneCallback) {
    try {
        const { headers, body } = job.data;
        const config: object = {
            method: 'post',
            url: `${process.env.URL_MELHORENVIO}/me/cart`,
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                Authorization: headers.authorization,
                'User-Agent': headers.userAgent
            },
            data: body
        };

        const res = await axios(config);

        const paymentId = res.data.tags[0].tag;
        const integrationId = res.data.protocol;
        new MelhorenvioRepository().saveIntegrationId(paymentId, integrationId);

        console.log(res.data);
        return done();
    } catch (error) {
        console.log(error);
        console.log(error!.response!.data);
        return done(error);
    }
}
