
import { Router } from 'express';

const ApiHelper = {
    setRoutes: function (routesHash) {
        var router = new Router();

        Object.keys(routesHash).forEach(path => {
            if (!routesHash.hasOwnProperty(path)) return;

            var handler = routesHash[path];
            router.all('/' + path, async (req, res, next) => {
                try {
                    handler(req.query || req.body || {}, function (err, result) {
                        if (err) {
                            next(err);
                        }
                        else {
                            res.json(result);
                        }
                    });
                } catch (err) {
                    next(err);
                }
            });
        });

        return router;
    }
};

export default ApiHelper;
