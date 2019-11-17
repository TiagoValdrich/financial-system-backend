const database = require('../config/sequelize');

exports.getCategories = async (req, res) => {
    try {
        const categories = await database.models.Category.findAll();
        return res.status(200).send(categories);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};

exports.getCategory = async (req, res) => {
    try {
        if (!req.params.hasOwnProperty('id')) {
            return res.sendStatus(400);
        }

        const category = await database.models.Category.findByPk(req.params.id);
        return res.status(200).send(category);
    } catch (error) {
        console.error('ERROR', error);
        return res.sendStatus(500);
    }
};

exports.save = async (req, res) => {
    try {
        let category;
        // If register does not have an id, is saving a new register
        if (!req.body.id) {
            category = await database.models.Category.create(req.body);
            // If there is an id, is an update
        } else {
            const updated = await database.models.Category.update(req.body, {
                where: {
                    id: req.body.id
                }
            });

            if (!updated) {
                return res.sendStatus(500);
            }

            category = await database.models.Category.findByPk(req.body.id);
        }

        return res.status(200).json(category);
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

        const rowsDeleted = await database.models.Category.destroy({
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