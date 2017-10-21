$(document).ready(function() {

    var button_pressed = null;

    var streamChannels = [{
        name: "ESL_SC2",
        status: false
    }, {
        name: "OgamingSC2",
        status: false
    }, {
        name: "cretetion",
        status: false
    }, {
        name: "freecodecamp",
        status: false
    }, {
        name: "storbeck",
        status: false
    }, {
        name: "habathcx",
        status: false
    }, {
        name: "RobotCaleb",
        status: false
    }, {
        name: "noobs2ninjas",
        status: false
    }];

    streamChannels.forEach(function(element) {
        var url_channel = "https://wind-bow.gomix.me/twitch-api/channels/" + element.name + "?callback=?";
        var url_stream = "https://wind-bow.gomix.me/twitch-api/streams/" + element.name + "?callback=?";
        //console.log(url_channel);

        var html_div = "";

        $.getJSON(url_channel, function(json_channel) {
            var logo;
            if (json_channel.logo === null) {
                logo = "https://pre00.deviantart.net/1a10/th/pre/f/2015/291/5/1/logo_twitch_iosversion_by_akiruuu-d9djk9s.png";
            }
            else {
                logo = json_channel.logo;
            }

            html_div += '<div id="' + element.name + '-id" class="row result-div"><div class="col-xs-2 col-md-2 col-lg-2"><img class="img-responsive round-border" src="' + logo + '" alt="logo"></div><div class="col-xs-3 col-md-3 col-lg-3"><p class="text-result"><a href="' + json_channel.url + '" target="_blank"><i class="fa fa-twitch" aria-hidden="true"></i> ' + json_channel.display_name + '</a></p></div>';

            $.getJSON(url_stream, function(json_stream) {
                //console.log(json_stream);
                if (json_stream.stream !== null) {
                    html_div += '<div class="col-xs-6 col-md-6 col-lg-6"><p class="text-result">' + json_stream.stream.channel.status + '</p></div><div class="col-xs-1 col-md-1 col-lg-1"><p class="text-result"><i class="fa fa-check-circle" aria-hidden="true"></i></p></div></div>';

                    element.status = true;
                }
                else {
                    html_div += '<div class="col-xs-6 col-md-6 col-lg-6"><p class="text-result color-negative">-</p></div><div class="col-xs-1 col-md-1 col-lg-1"><p class="text-result color-negative"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></p></div></div>';

                    element.status = false;
                }

                $("#result-div-id").append(html_div).hide().fadeIn("fast");
            });
        });

    });

    // Show Online
    $("#btn-online-id").on("click", function() {
        //console.log(streamChannels);
        button_pressed = true;
        var arrFiltered = filterByInput(streamChannels);

        showStatus(button_pressed, arrFiltered);
    });

    // Show Offline
    $("#btn-offline-id").on("click", function() {
        //console.log(streamChannels);
        button_pressed = false;
        var arrFiltered = filterByInput(streamChannels);

        showStatus(button_pressed, arrFiltered);
    });

    // Show all
    $("#btn-all-id").on("click", function() {
        //console.log(streamChannels);
        button_pressed = null;
        var arrFiltered = filterByInput(streamChannels);

        showStatus(button_pressed, arrFiltered);
    });

    // Action in input
    $('#input-id').keyup(function(e){

        var array = showStatus(button_pressed, streamChannels);
        var arrFiltered = filterByInput(array);

        //console.log(arrFiltered);
        $("#result-div-id").children().fadeOut("fast");
        arrFiltered.forEach(function(element) {
            $("#" + element.name + "-id").fadeIn("fast");
        });
    });

    function showStatus (status, arrFiltered) {
        var array = [];

        if (status === null) {
            $("#result-div-id").children().fadeIn("fast");
            array = streamChannels;
        }
        else {
            arrFiltered.forEach(function(element) {
                if (element.status !== status)
                    $("#" + element.name + "-id").fadeOut("fast");
                else {
                    $("#" + element.name + "-id").fadeIn("fast");
                    array.push(element);
                }
            });
        }

        return array;
    }

    function filterByInput (object) {
        // Create regex for case insensitive
        var patt = new RegExp($('#input-id').val(), 'i');

        var arrFiltered = object.filter(function (obj) {
            if (patt.exec(obj.name) !== null) {
                return true;
            } else {
                return false;
            }
        });

        return arrFiltered;
    }
});
