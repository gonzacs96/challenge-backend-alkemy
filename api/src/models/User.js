const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:{
        msg:"El email ya existe"
      },
      validate:{
        isEmail: {
          msg:"El email tiene que ser valido"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};