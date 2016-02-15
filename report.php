<!DOCTYPE html>
<html>
<head>
    <title>HelloWorld Team Report</title>
    <link rel="stylesheet" href="css/main.css" >
    <link rel="stylesheet" href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css"> 
    <script src="http://code.angularjs.org/1.2.6/angular.js"></script> 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.28/angular-route.js"></script> 
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script type="text/javascript" src="js/backstretch.js"></script>
    <script src="js/app.js"></script>
</head>

<body ng-app="helloWorldAssessmentApp" ng-controller="mainController">
<div class="overlay">&nbsp;</div>
<div class="overlay-color">&nbsp;</div>
    <div class="container">
        <div class="col-sm-8 col-sm-offset-2" ng-hide="showConfirmation">
        <h1 class="mainHeader">HelloWorld Team Report</h1>
            <?php

                $sql_connection = mysql_connect("$OPENSHIFT_MYSQL_DB_HOST:$OPENSHIFT_MYSQL_DB_PORT", "adminIUNYmiR", "H5TE6rtLLfbC");
             
                mysql_select_db("helloworld", $sql_connection);
             
                $result = mysql_query("SELECT * FROM helloWorldTable ORDER BY date desc");
                if (!$result) {
                     die('Could not connect: ' . mysql_error());
                }
                if(!mysql_num_rows($result) > 0) {
                    echo "<div class='emptyReport'> <h5>No one registered to join the team yet.</h5> </div>";
                }
                else {
                    echo "<table class='table table-striped table-bordered table-condensed'>";
                    echo "<thead><tr>
                            <th>Fisrt Name</th>
                            <th>Last Name</th>
                            <th>Address 1</th>
                            <th>Address 2</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                            <th>Country</th>
                            <th>Date</th>
                        </tr></thead>";
                    
                    while ($row = mysql_fetch_array($result)) {
                        echo "<tbody><tr>";
                        echo "<td>" . $row["fname"] . "</td>";
                        echo "<td>" . $row["lname"] . "</td>";
                        echo "<td>" . $row["addr1"] . "</td>";
                        echo "<td>" . $row["addr2"] . "</td>";
                        echo "<td>" . $row["city"] . "</td>";
                        echo "<td>" . $row["state"] . "</td>";
                        echo "<td>" . $row["zip"] . "</td>";
                        echo "<td>" . $row["country"] . "</td>";
                        echo "<td>" . $row["date"] . "</td>";
                        echo "</tr></tbody>";
                    }
                 
                    echo "</table>";
                }
                 
                mysql_close($sql_connection);
            ?>
        </div>
    </div>
    </body>
</html>