// $('#location-search').on('click', function() {
//     var location = $('#location-start').val();
//     var mapquestQuery = 'http://open.mapquestapi.com/geocoding/v1/address?key=zFTKFOl5heUyBHHsvaEVGGlUnB0XQipR&location=' + location;
//     $.ajax({
//         url : mapquestQuery,
//         method : 'GET',
//     }).done(function (geoLocate) {
//         console.log(geoLocate)
//         var lat = geoLocate.results[0].locations[0].latLng.lat;
//         console.log(lat);
//         var lon = geoLocate.results[0].locations[0].latLng.lng;
//         console.log(lon);
//         var trailFindQuery = 'https://www.mtbproject.com/data/get-trails?lat=' + lat + '&lon=' + lon + '&key=200670702-d6c5c4298cb260abb7cfae993c480ef4';
//         $.ajax({
//             url : trailFindQuery,
//             method : 'GET',
//         }).done(function (response) {
//             console.log(response)
//         });
//     });
// })

var latLon ="-94.578559,39.099792"
var resApi = "o0XevQpqpVayxArGM1iZ5UuLTnHchJUr"
var resUrl = "https://www.mapquestapi.com/search/v2/radius?="+ latLon+"&radius=1&maxMatches=20&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json"+"&key="+resApi
$.ajax({
        url : resUrl,
        method : 'GET'
    }).done(function (resResult){
        console.log(resResult)
    })
console.log(resUrl)