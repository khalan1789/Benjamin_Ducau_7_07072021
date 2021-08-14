const { DataTypes } = require("sequelize"); 

// modèle sequelize pour la table Comment et associations
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment',{
        contain:{
            type: DataTypes.TEXT,
            allowNull: false,
        }
    })

    
    Comment.associate = (models) => {
    // association table  commentaires avec celles des users    
        Comment.belongsTo(models.User)
   
    // association table  commentaires avec celles des articles
        Comment.belongsTo(models.Article)
    }

    return Comment
};

