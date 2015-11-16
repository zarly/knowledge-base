
import { Router } from 'express';

const routesConfig = {
    addResponseTime: true
};

const ApiHelper = {
    setRoutes: function (routesHash) {
        var router = new Router();

        Object.keys(routesHash).forEach(path => {
            if (!routesHash.hasOwnProperty(path)) return;

            var handler = routesHash[path];
            router.all('/' + path, async (req, res, next) => {
                var requestStart = routesConfig.addResponseTime && Date.now();
                try {
                    handler(req.query || req.body || {}, function (err, result) {
                        if (err) {
                            next(err);
                        }
                        else {
                            if (routesConfig.addResponseTime
                                && 'object' === typeof result
                                && result !== null
                                && result.responseTime === undefined)
                            {
                                result.responseTime = Date.now() - requestStart;
                            }
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
