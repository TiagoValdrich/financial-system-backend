module.exports = async (db) => {
    const expense = await db.queryInterface.describeTable('expense');

    if (!expense.FinancialResourceId) {
        await db.queryInterface.addColumn('expense', 'FinancialResourceId', {
            type: db.Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        });

        await db.queryInterface.addConstraint('expense', ['FinancialResourceId'], {
            type: 'foreign key',
            references: {
                table: 'financial_resource',
                field: 'id'
            }
        });
    }
};