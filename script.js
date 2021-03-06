// Initial trail search function
$('#location-search').on('click', function () {
  $('.results-header').text('Searching...');
  $('.results-header').removeAttr('id');
  $('.all-results').empty();
  var location = $('#location-start').val();
  var mapquestQuery = 'https://open.mapquestapi.com/geocoding/v1/address?key=zFTKFOl5heUyBHHsvaEVGGlUnB0XQipR&location=' + location;
  $.ajax({
    url: mapquestQuery,
    method: 'GET',
  }).done(function (geoLocate) {
    var lat = geoLocate.results[0].locations[0].latLng.lat;
    var lon = geoLocate.results[0].locations[0].latLng.lng;
    var trailFindQuery = 'https://www.mtbproject.com/data/get-trails?lat=' + lat + '&lon=' + lon + '&maxResults=5&sort=distance&key=200670702-d6c5c4298cb260abb7cfae993c480ef4';
    $.ajax({
      url: trailFindQuery,
      method: 'GET',
    }).done(function (response) {
      var iter = 0;
      if (response.trails.length === 0) {
        $('.results-header').text('Sorry, looks like there are no trails near ' + location);
        return
      }
      $('.results-header').text('Trails Located Near ' + location);
      response.trails.forEach(function (newTrail) {
        var newtarg = 'targ' + iter;
        var newRow = $('<div>');
        var newPic = $('<div>');
        var newImg = $('<img>');
        var newName = $('<a>');
        var newLoc = $('<div>');
        var newLeng = $('<div>');
        var newFood = $('<div>');
        newRow.attr({ class: 'myTrail center row', dataloc: newTrail.latitude + ',' + newTrail.longitude, datatarget: newtarg });
        newImg.attr('src', newTrail.imgSqSmall);
        if (newTrail.imgSqSmall === "") {
          newImg.attr('src', 'assets/no_image.jpg');
          newImg.attr('class', 'no-image');
        }
        newPic.attr('class', 'col s12 m3 trail-image');
        newName.attr('class', 'col s12 m3 trail-results');
        newName.attr('href', newTrail.url);
        newName.attr('target', '_blank');
        newLoc.attr('class', 'col s12 m3 trail-results');
        newLeng.attr('class', 'col s12 m3 trail-results');
        newFood.attr('class', 'row food-row ' + newtarg);
        newPic.append(newImg);
        newName.text(newTrail.name);
        newLoc.text(newTrail.location);
        newLeng.text('Trail Length: ' + newTrail.length + ' miles');
        newFood.text("Click on trail picture to show or hide restaurants located near that trail's endpoint.");
        newRow.append(newPic);
        newRow.append(newName);
        newRow.append(newLoc);
        newRow.append(newLeng);
        $('.all-results').append(newRow);
        $('.all-results').append(newFood);
        iter = ++iter;
      });
    });
  });
});

// If enter button is pressed, search will be run
$('#location-start').keypress(function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    $('#location-search').click();
  }
});

// Clicking on the div containing the trail will search for
// and reveal restaurants near the end of selected trail
$(document).on("click", ".myTrail", function () {
  var latLng = $(this).attr("dataloc");
  var myTarg = $(this).attr('datatarget');
  searchRes(latLng, myTarg);
});

// Function to search for restaurants
function searchRes(myLoc, target) {
  var myUrl = "https://www.mapquestapi.com/search/v2/radius?origin=" + myLoc + "&radius=10&maxMatches=4&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key=o0XevQpqpVayxArGM1iZ5UuLTnHchJUr";
  $.ajax({
    url: myUrl,
    method: 'GET'
  }).done(function (data) {
    var targetDiv = $('.' + target);
    if (targetDiv.html() === "Click on trail picture to show or hide restaurants located near that trail's endpoint.") {
      targetDiv.empty();
      for (i = 0; i < data.searchResults.length; ++i) {
        var restaurant = data.searchResults[i];
        var myResult = $('<div>');
        var nameDiv = $('<div>');
        var locDiv = $('<div>');
        var distDiv = $('<div>');
        myResult.attr('class', 'col s12 m3 food-results');
        nameDiv.attr('class', 'rest-name');
        locDiv.attr('class', 'rest-address');
        distDiv.attr('class', 'rest-distance');
        nameDiv.text(restaurant.name);
        locDiv.text(restaurant.fields.address + " " + restaurant.fields.city + " " + restaurant.fields.state);
        distDiv.text('Distance: ' + restaurant.distance.toFixed(1) + " " + " miles");
        myResult.append(nameDiv);
        myResult.append(locDiv);
        myResult.append(distDiv);
        targetDiv.append(myResult);
      };
    } else {
      targetDiv.empty();
      targetDiv.text("Click on trail picture to show or hide restaurants located near that trail's endpoint.");
    };
  });
};
