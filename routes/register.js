var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('register', { title: 'Register' });
});

router.post('/', function(req, res) {
    user = req.body.user;
    pass = req.body.password;
    console.log(user,pass);
    newUser = {"username":user, "password":pass, 'friends':[], 'sid':req.sessionID, 'messages':[]};
    req.db.getColl(function(err, result) {
        result.insert(newUser, function (err, inserted) {
            if (err) {
                console.log(err);
            }
            //console.log(inserted);
        })
    })
    res.redirect('/');
});
module.exports = router;