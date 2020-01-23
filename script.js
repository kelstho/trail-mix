

$('#location-search').on('click', function() {
    var location = $('#location-start').val();
    var mapquestQuery = 'http://open.mapquestapi.com/geocoding/v1/address?key=zFTKFOl5heUyBHHsvaEVGGlUnB0XQipR&location=' + location;
    $.ajax({
        url : mapquestQuery,
        method : 'GET',
    }).done(function (geoLocate) {
        console.log(geoLocate)
        var lat = geoLocate.results[0].locations[0].latLng.lat;
        console.log(lat);
        var lon = geoLocate.results[0].locations[0].latLng.lng;
        console.log(lon);
        var trailFindQuery = 'https://www.mtbproject.com/data/get-trails?lat=' + lat + '&lon=' + lon + '&maxResults=5&key=200670702-d6c5c4298cb260abb7cfae993c480ef4';
        $.ajax({
            url : trailFindQuery,
            method : 'GET',
        }).done(function (response) {
            response.trails.forEach( function (newTrail) {
                var newRow = $('<tr>');
                var newName = $('<td>');
                var newLoc = $('<td>');
                var newLeng = $('<td>');
                newName.text(newTrail.name);
                newLoc.text(newTrail.location);
                newLeng.text(newTrail.length + 'miles');
                newRow.append(newName);
                newRow.append(newLoc);
                newRow.append(newLeng);
                
            });
            console.log(response)
        });
    });
})


