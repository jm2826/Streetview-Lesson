
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

    var streetStr = $('#street').val()
    var cityStr = $('#city').val()
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + address + '&key=API_KEY&signature=SIGNATURE';
    //var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&fov=90&heading=235&pitch=10&key=API_KEY&signature=SIGNATURE';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');

    // NYTimes AJAX request
    var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' +cityStr + '&sort=newest&api-key=7d50be876e044054a718f0d5b8233c95';
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
    }).error(function(_e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });
    //Wikipedia AJAX Request
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        success: function( response ) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++){
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' +
                    articleStr + '</a></li>');
            };
        }
    });
    return false;
};

$('#form-container').submit(loadData);
