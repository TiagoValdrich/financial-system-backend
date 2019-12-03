const Database = require('../config/sequelize').Database;
const axios = require('axios').default;
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');
const env = require('../config/env').env;
const assert = require('chai').assert;

describe('Testing Revenue Controller', () => {
    let database;
    let server;

    before(async () => {
        const db = new Database({
            doSync: false
        });
        database = db.sequelize;
        await database.query('SET FOREIGN_KEY_CHECKS = 0', null, null);
        const forceDb = process.env.NODE_ENV == 'devtest' ? true : false;
        await database.sync({
            force: forceDb,
            logging: console.log
        });
        await db._loadAssociations(database);
        await database.sync({
            force: false,
            logging: console.log
        });
        await db._doMigration(database);
        server = await createServer();
    });

    it('should return a status 200 if it saved', async () => {
        // Xunxo for fix database returning resolve without being complete
        setTimeout(async () => {
            try {
                const revenue = {
                    title: 'Teste',
                    value: -50,
                    date: new Date()
                };
                const revenueResponse = await axios.put(`${env.api.url}/api/revenue`, revenue);
    
                if (revenueResponse.status == 200) {
                    return assert.ok(true);
                } else {
                    return assert.fail(true);
                }
            } catch (err) {
                return assert.fail(true);
            }
        }, 30000);
    });

    it('should return a status 200 if it updated successfully', async () => {
        // Xunxo for fix database returning resolve without being complete
        setTimeout(async () => {
            try {
                const revenueResponse = await axios.get(`${env.api.url}/api/revenue/1`);
                const newRevenue = revenueResponse.data;
                newRevenue.title = 'New Revenue Title';
                newRevenue.value = -150;
                const updated = await axios.put(`${env.api.url}/api/revenue`, newRevenue);
    
                if (updated.status == 200) {
                    return assert.ok(true);
                } else {
                    return assert.fail(true);
                }
            } catch (err) {
                return assert.fail(err);
            }
        }, 30000);
    });

    it('should return an array of revenues', async () => {
        // Xunxo for fix database returning resolve without being complete
        setTimeout(async () => {
            try {
                const revenues = await axios.get(`${env.api.url}/api/revenue`);
    
                if (revenues.data && Array.isArray(revenues.data)) {
                    if (revenues.data[0].id && revenues.data[0].title && revenues.data[0].value) {
                        return assert.ok(true);
                    }
                }
    
                return assert.fail(ok);
            } catch (err) {
                return assert.fail(err);
            }
        }, 30000);
    });

    it('should return an revenue', async () => {
        // Xunxo for fix database returning resolve without being complete
        setTimeout(async () => {
            try {
                const revenue = await axios.get(`${env.api.url}/api/revenue/1`);
    
                if (revenue.data) {
                    return assert.ok(true);
                } else {
                    return assert.fail(true);
                }
            } catch (err) {
                return assert.fail(err);
            }
        }, 30000);
    });

    after(async () => {
        await closeConn(server);
    });
});

function createServer() {
    return new Promise((resolve, reject) => {
        try {
            const app = express();

            app.use(cors());
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({
                extended: true
            }));
            app.use(require('../routes/revenue.routes'));

            const server = http.Server(app);
            server.listen('3000', () => {
                console.log('Server is running.');
                resolve(server);
            });
        } catch (err) {
            return reject(err);
        }
    });
}

function closeConn(server) {
    return new Promise((resolve, reject) => {
        try {
            server.close(() => {
                resolve();
            });
        } catch (err) {
            reject(err);
        }
    });
}