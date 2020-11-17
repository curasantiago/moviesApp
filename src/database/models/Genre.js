module.exports = (sequelize, dataTypes) => {

    let alias = 'Genre';

    let cols = {
        name: dataTypes.STRING,
        ranking: dataTypes.DOUBLE,
    }

    let config = {
        tableName: 'genres'
       
    }
    
    let Genre = sequelize.define(alias, cols, config)

    Genre.associate = (models) => {
        Genre.hasMany(models.Movies, {
            as: 'movies',
            foreignKey: 'genre_id'
        })
    }

    return Genre;

}