pageLoaded = false;

window.onload = function() {
  pageLoaded = true;
}

function rot(str, n) {
  if(n < 0) { n = n + 26 }

  return str.replace(/[a-zA-Z]/g, function(chr) {
    var start = chr <= 'Z' ? 65 : 97;
    return String.fromCharCode(start + (chr.charCodeAt(0) - start + n) % 26);
  });
}

function checkDone(pred) { 
  if(pageLoaded && pred()) {
    checkAnswer('ok');
  } else {
    setTimeout(checkDone, 1000, pred)
  }
}

$(function() {
  $('input#answer').keyup(function(e) {
    checkAnswer(event.target.value);
  });
});

function checkAnswer(ans) {
    $.ajax('/check', {
        data: {question: window.location.pathname.match(/\/(\w+)/)[1] , answer: ans}, 
        success: function(res) {
          if(confirm('correct! continue to next question?')) {
            window.location = res;
          }
        }, 
        failure: function() {
          //just means the answer is not correct yet
        }
    });
}


