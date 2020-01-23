var city = "KansasCity,MO"
var latLon ="-94.578559,39.099792"
var resApi = "o0XevQpqpVayxArGM1iZ5UuLTnHchJUr"
var resUrl = "https://www.mapquestapi.com/search/v2/radius?origin="+city+"&radius=100&maxMatches=20"+"&ambiguities=ignore"+"&hostedData=mqap.ntpois|group_sic_code=?|581208"+"&outFormat=json"+"&key="+resApi
var LatlonSearch = "https://www.mapquestapi.com/search/v2/radius?="+ latLon+"&radius=1&maxMatches=20&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json"+"&key="+resApi
$.ajax({
        url : resUrl,
        method : 'GET'
    }).done(function (resResult){
        console.log(resResult)
    })
console.log(resUrl)