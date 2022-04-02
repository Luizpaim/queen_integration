import { DoneCallback, Job } from 'bull';
import axios from 'axios';
import { MelhorenvioRepository } from '../infra/knex/repositories/MelhorenvioRepository';

export async function searchTagProcessors(job: Job, done: DoneCallback) {
    try {
        const data = job.data;
        const config: object = {
            method: 'get',
            url: `${process.env.URL_MELHORENVIO}/me/orders/search?q=${data.integrationId}`,
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                Authorization: data.melhorenvioToken,
                'user-Agent': data.melhorenvioEmail
            }
        };

        const res = await axios(config);
        const integrationId = res.data[0].protocol;
        const amount = res.data[0].price;
        const tracking_code = res.data[0].tracking;
        const width = res.data[0].width;
        const height = res.data[0].height;
        const length = res.data[0].length;
        const weight = res.data[0].billed_weight;

        if (
            res.data[0].width != null &&
            res.data[0].height != null &&
            res.data[0].length != null
        ) {
            var dimensions = `${width}x${height}x${length}`;
        }
        if (
            res.data[0].price != null ||
            res.data[0].tracking != null ||
            res.data[0].billed_weight != null
        ) {
            var date_updated = new Date();
        }

        new MelhorenvioRepository().saveTrackingInformation({
            integrationId,
            amount,
            tracking_code,
            dimensions,
            weight,
            date_updated
        });
        console.log(res.data);

        return done();
    } catch (error) {
        console.log(error);
        console.log(error!.response!.data);
        return done(error);
    }
}
