const assert = require('assert');
const expenseController = require('../controllers/expense.controller');

describe('Testing Expenses Controller', () => {
    describe('Testing method getExpenses', () => {
        it('It should return an array of expenses', async () => {
            const expenses = await expenseController.getExpenses();
            assert.equal(typeof expenses, 'array');
        });
    });
});