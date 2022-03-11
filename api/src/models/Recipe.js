const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
      id: {
        type: DataTypes.UUID,
        defaultvalue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true, //para relacionar en la tabla intermedia
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false
      },
      score: {
        type: DataTypes.STRING,
      },
      healthScore: {
        type: DataTypes.STRING,
      },
      steps: {
        type: DataTypes.JSON
      },
      image: {
        type: DataTypes.TEXT
      },
      isDb: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    },{timestamps:false} );
  };