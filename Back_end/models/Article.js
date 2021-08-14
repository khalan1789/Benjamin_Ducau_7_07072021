// modèle sequelize pour la table Article et associations
const { DataTypes } = require("sequelize"); 

module.exports = (sequelize, DataTypes) => {
    const Article = sequelize.define('Article',{
        title:{
            type: DataTypes.STRING(100),
            allowNull: false,
        }, 
        contain:{
            type: DataTypes.TEXT,
        },
        imageUrl:{
            type: DataTypes.STRING,
            
        }
    })
        
    
    Article.associate = (models) => {
    // association table articles avec celles des users
        Article.belongsTo(models.User);
    
    // association table articles avec celles des commentaires
        Article.hasMany(models.Comment, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
   
    // association table articles avec celles des likes 
        Article.hasMany(models.Like, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        });
    };

    return Article
};
