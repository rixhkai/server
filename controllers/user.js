const models = require("../models");
const User = models.users;
const art = models.articles;
const com = models.comments;

exports.showAll = (req, res) => {
    console.log("get all artcles by user");
    User.findOne({
        where: {id: req.params.id},
        include: [{model: art, as: "article", include:[{model: com, as: "comment"}]}]
    })
    .then(some => res.send(some))
    .catch(err => res.send(err));
};

// exports.store = (req, res) => {
//     console.log("create comment");
//     com.create({
//         id: req.params.id,
//         article_id: {model: art, where: {id: id}}
//     })
// };