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
    console.log('done')
  } else {
    setTimeout(checkDone, 100, pred)
  }
}

$(function() {
  $('input#answer').keyup(function(e) {
    $.get('/check', {question: window.location.pathname.match(/\/(\w+)/)[1] , answer: event.target.value}, function(res) {
      console.log(res);
    });
  });
});
