const { Router } = require('express');
const router = Router();
const { Op } = require('sequelize');
const {Character,Movie}=require('../db');


router.get('/',async(req,res)=>{
    const {name, age, movies}=req.query;
    let querys={}
    name?querys.name={[Op.substring]:name}:null;
    age?querys.age=age:null;
    let include_movies=[];
    movies?include_movies[0]={
        model:Movie, where: {id:movies}
    }:null
    if(querys.name || querys.age || movies){
       try {
           const characters=await Character.findAll({
               where:querys,
               include:include_movies
           })
           res.status(200).json(characters)
       } catch (error) {
           res.status(404).json(error)
       }
    }
    else{
        try {
            const characters= await Character.findAll();
            res.status(200).json(characters)
        } catch (error) {
            res.status(404).json(error)
        }
    }
});

router.get('/:id',async(req,res)=>{
    const {id}= req.params;
    try {
        const character= await Character.findByPk(id,{
            include:{
                model:Movie
            }
        });
        res.status(200).json(character)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.post('/',async (req,res)=>{
  const {img,name,age,weight,history}=req.body;
  try {
    const [character,created]= await Character.findOrCreate({
        where:{name:name},
        defaults:{
            img:img,
            name:name,
            age:age,
            weight:weight,
            history:history
        }
    });
    if(created){
        res.status(200).json({
        msg:"Personaje creado exitosamente",
        character
        })
    }
    
    else {
        res.status(200).json({
            msg:"El personaje ya existe",
            character
        })
    }
  } catch (error) {
      res.status(404).json(error)
  }
  
});

router.delete('/',async (req,res)=>{
    const {id}=req.body;
    if(!id){
        return res.status(200).json({msg:"Debe enviar un id por body para eliminar un personaje"})
    }
    try {
        const deleted=await Character.destroy({
            where:{id:id}
        });
        deleted===1?
        res.status(200).json({msg:"Eliminado correctamente"})
        :
        res.status(200).json({msg:"No se encontro ningun personaje con ese id"})
    } catch (error) {
        res.status(404).json(error)
    }
})

router.put('/',async(req,res)=>{
    const {id,img,name,age,weight,history}=req.body;
    if(!id){
        return res.status(200).json({msg:"Debe enviar por body el id del personaje que quiere editar"})
    }
    try {
       const values_edit={}
       img?values_edit.img=img:null;
       name?values_edit.name=name:null;
       age?values_edit.age=age:null;
       weight?values_edit.weight=weight:null;
       history?values_edit.history=history:null;
       const [character_updated_count] =await Character.update(values_edit,{
           where:{
               id:id
           }
       });
       character_updated_count===1?
       res.status(200).json({msg:"Personaje editado correctamente"})
       :
       res.status(200).json({msg:"No se edito ningun atributo del personaje"})
    } catch (error) {
        res.status(404).json(error)
    }
})



module.exports=router