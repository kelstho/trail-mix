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

$(document).on("click", ".myTrail", function(){
    var latLng = $(this).attr("dataloc")
    searchRes(latLng)
})

function searchRes(data){
    var restautant = data
    console.log(restautant)
    console.log(data)
$.ajax({
        url : "https://www.mapquestapi.com/search/v2/radius?=" + restautant + "&radius=1&maxMatches=4&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json"+"&key="+"o0XevQpqpVayxArGM1iZ5UuLTnHchJUr",
        method : 'GET'
    }).done(function (data){
        console.log(data)
        var widget1 = show1(data);
        $("#first").html(widget1);
        var widget2 = show2(data);
        $("#second").html(widget2);
        var widget3 = show3(data);
        $("#third").html(widget3);
        var widget4 = show4(data);
        $("#fourth").html(widget4);
        })
} 

function show1(data){
    return  "<h1>"+data.searchResults[0].name+"</h1>" +
            "<h2>"+data.searchResults[0].fields.address+ " " + data.searchResults[0].fields.city+ " " +data.searchResults[0].fields.state+ "</h2>" +
            "<h2>Distance: "+data.searchResults[0].distance+" "+data.searchResults[0].distanceUnit+"</h2>"
}
function show2(data){
    return  "<h1>"+data.searchResults[1].name+"</h1>" +
            "<h2>"+data.searchResults[1].fields.address+ " " + data.searchResults[1].fields.city+ " " +data.searchResults[1].fields.state+ "</h2>" +
            "<h2>Distance: "+data.searchResults[1].distance+" "+data.searchResults[1].distanceUnit+"</h2>"
}
function show3(data){
    return  "<h1>"+data.searchResults[2].name+"</h1>" +
            "<h2>"+data.searchResults[2].fields.address+ " " + data.searchResults[2].fields.city+ " " +data.searchResults[2].fields.state+ "</h2>" +
            "<h2>Distance: "+data.searchResults[2].distance+" "+data.searchResults[2].distanceUnit+"</h2>"
}
function show4(data){
    return  "<h1>"+data.searchResults[3].name+"</h1>" +
            "<h2>"+data.searchResults[3].fields.address+ " " + data.searchResults[3].fields.city+ " " +data.searchResults[3].fields.state+ "</h2>" +
            "<h2>Distance: "+data.searchResults[3].distance+" "+data.searchResults[3].distanceUnit+"</h2>"
}
