import { container } from 'tsyringe';

/**Container Melhor envio */
import { MelhorenvioRepository } from '@modules/Melhorenvio/infra/knex/repositories/MelhorenvioRepository';
import { IMelhorenvioRepository } from '@modules/Melhorenvio/repositories/IMelhorenvioRepository';

container.registerSingleton<IMelhorenvioRepository>('MelhorenvioRepository', MelhorenvioRepository);

