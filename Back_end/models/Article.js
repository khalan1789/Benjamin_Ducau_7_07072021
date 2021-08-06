const { DataTypes } = require("sequelize"); 

module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article',{
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        title:{
            type: DataTypes.STRING(100),
            allowNull: false,
        }, 
        contain:{
            type: DataTypes.TEXT,
        },
       fileUrl:{
            type: DataTypes.STRING,
            
        }
    })
    return Article
}