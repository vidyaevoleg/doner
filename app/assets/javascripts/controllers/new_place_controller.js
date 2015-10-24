Topdoner.controller('NewPlaceCtrl', function ($scope) {
    $scope.mapClick=function(e){
      var coords = e.get('coords');
      $scope.coords = coords;
      ymaps.geocode(coords,{kind: 'metro'}).then(function (res) {
          var names = [];
          res.geoObjects.each(function (obj) {
              names.push(obj.properties.get('name'));
          });
          var metro = names[0]
          $scope.$apply(function(){
            $scope.metro = metro
          });
      });
      ymaps.geocode(coords).then(function (res) {
          var names = [];
          res.geoObjects.each(function (obj) {
              names.push(obj.properties.get('name'));
          });
          var adress = names[0]
          $scope.$apply(function(){
            $scope.adress = adress
          });
      });
      // $('#place_cooridnates') = 
    };
});
