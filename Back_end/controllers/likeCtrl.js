const db = require("../models");

exports.likeArticle = async (req, res) => {
    try {
        // const id = req.body.id
        const UserId = req.body.userId
        const ArticleId = req.body.articleId
        const rate = req.body.rate
        console.log("id : " + ArticleId + "/ " + UserId + "/ "+ rate + "/ ")

        if( rate == 1 ){
            await db.likeArticle.create({ UserId, ArticleId })
            .then(()=>  res.status(201).json({ message: "Like ajouté avec succès !" }))
            .catch(error => res.status(500).json({ error : "erreur lors de l'ajout du like"}))
        } else {
            console.log("n'a pas pris le cas 1!")
        }
        // switch (rate){
        //     case 1 : 
        //     await db.likeArticle.create({ UserId, ArticleId })
        //     .then(()=>  res.status(201).json({ message: "Like ajouté avec succès !" }))
        //     .catch(error => res.status(500).json({ error : "erreur lors de l'ajout du like"}))
        //     break;

        //     case 0 : 
        //     await db.likeArticle.destroy({ where : { id }})
        //     .then(()=>  res.status(201).json({ message: "Like supprimé !" }))
        //     .catch(error => res.status(500).json({ error : "erreur lors de la création de l'article"}))
        //     break;
        // }
    } catch (error) {
        return res.status(500).json({ error : "erreur serveur" });
    }
}