const assert = require('assert');
const axios = require('axios');

describe('Testing Expenses Controller', () => {
    describe('Testing method getExpenses', () => {
        it('It should return an array of expenses', async () => {
            const expenses = await axios.get('/api/expense');
            assert.equal(typeof expenses, 'array');
        });
    });
});