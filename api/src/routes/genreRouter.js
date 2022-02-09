const {Router}=require('express')
const router= Router();
const {Genre}=require('../db')

router.get('/', async(req,res)=>{
    try {
        const genres= await Genre.findAll();
        res.status(200).json(genres)
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports=router;