var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    user = req.query.user;
    pass = req.query.pass;
    req.db.findUser(user, function (err, result){
       if (err) {
           console.log('error: ' + err);
       }
    validate(result, user, pass, res, req);
    });
});

function validate(result, user, pass, res, req) {

    if (result == null) {
        res.redirect("/register");
        return;
    }

    if (result.username == user && result.password == pass) {
        req.db.getColl(function (err, result) {
            result.findAndModify(
            {
                "username": user
            },
                [],
            {"$set": {"sid": req.sessionID}},
            { new: true },
            function(err, result) {
                if (err) {
                    console.log('error: ' + err);
                    err_500(res);
                }
                else if (result) {
                    req.session.user = user;
                    req.user = user;
                    res.redirect('/');
                }
            }
        )});
    }
    else {
        console.log("Validation failed - is Mongo running?")
        res.redirect("/register")
    }
}

module.exports = router;