require('dotenv').config();
const {
    AUTH_SECRET,AUTH_EXPIRES,AUTH_ROUNDS
  } = process.env;
const jwt=require('jsonwebtoken')

function auth(req,res,next){
    if(!req.headers.authorization){
        res.status(401).json({msg:"Acceso no autorizado"})
    }
    else {
        let token=req.headers.authorization.split(" ")[1];
        jwt.verify(token,AUTH_SECRET,(error,decoded)=>{
            if(error){
                res.status(500).json({msg:"Ha habido un problema al decodificar el token",error})
            }
            else {
                next();
            }
        })
    }
}

module.exports=auth;