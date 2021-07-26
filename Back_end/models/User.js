const { DataTypes } = require("sequelize"); 

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
    return User
}