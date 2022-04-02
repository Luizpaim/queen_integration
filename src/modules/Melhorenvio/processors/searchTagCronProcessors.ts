import { DoneCallback, Job } from 'bull';
import { MelhorenvioRepository } from '../infra/knex/repositories/MelhorenvioRepository';

export async function searchTagCronProcesssors(job: Job, done: DoneCallback) {
    try {
        await new MelhorenvioRepository().getIntegrationID();
        return done();
    } catch (error) {
        return done(error);
    }
}
