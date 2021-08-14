const jwt = require ("jsonwebtoken");
require("dotenv");
const newToken = "$2b$10$fJDZ1iSIogwxpkQ/dAY38.N33KQPEIBwTmBO0HcjXPJ"

//vérification de la validité du token
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, newToken);
        // const decodedToken = jwt.verify(token, '$2b$10$fJDZ1iSIogwxpkQ/dAY38.N33KQPEIBwTmBO0HcjXPJ');
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId != userId){
            throw 'Mauvais ID utilisateur !'
        }
        else{ 
            next();
        }
    }
    catch (error){
        res.status(401).json({error : "invalid token identification"
    });
    }

}