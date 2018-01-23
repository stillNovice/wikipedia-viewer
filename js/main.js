//var showHideStuff;

$(document).ready(function() {

  $('.searchBtn').on('click', function() {
    var searchText = $('.searchText').val().trim();

    if(searchText == "") {
      $('.searchText').val('');
      return;
    }

    // Remove other components from DOM
    $('h1').slideUp('slow');
    $('.randomArticleDiv').fadeOut('slow');

    showSearchResult(searchText);
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
      format: 'json',
      cllimit: '20'
    },
    dataType: 'jsonp',
    success: function(data) {
      populateCards(data);
    }
  })
}

function populateCards(data) {
  console.log('data', data);
  var resultString = "";
  // when search result is empty
  if(!(data.query.search && data.query.search.length)) {
    resultString += '<p class="text-center" style="font-weight: bold; font-size: 48px;">Nothing to show here!!!</p>';
  } else {

  }

  console.log('resultString', resultString);
  
  $('#searchResultDiv').html('');
  $('#searchResultDiv').append(resultString);
}

function showHideStuff() {
  $('.searchIconAtStart').fadeOut('', 'swing', function () {
    $('.actualSearch').fadeIn('slow', 'swing');
  });
};

