$('#location-search').on('click', function() {
    $('tbody').empty();
    $('.results-header').empty();
    var tableTitle = $('<h4>');
    tableTitle.attr('class', 'teal-text text-lighten-2');
    tableTitle.text('Trails');
    $('.results-header').append(tableTitle);
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
        var trailFindQuery = 'https://www.mtbproject.com/data/get-trails?lat=' + lat + '&lon=' + lon + '&maxResults=5&sort=distance&key=200670702-d6c5c4298cb260abb7cfae993c480ef4';
        $.ajax({
            url : trailFindQuery,
            method : 'GET',
        }).done(function (response) {
            response.trails.forEach( function (newTrail) {
                var newRow = $('<tr>');
                var newPic = $('<td>');
                var newImg = $('<img>');
                var newName = $('<td>');
                var newLoc = $('<td>');
                var newLeng = $('<td>');
                newRow.attr({class: 'myTrail' ,dataloc: newTrail.latitude + ',' + newTrail.longitude})
                newImg.attr('src', newTrail.imgSqSmall);
                newPic.append(newImg);
                newName.text(newTrail.name);
                newLoc.text(newTrail.location);
                newLeng.text(newTrail.length + 'miles');
                newRow.append(newPic);
                newRow.append(newName);
                newRow.append(newLoc);
                newRow.append(newLeng);
                $('tbody').append(newRow);
                
            });
            console.log(response)
        });
    });
})

var latLon ="-94.578559,39.099792"
var resApi = "o0XevQpqpVayxArGM1iZ5UuLTnHchJUr"
var resUrl = "https://www.mapquestapi.com/search/v2/radius?="+ latLon +"&radius=1&maxMatches=20&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json"+"&key="+resApi
function restaurant(data){
$.ajax({
        url : resUrl,
        type : 'GET',
        dataType: "jsonp",
    }).done(function (data){
        console.log(data)
        var widget1 = show(data);
        $("#first").html(widget1);
    })
}
function show(data){
    return "<h1>"
}
