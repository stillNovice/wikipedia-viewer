var isSearchTextChanged = false;
var $searchText, $searchBtn, $searchResultDiv, $randomArticleDiv, $h1, $searchIconAtStart, $actualSearch;

$(document).ready(function() {
  $searchText = $('.searchText');
  $searchBtn = $('.searchBtn');
  $searchResultDiv = $('#searchResultDiv');
  $randomArticleDiv = $('.randomArticleDiv');
  $h1 = $('h1');
  $searchIconAtStart = $('.searchIconAtStart');
  $actualSearch = $('.actualSearch');

  $searchText.keyup(function(event) {
    if(event.keyCode == 13) {
      $searchBtn.click();
    }

    event.preventDefault();
  });

  $searchText.on('change', function(event) {
    isSearchTextChanged = true;
  });

  $searchBtn.on('click', function(event) {
    if(isSearchTextChanged == false) {
      return;
    }

    isSearchTextChanged = false;

    var searchText = $searchText.val().trim();

    if(searchText == "") {
      $searchText.val('');
      return;
    }

    // Remove other components from DOM
    $h1.slideUp('slow');
    $randomArticleDiv.fadeOut('slow');

    showSearchResult(searchText);

    event.preventDefault();
  });

});

function showSearchResult(searchText) {
  var baseUrl = 'https://en.wikipedia.org/w/api.php';
  $.ajax({
    url: baseUrl,
    data: {
      action: 'query',
      list: 'search',
      srsearch: searchText,
      format: 'json'
    },
    dataType: 'jsonp',
    success: function(data) {
      populateCards(data);
    },
    failure: function(err) {
      console.error(err);
    }
  })
}

function populateCards(data) {
  console.log('data', data);
  var resultString = "";
  // when search result is empty
  if(!(data.query.search && data.query.search.length)) {
    resultString += '<p class="text-center" style="font-weight: bold; font-size: 48px;">Nothing To Show Here!!!</p>';
  } else {
    for (var i = 0; i < data.query.search.length; i++) {
      var obj = data.query.search[i];

      resultString += '<div class="row justify-content-md-center">';
      resultString += '<div class="col-8">';
      resultString += '<div class="card">';
      resultString += '<div class="row">';
      resultString += '<div class="col-4">';

      resultString += ' <img class="img-fluid logoOnCard" src="http://www.widewallpapershd.info/file/1338/728x544/16:9/puzzle-silver-globe_1660297167.jpg" alt="wikipedia logo">';
      resultString += '</div>';

      resultString += '<div class="col-8">';
      resultString += '<div class="card-body">';

      resultString += '<a href="https://en.wikipedia.org/wiki/' + obj.title.toString().split(' ').join('_') + '" target="_blank" style="text-decoration: none;">';
      resultString += '<h5 class="card-title">' + obj.title + '</h5></a>';

      resultString += '<p>' + obj.snippet + '</p>';
      resultString += '</div></div></div></div></div></div><br/>';
    }
  }

  console.log('resultString', resultString);

  $randomArticleDiv.remove();
  $searchResultDiv.html('');
  $searchResultDiv.append(resultString);
}

function showHideStuff() {
  $searchIconAtStart.fadeOut('', 'swing', function () {
    $actualSearch.fadeIn('slow', 'swing');
  });
}

