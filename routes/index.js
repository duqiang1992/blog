var express = require('express');
var Article = require('../model').Article;
var router = express.Router();
router.get('/',function (req,res) {
    Article.find({},function (err,articles) {
        res.render('index',{title:'微博',articles:articles});
})
});
module.exports = router;