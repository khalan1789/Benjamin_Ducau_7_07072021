const { DataTypes } = require("sequelize"); 

module.exports = (sequelize, DataTypes) => {
    const Like = sequelize.define('Like',{
        
    })

    
    Like.associate = (models) => {
        // association table likes avec celles des users
        Like.belongsTo(models.User);
        // association table likes avec celles des articles
        Like.belongsTo(models.Article)
    }

    return Like
};

