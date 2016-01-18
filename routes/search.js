var express = require('express');
var router = express.Router();

router.get('/:query', function(req, res) {
    req.db.findUser(req.session.user, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result == null) {
            res.redirect('/login');
        }
        else if (req.sessionID == result.sid) {
            var search = req.params.query;
            console.log(search);
            console.log("adsf");
            req.db.getColl(function (err, result) {
                result.find({
                     
                        "username": search
                    
                }/*,
                {
                    username: 1,
                    _id: 1,
                    textScore: {
                        $meta: "textScore"
                    }
                },
                {
                    sort: {
                        textScore: {
                            $meta: "textScore"
                        }
                    }
                }*/).toArray(function (err, result) {
                    if (err) {
                        console.log(err)
                    }
                    res.write(JSON.stringify(result));
                    res.end();
                });
            });
        }
        else {
            res.redirect('/login');
        }
    });

});
    


module.exports = router;