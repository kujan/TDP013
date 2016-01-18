var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    username = req.query.user;
    req.db.findUser(username, function(err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            var user = {};
            user['valid'] = false;
            res.json(user);
            res.end();
        }
        else {
            var user = {};
            user['valid'] = true;
            res.json(user);
            res.end();
        }
    });
});

module.exports = router;