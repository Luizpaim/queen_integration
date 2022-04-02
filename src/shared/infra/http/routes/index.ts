import { Router, Application } from 'express';
import globalValidator from '../validator/globalValidator';
import SearchTag from './searchTag.Routes';

const routes = (app: Application): void => {
    const Routes = Router();
    const routePrefix =
        process.env.NODE_ENV === 'production' ? '/' : '/sandbox/';

    app.use(routePrefix, Routes);
    Routes.use(globalValidator);

    Routes.use('/logistics/searchTagMelhorenvio', SearchTag);
};

export default routes;
