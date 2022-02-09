const { Router } = require('express');
const { Op } = require('sequelize');
const router = Router();
const {Movie,Character,Genre}=require('../db')

router.get('/',async(req,res)=>{
    const {title, order, genre}=req.query;
    let querys={}
    title?querys.title={[Op.substring]:title}:null;
    let orders=[];
    order?orders[0]=["title",order]:null;
    let include_genre=[];
    genre?include_genre[0]={
        model:Genre,where:{id:genre}
    }:null;
    if(title || order || genre){
       try {
           const movies=await Movie.findAll({
               where:querys,
               order:orders,
               include:include_genre
           })
           res.status(200).json(movies)
       } catch (error) {
           res.status(404).json(error)
       }
    }
    else{
        try {
            const movies= await Movie.findAll();
            res.status(200).json(movies)
        } catch (error) {
            res.status(404).json(error)
        }
    }
});

router.get('/:id',async(req,res)=>{
    const {id}=req.params;
    try {
        const movie= await Movie.findByPk(id,{
            include:[{model:Character},{model:Genre}]
        });
        res.status(200).json(movie)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.post('/',async(req,res)=>{
    const {img,title,year,rating,genres,characters}=req.body;
    if (!genres || !characters){
        return res.status(200).json({msg:"Debe enviar un array con los id de los generos de la pelicula, y otro con los id de los personajes de la pelicula"})
    }
    try {
        const [movie,created]= await Movie.findOrCreate({
            where:{title:title},
            defaults:{
                img:img,
                title:title,
                year:year,
                rating:rating
            }
        })
        if(created){
            try {
                await movie.addGenres(genres);
                await movie.addCharacters(characters);
                res.status(200).json({msg:"Pelicula creada exitosamente"});
            } catch (error) {
                await Movie.destroy({where:{title:title}});
                res.status(404).json({error:"Alguno/o de los id de los generos o personajes ingresados es invalido"})
            }
        }
        else{
            res.status(200).json({msg:"Esa pelicula ya existe"});
        };
    } catch (error) {
        res.status(404).json(error)
    }
});

router.delete('/',async(req,res)=>{
    const {id}=req.body;
    if(!id){
        return res.status(200).json({msg:"Debe enviar por body un id para eliminar una pelicula"})
    }
    try {
        const deleted= await Movie.destroy({
            where:{id:id}
        })
        deleted===1?
        res.status(200).json({msg:"Pelicula eliminada correctamente"})
        :
        res.status(200).json({msg:"No se encontro una pelicula con esa id"})
    } catch (error) {
        res.status(404).json(error)
    }
})

router.put('/',async(req,res)=>{
    const {id,img,title,year,rating}=req.body;
    if(!id){
        return res.status(200).json({msg:"Debe enviar un id por body para modificar una pelicula"})
    }
    try {
        const values_edit={};
        img?values_edit.img=img:null;
        title?values_edit.title=title:null;
        year?values_edit.year=year:null;
        rating?values_edit.rating=rating:null;
        const [movie_updated_count]=await Movie.update(values_edit,{
            where:{
                id:id
            }
        });
        movie_updated_count===1?
        res.status(200).json({msg:"Pelicula editada correctamente"})
        :
        res.status(200).json({msg:"No se edito ningun atributo del personaje"})
    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports=router;