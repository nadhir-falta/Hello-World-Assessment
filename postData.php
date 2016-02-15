<?php
    $errors = array();  // array to hold validation errors
    $info = array();        // array to pass back data

    $jsondata = file_get_contents("php://input");
    $data = json_decode($jsondata, true);

    $fname = $data["fname"];
    $lname = $data["lname"];
    $addr1 = $data["addr1"];
    $addr2 = $data["addr2"];
    $city =  $data["city"];
    $state = $data["state"];
    $zip =   $data["zipcode"];
    $country =   $data["country"];

    // validate the variables ========
    if (!ctype_alpha(str_replace(array("'", "-"), "",$fname))) { 
       $errors['fnameAlph'] = true;
    }

    if (!ctype_alpha(str_replace(array("'", "-"), "", $lname))) { 
        $errors['lnameAlph'] = true;
    }

    if (empty($addr1)) { 
        $errors['addr1Empty'] = true;
    }

    if (empty($city)) { 
        $errors['cityEmpty'] = true;
    }

    if (empty($zip)) { 
        $errors['zipEmpty'] = true;
    }
    // return a response ==============

    // response if there are errors
    if (empty($errors)) {
        // if there are no errors, return a message
        $info['success'] = true;
        $info['message'] = 'Success!';

        $con = mysql_connect("$OPENSHIFT_MYSQL_DB_HOST:$OPENSHIFT_MYSQL_DB_PORT", "adminIUNYmiR", "H5TE6rtLLfbC") or die('Could not connect: ' . mysql_error());

        mysql_select_db("helloworld", $con); 

        $sql = "INSERT INTO helloWorldTable (fname ,lname,addr1,addr2,city ,state, zip, country ) VALUES ('$fname' ,'$lname','$addr1','$addr2','$city' ,'$state','$zip', '$country')";
        if(!mysql_query($sql,$con))
        {
            $errors['duplicate'] = true;
            $info['success'] = false;
            $info['errors']  = $errors;
            // echo json_encode($info);
            // die('Error : ' . mysql_error());
        }

        // Print "Your information has been successfully added to the database.";
        // mysql_close($sql_connection);

      
    } else {
      // if there are items in our errors array, return those errors
      $info['success'] = false;
      $info['errors']  = $errors;
    }

    // return all our data to an AJAX call
    echo json_encode($info);
?>


