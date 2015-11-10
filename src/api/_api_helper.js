
import { Router } from 'express';

const ApiHelper = {
    setRoutes: function (routesHash) {
        var router = new Router();

        Object.keys(routesHash).forEach(path => {
            if (!routesHash.hasOwnProperty(path)) return;

            var handler = routesHash[path];
            router.get('/' + path, async (req, res, next) => {
                try {
                    handler(req, res);
                } catch (err) {
                    next(err);
                }
            });
        });

        return router;
    }
};

export default ApiHelper;
