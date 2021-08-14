const { DataTypes } = require("sequelize"); 

// modèle sequelize pour la table User et associations
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',{
        firstname:{
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastname:{
            type: DataTypes.STRING(75),
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING(100),
            allowNull: false,
            unique :true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        profileImageUrl:{
            type : DataTypes.STRING
        }, 
        isAdmin:{
            type: DataTypes.BOOLEAN,
            defaultValue : false
        }
    })

    
    User.associate = (models) => {
    // association table users avec celles des articles
        User.hasMany(models.Article, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        });
  
    // association table users avec celles des commentaires
        User.hasMany(models.Comment, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        })

    // association table users avec celles des likes
        User.hasMany(models.Like, {
            foreignKey: {
                allowNull: false
            },
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
        })
    };

    return User  
};

