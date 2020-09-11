$('#location-search').on('click', function () {
    $('.all-results').empty();
    var location = $('#location-start').val();
    var mapquestQuery = 'https://open.mapquestapi.com/geocoding/v1/address?key=zFTKFOl5heUyBHHsvaEVGGlUnB0XQipR&location=' + location;
    $.ajax({
        url: mapquestQuery,
        method: 'GET',
    }).done(function (geoLocate) {
        console.log(geoLocate)
        var lat = geoLocate.results[0].locations[0].latLng.lat;
        console.log(lat);
        var lon = geoLocate.results[0].locations[0].latLng.lng;
        console.log(lon);
        var trailFindQuery = 'https://www.mtbproject.com/data/get-trails?lat=' + lat + '&lon=' + lon + '&maxResults=5&sort=distance&key=200670702-d6c5c4298cb260abb7cfae993c480ef4';
        $.ajax({
            url: trailFindQuery,
            method: 'GET',
        }).done(function (response) {
            var iter = 0;
            $('.results-header').text('Trails Located Near ' + location);
            $('.results-header').removeAttr('id');
            response.trails.forEach(function (newTrail) {
                var newtarg = 'targ' + iter;
                var newRow = $('<div>');
                var newPic = $('<div>');
                var newImg = $('<img>');
                var newName = $('<div>');
                var newLoc = $('<div>');
                var newLeng = $('<div>');
                var newFood = $('<div>');
                newRow.attr({ class: 'myTrail row', dataloc: newTrail.latitude + ',' + newTrail.longitude, datatarget: newtarg });
                newImg.attr('src', newTrail.imgSqSmall);
                newPic.attr('class', 'col s12 m3 trail-image');
                newName.attr('class', 'col s12 m3 trail-results');
                newLoc.attr('class', 'col s12 m3 trail-results');
                newLeng.attr('class', 'col s12 m3 trail-results');
                newFood.attr('class', 'row food-row ' + newtarg);
                newPic.append(newImg);
                newName.text(newTrail.name);
                newLoc.text(newTrail.location);
                newLeng.text('Trail Length: ' + newTrail.length + ' miles');
                newFood.text('Click above to show or hide restaurants for that trail.');
                newRow.append(newPic);
                newRow.append(newName);
                newRow.append(newLoc);
                newRow.append(newLeng);
                $('.all-results').append(newRow);
                $('.all-results').append(newFood);
                iter = ++iter;
            });
            console.log(response);
        });
    });
});

$(document).on("click", ".myTrail", function () {
    var latLng = $(this).attr("dataloc");
    var myTarg = $(this).attr('datatarget');
    searchRes(latLng, myTarg);
});

function searchRes(myLoc, target) {
    var myUrl = "https://www.mapquestapi.com/search/v2/radius?origin=" + myLoc + "&radius=10&maxMatches=4&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key=o0XevQpqpVayxArGM1iZ5UuLTnHchJUr";
    $.ajax({
        url: myUrl,
        method: 'GET'
    }).done(function (data) {
        var targetDiv = $('.' + target);
        if (targetDiv.html() === 'Click above to show or hide restaurants for that trail.') {
            targetDiv.empty();
            for (i = 0; i < data.searchResults.length; ++i) {
                var restraunt = data.searchResults[i];
                var myResult = $('<div>');
                var nameDiv = $('<div>');
                var locDiv = $('<div>');
                var distDiv = $('<div>');
                myResult.attr('class', 'col s12 m3 food-results');
                nameDiv.attr('class', 'rest-name');
                locDiv.attr('class', 'rest-address');
                distDiv.attr('class', 'rest-distance');
                nameDiv.text(restraunt.name);
                locDiv.text(restraunt.fields.address + " " + restraunt.fields.city + " " + restraunt.fields.state);
                distDiv.text('Distance: ' + restraunt.distance + " " + restraunt.distanceUnit);
                myResult.append(nameDiv);
                myResult.append(locDiv);
                myResult.append(distDiv);
                targetDiv.append(myResult);
            };
        } else {
            targetDiv.empty();
            targetDiv.text('Click above to show or hide restaurants for that trail.');
        };
    });
};