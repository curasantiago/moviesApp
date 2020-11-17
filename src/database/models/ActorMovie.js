module.exports = (sequelize, dataTypes) => {

    let alias = 'ActorMovie';

    let cols = {
        actor_id: dataTypes.INTEGER,
        movie_id: dataTypes.INTEGER,
    }

    let config = {
        tableName: 'actor_movie'
        
    }
    
    let ActorMovie = sequelize.define(alias, cols, config);

    // ActorMovie.associate = (models) => {

    //     ActorMovie.belongsToMany(models.Movies, {
    //         as: 'movies',
    //         through: 'actor_movies'
    //     }),

    //     ActorMovie.belongsToMany(models.Actors, {
    //         as: 'actors',
    //         through: 'actor_movies'
    //     })
    // }

    return ActorMovie;

}