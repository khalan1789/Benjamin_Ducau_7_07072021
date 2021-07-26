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

      //verification si l'utilisateur n'est pas déjà existant
      let user = await db.User.findOne({ where: { lastname, firstname } })

      if (user) {
          return res.status(400).json({ error: "Utilisateur déjà existant..." });
      }
      else{
          bcrypt.hash(password, 10)
            .then(hash => {
                db.User.create({
                  firstname, lastname, email, password : hash
                })
                .then(()=>  res.status(201).json({ message: "Utilisateur créé avec succès !" }))
                .catch(error => res.status(333).json({ message : "erreur dans le db create"}))
              })
            .catch(error => res.status(488).json({error :"erreur dans le catch du bcrypt"}))
      }
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
          if(!user){
              return res.status(401).json({error :  "Utilisateur non trouvé !"})
          }
          bcrypt.compare(password, user.password)
                    .then( valid => {
                        if(!valid){
                            res.status(401).json({ error : " Mot de passe incorrect !" })
                        }
                        res.status(200).json({ 
                            userId : user.id,
                            token : jwt.sign(      
                                {userId : user.id},
                                'RANDOM_TOKEN_SECRET',
                                {expiresIn : '24h'}
                            )
                        })
                    })
                    .catch(error => res.status(500).json({ error : "erreur du bcrypt" }))
      })
      .catch(error => res.status(500).json({ error : "erreur du findOne" }))
  }
  catch (error){
    return res.status(500).json({ error : "c'est dans le catch du try-catch login" })
  }
}

