var colorChooser = ['#16a085', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

var currentQuote = '', currentAuthor = '';
var backgroundColor = "";

function inIFrame(){
    try{
        return window.top !== window.self;
    }
    catch(e)
    {
        return true;
    }
}

function openURL(url){
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=1 ,location=0 ,statusbar=0,menubar=0, resizable=0');
}

function getQuote() {
  $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(response) {
      var r = JSON.parse(response);
      currentQuote = r.quote;
      currentAuthor = r.author;
      if(inIFrame())
      {
        $('#tweet-quote').attr('href', 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
      }
      $(".quote-text").animate(
        { opacity: 0 }, 500,
        function() 
        {
          $(this).animate(
            { opacity: 1 }, 500);
          $('#quote').text(r.quote);
        });

      $(".quote-author").animate(
        { opacity: 0 }, 500,
        function() 
        {
          $(this).animate(
            { opacity: 1 }, 500);
          $('#author').html(r.author);
        });

      var colorVal = Math.floor(Math.random() * colorChooser.length);
      
      $("body,.button-click").css({"background-color":colorChooser[colorVal]});
      $(".quote-text,.quote-author").css({"color":colorChooser[colorVal]});
    }
  });
}

$(document).ready(function() {
  getQuote();
  $('#new-quote').on('click', getQuote);
  $('#tweet-quote').on('click', function() {
    if(!inIFrame()) {
      openURL('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    }
  }); 
});