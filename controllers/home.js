const models = require("../models");
const art = models.articles;
const User = models.users;
const cat = models.categories;
const com = models.comments;

// Get All articless
exports.index = (req, res) => {
 console.log("get all artilces");
 art
  .findAll({
   include: [{model: User, as: "author"}]
  })
  .then(some => res.send(some))
  .catch(err => res.send(err));
};

///get latest articles
exports.pop = (req, res) => {
 console.log("get popular by latest date");
 art
  .findAll({
   where: {is_published: (req.params.is_published = true)},
   order: [["createdAt", "DESC"]],
   include: [{model: User, as: "author"}],
   limit: 10
  })
  .then(some => res.send(some))
  .catch(err => res.send(err));
};

//show article detail with all attribute relate to article table
exports.show = (req, res) => {
 console.log("get specific one");
 art
  .findOne({
   where: {id: req.params.id},
   include: [{model: com, as: "comment"}, {model: cat, as:"category", include: [
    {model: art, as: "article", include: [{model: User, as: "author"}], limit:3}
   ]}]
  })
  .then(some => res.send(some))
  .catch(err => res.send(err));
};

///article by category
exports.getCat = (req, res) => {
 console.log("get Article by category");
 cat
  .findOne({
   where: {id: req.params.id},

   include: [
    {model: art, as: "article", include: [{model: User, as: "author"}]}
   ]
  })
  .then(some => res.send(some))
  .catch(err => res.send(err));
};

///post new article
exports.store = (req, res) => {
 art.create(req.body).then(some => {
  res.send({
   message: "success",
   some
  });
 });
};

//delete article
exports.delete = (req, res) => {
 art.destroy({where: {id: req.params.id}}).then(todo => {
  res.send({
   message: "success",
   todo
  });
 });
};
