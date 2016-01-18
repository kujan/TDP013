var express = require('express');
var router = express.Router();

function checkUser(userData, user, res, req) {

	if (userData.friends.length == 0) {
		res.render('add-friend', {title: 'Add' + userData.username + 'as a friend'});
		return;
	}
    for (var index in userData.friends) {
  		if (userData.friends[index] == user) {
  			req.db.findUser(user, function(err, result) {
  				if (err) {
  					console.log(err);
				}
				userData = result;
				res.render('users', { title: userData.username,
				messages: userData.messages.reverse(), user: userData.username,
				friends: userData.friends, currentUser: req.session.user});
  			});
		}
		else if (index >= userData.friends.length -1) {
			res.render('add-friend', {title: userData.username + userData.username + 'as a friend'});
		}
	}
}

router.get('/:user', function(req, res) {
    req.db.findUser(req.session.user, function (err, result) {
	    if (err) {
	        console.log(err);
	    }
	    if (result == null) {
	        res.redirect('/login');
	    }
	    else if (req.sessionID == result.sid) {
    		user = req.params.user;
	      	userData = result;
	      	if (user == userData.username) {
	      		res.redirect('/');
	      	}
	      	else {
      			checkUser(userData, user, res, req);
	      	}
	    }
	    else {
	        res.redirect('/login');
	    }
    });
 });

router.post('/add/:user', function(req, res) {
    req.db.findUser(req.session.user, function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result == null) {
            res.redirect('/login');q
        }
        else if (req.sessionID == result.sid) {
    		var user = req.session.user;
			var friend = req.params.user;
			req.db.getColl(function (err, result) {
				result.findAndModify(
					{'username':user},
				    [],
				    {
				        $push: {
				            friends: friend
				        }
				    }, function(err, result) {
				        if (err) {
				            console.log(err);
				        }
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
