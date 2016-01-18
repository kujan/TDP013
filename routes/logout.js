var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    req.db.findUser(req.session.user, function (err, result) {
      if (err) {
          console.log(err);
      }
      if (result == null) {
        res.redirect('/login');
      }
      else if (req.sessionID == result.sid) {
        req.session.destroy(function (err) {
	        if (err) {
	            console.log(err);
	        }
	        res.redirect('/login');
    });
      }
     	else {
      		res.redirect('/login');
    	}
 	});

});

module.exports = router;