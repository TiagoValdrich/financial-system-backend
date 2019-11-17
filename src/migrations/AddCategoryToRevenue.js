module.exports = async (db) => {
    const revenue = await db.queryInterface.describeTable('revenue');

    if (!revenue.CategoryId) {
        await db.queryInterface.addColumn('revenue', 'CategoryId', {
            type: db.Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        });

        await db.queryInterface.addConstraint('revenue', ['CategoryId'], {
            type: 'foreign key',
            references: {
                table: 'category',
                field: 'id'
            }
        });
    }
};