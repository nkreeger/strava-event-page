<?php
header("Content-Type: application/json");

$url = "http://www.strava.com/api/v1/segments/" . $_GET["segment"] .
       "/efforts?clubId=" . $_GET["club"] . "&startDate=" . $_GET["startdate"] .
       "&endDate=" . $_GET["enddate"] . "&startId=". $_GET["start"];
if ($_GET["best"] == "true") {
  $url = $url . "&best=true";
}

$session = curl_init();
curl_setopt($session, CURLOPT_URL, $url);
curl_setopt($session, CURLOPT_HEADER, 0);
curl_exec($session);
curl_close($session);
?>
