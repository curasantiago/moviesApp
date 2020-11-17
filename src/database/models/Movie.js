module.exports = (sequelize, dataTypes) => {

    let alias = 'Movies';

    let cols = {
        title: dataTypes.STRING,
        rating: dataTypes.DOUBLE,
        awards: dataTypes.INTEGER,
        release_date: dataTypes.DATEONLY,
        length: dataTypes.INTEGER,
        genre_id: dataTypes.INTEGER
    }

    let config = {
        tableName: 'movies'
    }
    
    let Movies = sequelize.define(alias, cols, config)

    Movies.associate = (models) => {
        Movies.belongsTo(models.Genre, {
            as: 'genre',
            foreignKey: 'genre_id'
        });

        Movies.belongsToMany(models.Actors, {
            as: 'actors',
            through: 'actor_movie',
            foreignKey: 'movie_id',
            otherKey: 'actor_id'
        });
    }

    return Movies;

}