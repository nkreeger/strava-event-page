/**
 * strava-results-loader.js
 * @author Nick Kreeger <nick.kreeger@gmail.com>
 */

$(function() {
  /**
   * @brief Helper method to convert a time in seconds to a h:m:s format.
   */
  function secondsToTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60; 
    if (isNaN(minutes)) {
      minutes = 0;
    }
    if (isNaN(seconds)) {
      seconds = 0;
    }
    var ret = minutes + ':';
    if (seconds <= 9) {
      ret += '0';
    }
    return ret + seconds;
  }

  /**
   * Method to load the results from strava and populate the page with the returned content.
   */
  $.fn.loadResults = function() {
    var segment = $(this).attr("segmentid");
    var settings = $(".strava_event_settings");
    var start = 0;
    var startDate = settings.attr("startdate");
    var endDate = settings.attr("enddate");
    var club = settings.attr("clubid");
    var strava_api_loader = settings.attr("strava_api_loader_path");
    var url = strava_api_loader + "?startdate=" + startDate + "&enddate=" + endDate +
              "&club=" + club + "&segment=" + segment + "&start=" + start + "&best=false";
    var element = $(this);
  
    $.get(url, function(data) {
      // Data comes back out-of-order. filter through and insert the fastest times first.
      var times = [];
      for (var index in data.efforts) {
        var effort = data.efforts[index];
        var time = { "name" : effort.athlete.name, "time" : effort.elapsedTime };
        var pushed = false;
        for (var i = 0; i < times.length; i++) {
          var curTime = times[i];
          if (effort.elapsedTime < curTime.time) {
            times.splice(i, 0, time);
            pushed = true;
            break;
          }
        }
        if (!pushed) {
          times.push(time);
        }
      }
  
      element.children(".loading").hide();
      var name = data.segment.name;
  
      if (element.children("h2").length == 0) {
        element.append("<h2></h2>");
      }
      var title = element.children("h2");
      title.html(name);
  
      var leadersElement = element.children("ul.leaders");
      if (leadersElement.length == 0) {
        element.append("<ul class='leaders'></ul>");
      }
      else {
        leadersElement.html("");
      }
      var leadersElement = element.children(".leaders");
      for (var i = 0; i < times.length; i++) {
        var time = times[i];
        var item = "<span class='left'>" + (i + 1) + ". " + time.name + "</span>" +
                   "<span class='right'>" + secondsToTime(time.time) + "</span>" +
                   "<div class='clear'></div>";
        var rowDelim = (i % 2 == 0) ? "even" : "odd";
        leadersElement.append("<li class='" + rowDelim + "'>" + item + "</li>");
      }
    });
  };
  
  /**
   * Start loading the results.
   */
  function startPollingTimes() {
    $(".results").each(function() {
      $(this).loadResults();
    });
    window.setInterval(startPollingTimes, 60000);
  }
  startPollingTimes();
});
