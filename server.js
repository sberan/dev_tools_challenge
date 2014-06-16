var express = require('express'),
    app = express();

app.use(function(req, res, next) {
  console.log(req.url);
  console.log(req.url, req.url == '/doge3.jpeg');
  if(req.url == '/doge3.jpeg') {
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
  test4 : 'dev tools rocks!',
  test5 : 'doge3',
  test6 : 'to_the_moon',
  test7 : 'Iowa Hawkeyes'
};

app.get('/check', function(req, res) {
  if(answerKey[req.query.question] && answerKey[req.query.question] === req.query.answer) {
    res.send('correct!')
  } else {
    res.send(400, 'incorrect!');
  }
})

app.get('/', function(req,res) {
  res.send("ok");
});
app.listen(process.env.PORT || 3000)


