Topdoner.controller('NewPlaceCtrl', function ($scope) {
    // $scope.mapClick = function(e){
    // if (!map.balloon.isOpen()) {
        // var coords = e.get('coords');
        // console.log(coords);
    // }
    // else {
        // map.balloon.close();
    // }
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
          var adres = names[0]
          $scope.$apply(function(){
            $scope.adres = adres
          });
      });
    };
});
