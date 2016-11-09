var express = require('express');
var Article = require('../model').Article;
var author = require('../author');
var router = express.Router();
router.get('/add',author,function (req,res) {
    res.render('article/add',{title:'发表文章',article:''})
});
router.post('/add',author,function (req,res) {
    var id = req.query._id;
    var article = req.body;
    if(!id){
        article.user = req.session.user._id;
        Article.create(article).then(function (article) {
            res.redirect('/')
        },function (error) {
            res.redirect('back')
        });
    }else{
        Article.update({_id:id},article).then(function (article) {
            res.redirect('/article/detail/'+id)
        },function (err) {
            res.redirect('back')
        })
    }
});
router.get('/detail/:id',function (req,res) {
    var id = req.params.id;
    Article.findById(id).then(function (article) {
        res.render('article/detail',{title:article.title,article:article})
    })
});
router.get('/delete/:id',author,function (req,res) {
    var id = req.params.id;
    Article.remove({_id:id}).then(function (article) {
        res.redirect('/')
    },function (err) {
        res.redirect('back')
    })
});
router.get('/update/:id',author,function (req,res) {
    var id= req.params.id;
    Article.findById(id).then(function (article) {
        res.render('article/add', {title: '修改文章', article: article});
    });
});
module.exports = router;