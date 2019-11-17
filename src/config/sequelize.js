const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const config = require('./env').env.database;

class Database {

    constructor(options) {
        this.doSync = options.doSync ? options.doSync : true;
        this.sequelize = this.createSequelizeInstance();
        this.models;
    }

    createSequelizeInstance() {
        // Create the database instance
        const sequelize = new Sequelize(config.name, config.username, config.password, {
            host: config.host,
            dialect: 'mysql'
        });

        /** @todo refactor this to async and await pls */
        this._loadModels(sequelize).then(() => {
            if (process.env.NODE_ENV != 'devtest') {
                sequelize.sync().then(() => {
                    this._loadAssociations(sequelize).then(() => {
                        if (this.doSync) {
                            sequelize.sync().then(() => this._doMigration(sequelize)).catch(err => console.log('Fail', err));
                        }
                    }).catch(err => console.log('Fail to sync associations', err));
                }).catch(err => console.log('Fail to sync', err));
            }
        }).catch(err => console.log('Fail to sync.', err));

        return sequelize;
    }

    _loadModels(instance) {
        return new Promise((resolve, reject) => {
            try {
                // Read the filenames on the paste models
                const filenames = fs.readdirSync(path.join('.', 'src', 'models'));

                // Every model should be placed here!
                filenames.forEach((model, index) => {
                    //const modelName = model.replace(".js", "");
                    /*const dbModel = */
                    require(path.join('..', 'models', model))(instance);
                    //this.models[modelName] = new dbModel();

                    if (index == (filenames.length - 1)) {
                        resolve();
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    _loadAssociations(instance) {
        return new Promise((resolve, reject) => {
            try {
                Object.keys(instance.models).forEach((model, index) => {
                    const dbModel = new instance.models[model]();

                    if (dbModel._modelOptions && dbModel._modelOptions.associate) {
                        dbModel._modelOptions.associate(instance.models);
                    }

                    if (index == (Object.keys(instance.models).length - 1)) {
                        resolve();
                    }
                });
            } catch (err) {
                reject(err);
            }
        });
    }

    _doMigration(instance) {
        return new Promise((resolve, reject) => {
            try {
                require('../migrations/AddCategoryToExpense')(instance);
                require('../migrations/AddCategoryToRevenue')(instance);
                resolve();
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