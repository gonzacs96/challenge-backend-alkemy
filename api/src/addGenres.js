const {Genre} = require ('./db');

const addGenres= ()=> { 
        let genres=[{name:"Action",img:"https://image.shutterstock.com/image-illustration/clap-film-cinema-action-genre-600w-116000149.jpg"},
            {name:"Comedy", img:"https://image.shutterstock.com/image-illustration/clap-film-cinema-comedy-genre-600w-116548462.jpg"},
            {name:"Drama",img:"https://image.shutterstock.com/image-illustration/clap-film-cinema-drama-genre-600w-116002711.jpg"},
            {name:"Fantasy",img:"https://image.shutterstock.com/image-illustration/clap-film-cinema-fantasy-genre-600w-116548459.jpg"},
            {name:"Horror",img:"https://image.shutterstock.com/image-illustration/clap-film-cinema-horror-genre-600w-116002720.jpg"},
            {name:"Mystery",img:"https://image.shutterstock.com/image-illustration/clap-film-cinema-mystery-genre-600w-116548480.jpg"},
            {name:"Romance",img:"https://image.shutterstock.com/image-illustration/clap-film-cinema-romance-genre-600w-116002714.jpg"},
            {name:"Thriller",img:"https://image.shutterstock.com/image-illustration/clap-film-cinema-thriller-genre-600w-116002717.jpg"},
            {name:"Western",img:"https://image.shutterstock.com/image-illustration/clap-film-cinema-western-genre-600w-116002708.jpg"}];
        try {
            const genres_movies= genres.map(async genre=>{
                return await Genre.findOrCreate({
                    where:{name:genre.name},
                    defaults:{
                        name:genre.name,
                        img:genre.img
                    }
                })
            });
        } catch (error) {
            console.log(error)
        }
}

module.exports = addGenres;