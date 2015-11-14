'use strict';

//dependencies
var defer = require('config/defer').deferConfig;

/**
 * @description default configurations
 * @type {Object}
 */
module.exports = {

    /**
     * @description default application base url
     * @type {String}
     */
    baseUrl: defer(function() {
        return 'http://' + this.ip + ':' + this.port;
    }),


    port: 3000,
    ip: '127.0.0.1',
    host: 'localhost',


    /**
     * @description mongoose database configurations
     * @type {Object}
     */
    mongoose: {
        database: 'mvp-dev',
        host: '127.0.0.1',
        user: '',
        password: '',
        port: 27017,
        options: {
            db: {
                safe: true
            },
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            },
            replset: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    },

    auth: {
        sessionSecretKey: 'book-secret-key'
    },

    facebook: {
        appId: '874698845979602',
        appSecret: '6c3fd6b358bc2d6ffcc5717a4f0920b4'
    },

    google: {
        clientID: '446928433825-n2c3gk1jhrn1tpro0ct2g8c1bmbtcf4l.apps.googleusercontent.com',
        clientSecret: '2hIiQP2RMJ47cirbkCny6Pp0'
    },

    /**
     *@description logger configurations
     */
    logger: {
        dir: 'logs',
        level: 'silly',
        file: 'logs.json'
    }

};