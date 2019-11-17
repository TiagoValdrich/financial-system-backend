const Database = require('../config/sequelize').Database;
const axios = require('axios').default;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const env = require('../config/env').env;
const assert = require('chai').assert;

describe('Testing Revenue Controller', () => {
    let database;

    before(async () => {
        database = new Database({
            doSync: false
        }).sequelize;
        const forceDb = process.env.NODE_ENV == 'devtest' ? true : false;
        await database.sync({
            force: forceDb,
            logging: console.log
        });
        await createServer();
    });

    it('should return a status 200 if it saved', async () => {
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
    });

    it('should return a status 200 if it updated successfully', async () => {
        try {
            const revenueResponse = await axios.get(`${env.api.url}/api/revenue/1`);
            const newRevenue = revenueResponse.data;
            newRevenue.title = 'New Revenue Title';
            newRevenue.value = -150;
            const updated = await axios.put(`${env.api.url}/api/expense`, newRevenue);

            if (updated.status == 200) {
                return assert.ok(true);
            } else {
                return assert.fail(true);
            }
        } catch (err) {
            return assert.fail(err);
        }
    });

    it('should return an array of revenues', async () => {
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
    });

    it('should return an revenue', async () => {
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
            app.listen('3000', () => {
                console.log('Server is running.');
                resolve();
            });
        } catch (err) {
            return reject(err);
        }
    });
}