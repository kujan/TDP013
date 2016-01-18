var express = require('express');
var router = express.Router();

function getMessages(id, res, req) {
  req.db.findId(id, function (err, result) {
    if (err) {
      console.log(err);
    }
    var msgs = result.messages.reverse()
    res.render('index', { title: 'Kvitter', messages: msgs, user: result.username,
    friends: result.friends, currentUser: result.username});
  }); 
}

router.get('/', function(req, res) {
    req.db.findUser(req.session.user, function (err, result) {
      if (err) {
          console.log(err);
      }
      if (result == null) {
        res.redirect('/login');
      }
      else if (req.sessionID == result.sid) {
        getMessages(result._id, res, req);
      }
      else {
      res.redirect('/login');
    }
  });
});
module.exports = router;
