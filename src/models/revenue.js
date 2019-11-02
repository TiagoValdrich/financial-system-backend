// Creating a new model, that consequently will
// create a table on database with the fields and configs below
module.exports = (sequelize) => {
    const Revenue = sequelize.define('Revenue', {
        title: {
            type: sequelize.Sequelize.STRING,
            allowNull: false
        },
        value: {
            type: sequelize.Sequelize.DECIMAL(12, 6),
            allowNull: false
        },
        date: {
            type: sequelize.Sequelize.DATE,
            allowNull: false
        }
    }, {
        tableName: 'revenue',
        timestamps: true,
        paranoid: false
    });

    return Revenue;
};