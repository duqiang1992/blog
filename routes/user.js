var express = require('express');
var User = require('../model/index').User;
var router = express.Router();
var multer = require('multer');
//dest 指上传的文件的保存路径
var upload = multer({dest: 'public/uploads/'});
router.get('/signUp', function (req, res) {
    res.render('user/signUp', {title: '注册'})
});
router.post('/signUp', upload.single('avatar'), function (req, res) {
    var user = req.body;
    try {
        user.avatar = '/uploads/' + req.file.filename;
    }catch (e){
        user.avatar = '/uploads/2.jpg'
    }
    User.find({username: user.username}).then(function (olduser) {
        if (olduser.length >= 1) {
            res.redirect('back')
        } else {
            User.create(user).then(function (doc) {
                req.session.user = doc;
                res.redirect('/')
            }, function (err) {
                res.redirect('back')
            })
        }
    }, function (err) {
        res.redirect('back')
    })
});
router.get('/signIn', function (req, res) {
    res.render('user/signIn', {title: '登陆'})
});
router.post('/signIn', function (req, res) {
    var user = req.body;
    User.findOne(user).then(function (doc) {
        if (doc) {
            req.session.user = doc;
            res.redirect('/');
        } else {
            res.redirect('back')
        }
    }, function (err) {
        res.redirect('back')
    });
});
router.get('/signOut', function (req, res) {
    req.session.user = null;
    res.redirect('/')
});
module.exports = router;