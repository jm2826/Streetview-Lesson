
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var streetStr = $('#street').val()
    var cityStr = $('#city').val()
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'https://maps.googlepis.com/maps/api/streetview?size=600x300&location=' + address + '&key=AIzaSyBe1dwoMeTl_RlCnSxnd5hPdC0XVlZ-s4M&signature=pGBkepBP3tsViJPDSwheEpk8AhU=';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // NYTimes AJAX request
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +cityStr + '&sort=newest&api-key=7d50be876e044054a718f0d5b8233c95'
    $.getJSON(nytimesUrl, function (data) {

        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        articles = data.response.docs;
        for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+
                '<a href="'+article.web_url+'">'+article.headline.main+
                    '</a>'+
                '<p>' + article.snippet + '</p>'+
            '</li>');
        };
    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });
    return false;
};

$('#form-container').submit(loadData);
