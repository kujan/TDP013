var express = require('express');
var router = express.Router();

router.post('/:message', function(req, res) {
	message = req.params.message;
    req.db.getColl(function(err, result) {
        result.findAndModify(
        {'username':req.session.user},
        [],
        {
            $push: {
                messages: {'message': message, 'poster':req.session.user}
            }
        },  function(err, result) {
                if (err) {
                    console.log('error: ' +  err);
                }
                res.end();
            }
        );
    });
});

router.post('/users/:user/:message', function(req, res) {
    message = req.params.message;
    user = req.params.user;
    poster = req.session.user;
    req.db.getColl(function(err, result) {
        result.findAndModify(
        {'username':user},
        [],
        {
            $push: {
                messages: {'message': message, 'poster':poster}
            }
        },  function(err, result) {
                if (err) {
                    console.log('error: ' + err);
                }
                res.end();
            }
        );
    });
});

module.exports = router;

