module.exports = async (db) => {
    const expense = await db.queryInterface.describeTable('expense');

    if (!expense.CategoryId) {
        await db.queryInterface.addColumn('expense', 'CategoryId', {
            type: db.Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        });

        await db.queryInterface.addConstraint('expense', ['CategoryId'], {
            type: 'foreign key',
            references: {
                table: 'category',
                field: 'id'
            }
        });
    }
};