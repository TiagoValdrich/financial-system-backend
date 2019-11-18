// Creating a new model, that consequently will
// create a table on database with the fields and configs below
module.exports = (sequelize) => {
    const FinancialResource = sequelize.define('FinancialResource', {
        title: {
            type: sequelize.Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'financial_resource',
        timestamps: true,
        paranoid: true
    });

    return FinancialResource;
};