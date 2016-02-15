
// HelloWorld Assessment By Nadhir Falta
var helloWorldAssessmentApp = angular.module('helloWorldAssessmentApp', ['ngRoute']);

helloWorldAssessmentApp.controller('mainController', function($scope,$http,$location, $window) {
  $scope.showConfirmation = false;
  $scope.user = {};
  $scope.userName = "";

  $scope.duplicate = false;
  $scope.errorFnameAlph = false;
  $scope.fnameHasError = false;
  $scope.errorLnameAlph = false;
  $scope.lnameHasError = false;

  $scope.user.fname = "";
  $scope.user.lname = "";
  $scope.user.addr1 = "";
  $scope.user.addr2 = "";
  $scope.user.city = "";
  $scope.user.state = "";
  $scope.user.zipcode = "";
  $scope.user.country = "";


  // function to submit the form after all validation has occurred            
  $scope.submitForm = function(isValid) {
    $scope.duplicate = false;
    $scope.errorFnameAlph = false;
    $scope.fnameHasError = false;
    $scope.errorLnameAlph = false;
    $scope.lnameHasError = false;
    $scope.fnameAlphErr = false;
    $scope.fnameHasError = false;

    //check for all inputs
    $scope.checkFname();
    $scope.checkLname();
    $scope.checkAddr1();
    $scope.checkCity();
    $scope.checkState();
    $scope.checkZip();
    $scope.checkCountry();

    // check to make sure the form is completely valid
    if (isValid) {
      $http.post('postData.php', $scope.user)
      .success(function(data, status, headers, config){
          console.log(data);

          //check if data has been successfully submitted to database
          if (!data.success) {

            //check if the name exists before
            if(data.errors.duplicate) {
              $scope.duplicate = true;
              $scope.checkFname();
            }
            else {
               // if not successful, bind errors to error variables
              if (data.errors.fnameAlph != undefined) {
                $scope.errorFnameAlph = data.errors.fnameAlph;
                $scope.checkFname();
              }

              if (data.errors.lnameAlph != undefined) {
                $scope.errorLnameAlph = data.errors.lnameAlph;
                $scope.checkLname();
              }

              if (data.errors.addr1Empty != undefined)
                $scope.checkAddr1();

              if (data.errors.cityEmpty != undefined)
                $scope.checkCity();

              if (data.errors.stateEmpty != undefined)
                $scope.checkState();

              if (data.errors.countryEmpty != undefined)
                $scope.checkCountry();

              if (data.errors.zipEmpty != undefined)
                $scope.checkZip();
            }
          } else {
            // if successful, bind success message to the page
            $scope.message = data.message;
            console.log(data);
            $scope.userName = $scope.user["fname"];
            $scope.showConfirmation = true;
          }
            
        })
      .error(function(data, status, headers, config) {
         console.log(data);
      });
    }

  };


  $scope.checkFname = function () {
    if ($scope.user.fname === "" || $scope.user.fname == undefined) {
      $scope.fnameHasError =true;
      $scope.fnameReqErr = true;
    }
    else if ($scope.errorFnameAlph) {
      $scope.fnameHasError =true;
      $scope.fnameReqErr = false;
      $scope.fnameAlphErr = true;
      $scope.duplicate = false;
    }
    else if ($scope.duplicate) {
      $scope.fnameHasError =true;
      $scope.fnameReqErr = false;
      $scope.fnameAlphErr = false;
      $scope.duplicate = true;
    }
    else {
      $scope.fnameHasError =false;
      $scope.fnameReqErr = false;
      $scope.fnameAlphErr = false;
      $scope.duplicate = false;
    }
  }

  $scope.checkLname = function () {
    if ($scope.user.lname == "" || $scope.user.lname == undefined) {
      $scope.lnameHasError =true;
      $scope.lnameReqErr = true;
    }
    else if ($scope.errorLnameAlph) {
      $scope.lnameHasError =true;
      $scope.lnameReqErr = false;
      $scope.lnameAlphErr = true;
    }
    else {
      $scope.lnameHasError =false;
      $scope.lnameReqErr = false;
      $scope.lnameAlphErr = false;
    }
  }

  $scope.checkAddr1 = function () {
    if ($scope.user.addr1 == "" || $scope.user.addr1 == undefined) {
      $scope.addr1HasError =true;
      $scope.addr1ReqErr = true;
    }
    else {
      $scope.addr1HasError =false;
      $scope.addr1ReqErr = false;
    }
  }

  $scope.checkCity = function () {
    if ($scope.user.city == "" || $scope.user.city == undefined) {
      $scope.cityHasError =true;
      $scope.cityReqErr = true;
    }
    else {
      $scope.cityHasError =false;
      $scope.cityReqErr = false;
    }
  }

  $scope.checkState = function () {
    if ($scope.user.state == "" || $scope.user.state == undefined || $scope.user.state == "Select a State") {
      $scope.stateHasError =true;
      $scope.stateReqErr = true;
    }
    else {
      $scope.stateHasError =false;
      $scope.stateReqErr = false;
    }
  }

  $scope.checkCountry = function () {
    if ($scope.user.country == "" || $scope.user.country == undefined || $scope.user.country == "Select a Country") {
      $scope.countryHasError =true;
      $scope.countryReqErr = true;
    }
    else {
      $scope.countryHasError =false;
      $scope.countryReqErr = false;
    }
  }

  $scope.checkZip = function () {
    if ((''+$scope.user.zipcode).length == 0 ) {
      $scope.zipHasError =true;
      $scope.zipReqErr = true;
      $scope.zipLengthErr = false;
    }
    else if ((''+$scope.user.zipcode).length != 5) {
      $scope.zipHasError =true;
      $scope.zipReqErr = false;
      $scope.zipLengthErr = true;
    }
    else{
      $scope.zipHasError =false;
      $scope.zipReqErr = false;
      $scope.zipLengthErr = false;
    }
  }

  $scope.states = [
           {value: "AL", stateName: "Alabama", stateCapital: "Montgomery"},
           {value: "AK", stateName: "Alaska", stateCapital: "Juneau"},
           {value: "AZ", stateName: "Arizona", stateCapital: "Phoenix"},
           {value: "AR", stateName: "Arkansas", stateCapital: "Little Rock"},
           {value: "CA", stateName: "California", stateCapital: "Sacramento"},
           {value: "CO", stateName: "Colorado", stateCapital: "Denver"},
           {value: "CT", stateName: "Connecticut", stateCapital: "Hartford"},
           {value: "DE", stateName: "Delaware", stateCapital: "Dover"},
           {value: "DC", stateName: "District of Columbia"},
           {value: "FL", stateName: "Florida", stateCapital: "Tallahassee"},
           {value: "GA", stateName: "Georgia", stateCapital: "Atlanta"},
           {value: "HI", stateName: "Hawaii", stateCapital: "Honolulu"},
           {value: "ID", stateName: "Idaho", stateCapital: "Boise"},
           {value: "IL", stateName: "Illinois", stateCapital: "Springfield"},
           {value: "IN", stateName: "Indiana", stateCapital: "Indianapolis"},
           {value: "IA", stateName: "Iowa", stateCapital: "Des Moines"},
           {value: "KS", stateName: "Kansas", stateCapital: "Topeka"},
           {value: "KY", stateName: "Kentucky", stateCapital: "Frankfort"},
           {value: "LA", stateName: "Louisiana", stateCapital: "Baton Rouge"},
           {value: "ME", stateName: "Maine", stateCapital: "Augusta"},
           {value: "MD", stateName: "Maryland", stateCapital: "Annapolis"},
           {value: "MA", stateName: "Massachusetts", stateCapital: "Boston"},
           {value: "MI", stateName: "Michigan", stateCapital: "Lansing"},
           {value: "MN", stateName: "Minnesota", stateCapital: "Minneapolis"},
           {value: "MS", stateName: "Mississippi", stateCapital: "Jackson"},
           {value: "MO", stateName: "Missouri", stateCapital: "Jefferson City"},
           {value: "MT", stateName: "Montana", stateCapital: "Helena"},
           {value: "NE", stateName: "Nebraska", stateCapital: "Lincoln"},
           {value: "NV", stateName: "Nevada", stateCapital: "Carson City"},
           {value: "NH", stateName: "New Hampshire", stateCapital: "Concord"},
           {value: "NJ", stateName: "New Jersey", stateCapital: "Trenton"},
           {value: "NM", stateName: "New Mexico", stateCapital: "Sante Fe"},
           {value: "NY", stateName: "New York", stateCapital: "Albany"},
           {value: "NC", stateName: "North Carolina", stateCapital: "Raleigh"},
           {value: "ND", stateName: "North Dakota", stateCapital: "Bismarck"},
           {value: "OH", stateName: "Ohio", stateCapital: "Columbus"},
           {value: "OK", stateName: "Oklahoma", stateCapital: "Oklahoma City"},
           {value: "OR", stateName: "Oregon", stateCapital: "Salem"},
           {value: "PA", stateName: "Pennsylvania", stateCapital: "Harrisburg"},
           {value: "RI", stateName: "Rhode Island", stateCapital: "Providence"},
           {value: "SC", stateName: "South Carolina", stateCapital: "Columbia"},
           {value: "SD", stateName: "South Dakota", stateCapital: "Pierre"},
           {value: "TN", stateName: "Tennessee", stateCapital: "Nashville"},
           {value: "TX", stateName: "Texas", stateCapital: "Austin"},
           {value: "UT", stateName: "Utah", stateCapital: "Salt Lake City"},
           {value: "VT", stateName: "Vermont", stateCapital: "Montpelier"},
           {value: "VA", stateName: "Virginia", stateCapital: "Richmond"},
           {value: "WA", stateName: "Washington", stateCapital: "Olympia"},
           {value: "WV", stateName: "West Virginia", stateCapital: "Charleston"},
           {value: "WI", stateName: "Wisconsin", stateCapital: "Madison"},
           {value: "WY", stateName: "Wyoming", stateCapital: "Cheyenne"}
          ]

});

// main background carousel
jQuery(window).ready(function () {
    jQuery.backstretch([
        "assets/3.jpg"
        ,
        "assets/2.jpg"
        ,
        "assets/1.jpg"
        ,
        "assets/4.jpg"
        ,
        "assets/5.jpg"
        ], {duration: 4000, fade: 'slow'});
});


helloWorldAssessmentApp.directive('numbersOnly', function () {
      return {
          require: 'ngModel',
          link: function (scope, element, attr, ngModelCtrl) {
              function fromUser(text) {
                  if (text) {
                      var transformedInput = text.replace(/[^0-9]/g, '');
  
                      if (transformedInput !== text) {
                          ngModelCtrl.$setViewValue(transformedInput);
                          ngModelCtrl.$render();
                      }
                      return transformedInput;
                  }
                  return undefined;
              }            
              ngModelCtrl.$parsers.push(fromUser);
          }
      };
  });
