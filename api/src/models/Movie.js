const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('movie', {
    img:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    rating:{
       type:DataTypes.INTEGER,
       allowNull:false,
       validate:{
           min:1,
           max:5
       }
    }
  });
};