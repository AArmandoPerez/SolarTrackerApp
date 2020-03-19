

$(document).ready(function () {


    GetRelativeHumidity();
    GetSolarPosition();
    //getTemperatureCpu();
    SolarPanelPosition();

    function GetSolarPosition() {

        var times = SunCalc.getTimes(new Date(), 51.5, -0.1);
        var sunrisePos = SunCalc.getPosition(new Date(), 23.6, -102.5)
        var sunriseAzimuth = sunrisePos.azimuth * 180 / Math.PI;
        console.log(sunriseAzimuth);
        console.log(sunrisePos);
        console.log(times);
        $("#h3azimut").text(parseInt(sunriseAzimuth) + "°");
        $("#lastazimut").text(moment().format('h:mm:ss a'));
    }



    function GetRelativeHumidity() {
        //oFrf80vC2oHIGV91kGPx0Db9yOZArLoh
        //kTnd7AxjWopHBnCd7uGT6xhRGyxAVjHx
        var settings = {
            'cache': false,
            'dataType': "jsonp",
            "async": true,
            "crossDomain": true,
            "url": "https://dataservice.accuweather.com/currentconditions/v1/242560?apikey=oFrf80vC2oHIGV91kGPx0Db9yOZArLoh&language=es-ES&details=true",
            "method": "GET",
            "headers": {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        }

        $.ajax(settings).done(function (response) {

            $("#relativeHumedityH3").text(response[0].RelativeHumidity + "%");
            $("#lastHumedity").text(moment().format('h:mm:ss a'));
           
        });


    }


    function SolarPanelPosition() {


        /// falta implementar funcion  de seguimiento por azimut y altura asi como rastreao solar se imolemeta esto para efecto de demostracion
       
        var currentTime =  moment().format('H');
        if (currentTime < 11) {
            $("#h3panelAngule").text("20°");   
        } else {

            if (currentTime < 15) {
                $("#h3panelAngule").text("80°"); 
            } else {
                $("#h3panelAngule").text("160°"); 
            }
        }
 






    }


    function getTemperatureCpu() {

        $.ajax({
            type: "POST",
            url: "../Home/GetCpuTemperature",
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                console.log("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
            },
            success: function (result) {
                console.log(result)



            }
        });


    }




    //window.setInterval(function () {
    //    GetRelativeHumidity();
    //}, 16000);

    window.setInterval(function () {
        GetSolarPosition();
       
    }, 25000);

    window.setInterval(function () {
        //getTemperatureCpu()
    }, 25000);

});