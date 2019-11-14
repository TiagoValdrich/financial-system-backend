const database = require('../config/sequelize');

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await database.models.Expense.findAll();
        return res.status(200).send(expenses);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};

exports.getExpense = async (req, res) => {
    try {
        if (!req.params.hasOwnProperty('id')) {
            return res.sendStatus(400);
        }

        const expense = await database.models.Expense.findByPk(req.params.id);
        return res.status(200).send(expense);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};

exports.save = async (req, res) => {
    try {
        let expense;
        // If register does not have an id, is saving a new register
        if (!req.body.id) {
            expense = await database.models.Expense.create(req.body);
            // If there is an id, is an update
        } else {
            const updated = await database.models.Expense.update(req.body, {
                where: {
                    id: req.body.id
                }
            });

            if (!updated) {
                return res.sendStatus(500);
            }

            expense = await database.models.Expense.findByPk(req.body.id);
        }

        return res.status(200).json(expense);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};

exports.delete = async (req, res) => {
    try {
        if (!req.params.hasOwnProperty('id')) {
            return res.sendStatus(400);
        }

        const rowsDeleted = await database.models.Expense.destroy({
            where: {
                id: req.params.id
            }
        });

        if (rowsDeleted > 0) {
            return res.sendStatus(200);
        }

        return res.sendStatus(500);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};