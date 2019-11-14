const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const config = require('./env').env.database;

class Database {

    constructor(options) {
        this.doSync = options.doSync ? options.doSync : true;
        this.sequelize = this.createSequelizeInstance();
    }

    createSequelizeInstance() {
        // Create the database instance
        const sequelize = new Sequelize(config.name, config.username, config.password, {
            host: config.host,
            dialect: 'mysql'
        });

        this._loadModels(sequelize)
            .then(() => {
                if (this.doSync) {
                    sequelize.sync();
                }
            })
            .catch(err => console.log('Fail to sync.', err));

        return sequelize;
    }

    _loadModels(instance) {
        return new Promise((resolve, reject) => {
            try {
                // Read the filenames on the paste models
                const filenames = fs.readdirSync(path.join('.', 'src', 'models'));

                // Every model should be placed here!
                filenames.forEach((model, index) => {
                    require(path.join('..', 'models', model))(instance);

                    if (index == (filenames.length - 1)) {
                        resolve();
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }
}

const database = new Database({
    doSync: true
});

module.exports = database.sequelize;
module.exports.Database = Database;