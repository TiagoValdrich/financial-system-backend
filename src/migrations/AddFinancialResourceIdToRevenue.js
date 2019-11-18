module.exports = async (db) => {
    const revenue = await db.queryInterface.describeTable('revenue');

    if (!revenue.FinancialResourceId) {
        await db.queryInterface.addColumn('revenue', 'FinancialResourceId', {
            type: db.Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        });

        await db.queryInterface.addConstraint('revenue', ['FinancialResourceId'], {
            type: 'foreign key',
            references: {
                table: 'financial_resource',
                field: 'id'
            }
        });
    }
};