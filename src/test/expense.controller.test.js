const Database = require('../config/sequelize').Database;
const axios = require('axios').default;
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const env = require('../config/env').env;
const assert = require('chai').assert;

describe('Testing Expense Controller', () => {
    let database;
    let server;

    before(async () => {
        database = new Database({
            doSync: false
        }).sequelize;
        const forceDb = process.env.NODE_ENV == 'devtest' ? true : false;
        await database.sync({
            force: forceDb,
            logging: console.log
        });
        server = await createServer();
    });

    it('should return a status 200 if it saved', async () => {
        try {
            const expense = {
                title: 'Teste',
                value: -50,
                date: new Date()
            };
            const expenseResponse = await axios.put(`${env.api.url}/api/expense`, expense);

            if (expenseResponse.status == 200) {
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
            const expenseResponse = await axios.get(`${env.api.url}/api/expense/1`);
            const newExpense = expenseResponse.data;
            newExpense.title = 'New Expense Title';
            newExpense.value = -150;
            const updated = await axios.put(`${env.api.url}/api/expense`, newExpense);

            if (updated.status == 200) {
                return assert.ok(true);
            } else {
                return assert.fail(true);
            }
        } catch (err) {
            return assert.fail(err);
        }
    });

    it('should return an array of expenses', async () => {
        try {
            const expenses = await axios.get(`${env.api.url}/api/expense`);

            if (expenses.data && Array.isArray(expenses.data)) {
                if (expenses.data[0].id && expenses.data[0].title && expenses.data[0].value) {
                    return assert.ok(true);
                }
            }

            return assert.fail(ok);
        } catch (err) {
            return assert.fail(err);
        }
    });

    it('should return an expense', async () => {
        try {
            const expense = await axios.get(`${env.api.url}/api/expense/1`);

            if (expense.data) {
                return assert.ok(true);
            } else {
                return assert.fail(true);
            }
        } catch (err) {
            return assert.fail(err);
        }
    });

    after(() => {
        server.close();
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
            app.use(require('../routes/expense.routes'));
            app.listen('3000', () => {
                console.log('Server is running.');
                resolve(app);
            });
        } catch (err) {
            return reject(err);
        }
    });
}