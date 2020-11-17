module.exports = (sequelize, dataTypes) => {

    let alias = 'Actors';

    let cols = {
        first_name: dataTypes.STRING,
        last_name: dataTypes.STRING,
        rating: dataTypes.DOUBLE,
    }

    let config = {
        tableName: 'actors'
        
    }
    
    let Actors = sequelize.define(alias, cols, config);

    Actors.associate = (models) => {
        Actors.belongsToMany(models.Movies, {
            as: 'movies',
            through: 'actor_movie',
            foreignKey: 'actor_id',
            otherKey: 'movie_id'
        })
    }

    return Actors;

}