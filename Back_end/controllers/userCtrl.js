const db = require("../models");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
      const lastname = req.body.lastname; 
      const firstname = req.body.firstname;
      const email = req.body.email;
      const password = req.body.password;
      console.log(lastname + " / " + firstname + " / " + email + " / " + password);

      if (!lastname || !firstname || !password || !email ) {
        return res.status(400).json({ error: "Informations manquantes...." });
      };

      db.User.findOne({ where: { email } })
      .then(user =>{
        if (user) {
          return res.status(400).json({ error: "Utilisateur déjà existant..." });
        }
        else{
          bcrypt.hash(password, 10, function( err, bcryptedPassword){
          db.User.create({
              firstname, lastname, email, password : bcryptedPassword, isAdmin : 0
          })
          .then(()=>  res.status(201).json({ message: "Utilisateur créé avec succès !" }))
          })
          .catch(error => res.status(488).json({error :"erreur dans le else du bcrypt"}))
        }
      })
      .catch(error => res.status(499).json({error : "erreur dans le findOne"}));

  } catch (error) {
      return res.status(500).json({ error : "c'est dans le catch du try-catch" });
  }
};

exports.login = async (req, res) => {
  try {
      const email = req.body.email;
      const password = req.body.password;
      if(!email || !password){
        return res.status(400).json({ error: "Tous les champs doivent être renseignés !" });
      }

      db.User.findOne({ where : { email }})
      .then(user => {
        if(user){
          if(user.password != password){
            return res.status(401).json({error : "Mot de passe invalide"})
          }
          bcrypt.compare(password, user.password)
                    .then( valid => {
                        if(!valid){
                            res.status(401).json({ error : " Mot de passe incorrect !" })
                        }
                        res.status(200).json({ 
                            userId : user._id,
                            token : jwt.sign(      
                                {userId : user._id},
                                'RANDOM_TOKEN_SECRET',
                                {expiresIn : '24h'}
                            )
                        })
                    })
                    .catch(error => res.status(500).json({ error : "erreur du bcrypt" }))
          
        }else{
          return res.status(401).json({error : "Utilisateur non trouvé !"})
        }

      })
      .catch(error => res.status(500).json({ error : "erreur du findOne" }))
      

  }
  catch (error){
    return res.status(500).json({ error : "c'est dans le catch du try-catch login" })
  }
}

