const database = require('../config/sequelize');

exports.getRevenues = async (req, res) => {
    try {
        const query = {
            include: [{
                    model: database.models.Category,
                    required: false,
                    attributes: ['title'],
                },
                {
                    model: database.models.FinancialResource,
                    required: false,
                    attributes: ['title'],
                }
            ],
            order: [
                ['id', 'ASC']
            ],
            where: {}
        };

        if (req.query.title && req.query.title != 'null') {
            query.where.title = {
                $like: "%" + req.query.title + "%"
            }
        }

        if (req.query.date && req.query.date != 'null') {
            query.where.date = {
                $eq: new Date(req.query.date)
            }
        }

        if (req.query.CategoryId && req.query.CategoryId != 'null') {
            query.where.CategoryId = req.query.CategoryId;
        }

        if (req.query.FinancialResourceId && req.query.FinancialResourceId != 'null') {
            query.where.FinancialResourceId = req.query.FinancialResourceId;
        }

        const revenues = await database.models.Revenue.findAll(query);
        return res.status(200).send(revenues);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};

exports.getRevenue = async (req, res) => {
    try {
        if (!req.params.hasOwnProperty('id')) {
            return res.sendStatus(400);
        }

        const revenue = await database.models.Revenue.findByPk(req.params.id);
        return res.status(200).send(revenue);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};

exports.save = async (req, res) => {
    try {
        let revenue;
        // If register does not have an id, is saving a new register
        if (!req.body.id) {
            revenue = await database.models.Revenue.create(req.body);
            // If there is an id, is an update
        } else {
            const updated = await database.models.Revenue.update(req.body, {
                where: {
                    id: req.body.id
                }
            });

            if (!updated) {
                return res.sendStatus(500);
            }

            revenue = await database.models.Revenue.findByPk(req.body.id);
        }

        return res.status(200).json(revenue);
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

        const rowsDeleted = await database.models.Revenue.destroy({
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