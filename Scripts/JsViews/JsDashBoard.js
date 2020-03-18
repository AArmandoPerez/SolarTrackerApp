
$(document).ready(function () {


    //GetRelativeHumidity();
    GetSolarPosition();

    function GetSolarPosition() {

        var times = SunCalc.getTimes(new Date(), 51.5, -0.1);
        var sunrisePos = SunCalc.getPosition(new Date(), 23.6, -102.5)
        var sunriseAzimuth = sunrisePos.azimuth * 180 / Math.PI;
        console.log(sunriseAzimuth);
        console.log(times);
        $("#h3azimut").text(parseInt(sunriseAzimuth) + "°");
        $("#lastazimut").text(moment().format('h:mm:ss a'));
    }
   

    function GetRelativeHumidity() {
     
        var settings = {
            'cache': false,
            'dataType': "jsonp",
            "async": true,
            "crossDomain": true,
            "url": "https://dataservice.accuweather.com/currentconditions/v1/242560?apikey=kTnd7AxjWopHBnCd7uGT6xhRGyxAVjHx&language=es-ES&details=true",
            "method": "GET",
            "headers": {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }

        $.ajax(settings).done(function (response) {

            $("#relativeHumedityH3").text(response[0].RelativeHumidity);
            $("#lastHumedity").text(moment().format('h:mm:ss a'));
            console.log(response[0].RelativeHumidity);

        });


    }


    window.setInterval(function () {
        GetRelativeHumidity();
    }, 16000);

    window.setInterval(function () {
        GetSolarPosition();
    }, 25000);

});