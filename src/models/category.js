// Creating a new model, that consequently will
// create a table on database with the fields and configs below
module.exports = (sequelize) => {
    const Category = sequelize.define('Category', {
        title: {
            type: sequelize.Sequelize.STRING,
            allowNull: false
        }
    }, {
        tableName: 'category',
        timestamps: true,
        paranoid: true
    });

    return Category;
};