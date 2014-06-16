var express = require('express')
var session = require('cookie-session')

var app = express();

app.use(session({
    keys: ['key1', 'key2'],
    secureProxy: true // if you do SSL outside of node
}))


app.use(function(req, res, next) {
  console.log(req.url);
  if(req.url.match(/^test.*/i) && req.url != '/test1.html') {
    if(!req.session[req.url]) {
      res.send(400, 'no cheating!');
      return;
    }
  }
  if(req.url == '/doge3.jpeg' || req.query.t == 'y') {
    setTimeout(function() {
       res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0');
       next();
    }, 1200);
  } else if(req.url == '/test6.html') {
    res.cookie('test6', 'to_the_moon');
    next();
  } else {
    next();
  }
});

app.use(express.static(__dirname + "/public"));

app.get('/hello', function(req, res) {
  res.send('dev tools rocks!')
})

var answerKey = {
  test1 : {answer: 'ok', next: 'test2.html'},
  test2 : {answer: 'ok', next: 'test3.html'},
  test3 : {answer: 'ok', next: 'test4.html'},
  test4 : {answer: 'dev tools rocks!', next: 'test5.html'},
  test5 : {answer: 'doge3.jpeg', next: 'test6.html'},
  test6 : {answer: 'to_the_moon', next: 'test7.html'},
  test7 : {answer: 'Iowa Hawkeyes', next: 'test8.html'},
  test8 : {answer: 'almost done!', next: 'test9.html'},
  test9 : {answer: 'done!', next: 'complete.html'}
};

app.get('/check', function(req, res) {
  var key = answerKey[req.query.question] ;
  if(key && key.answer === req.query.answer) {
    req.session[key.next] = true;
    res.send(key.next)
  } else {
    res.send(400, 'incorrect!');
  }
});

app.get('/', function(req,res) {
  res.redirect("test1.html");
});

app.listen(process.env.PORT || 3000)
