# Strava Event Page

Simple event page for displaying results through Strava segments. The event can be set to display results for a given timeframe and also using a specific club or team.

## Setting up

The project consists of 4 main files

1.  eventpage.html
   * Page that does the layout of results and contains the settings to load. Refer to the documentation inside this file.
2.  strava_fetcher.php
   * PHP utility file that returns the results from Strava. If you move this file around, be sure to read the instructions in eventpage.html.
3.  strava_results_loader.js
   * JS file that handles the data from Strava and builds out the content on eventpage.html. If you move this file be sure to update the path in the header of eventpage.html.
4.  style.css.
   * Basic style sheet that can easily be modified (simple HTML is outputed through strava_results_loader.js).
