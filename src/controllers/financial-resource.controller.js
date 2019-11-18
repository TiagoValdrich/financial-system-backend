const database = require('../config/sequelize');

exports.getFinancialResources = async (req, res) => {
    try {
        const financialResources = await database.models.FinancialResource.findAll();
        return res.status(200).send(financialResources);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};

exports.getFinancialResource = async (req, res) => {
    try {
        if (!req.params.hasOwnProperty('id')) {
            return res.sendStatus(400);
        }

        const financialResource = await database.models.FinancialResource.findByPk(req.params.id);
        return res.status(200).send(financialResource);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};

exports.save = async (req, res) => {
    try {
        let financialResource;
        // If register does not have an id, is saving a new register
        if (!req.body.id) {
            financialResource = await database.models.FinancialResource.create(req.body);
            // If there is an id, is an update
        } else {
            const updated = await database.models.FinancialResource.update(req.body, {
                where: {
                    id: req.body.id
                }
            });

            if (!updated) {
                return res.sendStatus(500);
            }

            financialResource = await database.models.FinancialResource.findByPk(req.body.id);
        }

        return res.status(200).json(financialResource);
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

        const rowsDeleted = await database.models.FinancialResource.destroy({
            where: {
                id: req.params.id
            }
        });

        if (rowsDeleted > 0) {
            return res.status(200).json({
                deleted: true
            });
        }

        return res.sendStatus(500);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};