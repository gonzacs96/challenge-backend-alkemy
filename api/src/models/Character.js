const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('character', {
    img:{
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        isUrl:{
          msg:"Debe ingresar una url valida en img"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    weight:{
      type:DataTypes.INTEGER,
      allowNull:false,
    },
    history:{
      type:DataTypes.TEXT,
      allowNull:false,
    }
  });
};
