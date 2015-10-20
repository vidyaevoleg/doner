Topdoner.factory('places', function(){
  var places = [
      {id: 1,name: 'Doner 3', coordinates: [37.411961,55.831903], rating: 8, reviews: [{id: 1, description: 'mewemw', rating: 7 },{id: 2, description: 'mewemw', rating: 7 },{id: 3, description: 'mewemw', rating: 7 }]},
      {id: 2,name: 'Doner 343', coordinates: [37.565466,55.763338], rating: 8, reviews: [{id: 4, description: 'mewemw', rating: 7 },{id: 5, description: 'mewemw', rating: 7 },{id: 6, description: 'mewemw', rating: 7 }]},
      {id: 3,name: 'Doner 43', coordinates: [37.565466,55.766338], rating: 8, reviews: [{id: 7, description: 'mewemw', rating: 7 },{id: 8, description: 'mewemw', rating: 7 },{id: 9, description: 'mewemw', rating: 7 }]},
      {id: 4,name: 'Doner4', coordinates: [37.616378,55.744522], rating: 8, reviews: [{id: 10, description: 'mewemw', rating: 7 },{id: 11, description: 'mewemw', rating: 7 },{id: 12, description: 'mewemw', rating: 7 }]},
      {id: 5,name: 'Doner34', coordinates: [37.435983,55.793559], rating: 8, reviews: [{id: 16, description: 'mewemw', rating: 7 },{id: 17, description: 'mewemw', rating: 7 },{id: 18, description: 'mewemw', rating: 7 }]}
  ];
  var getGeoObjects = function(){
      var geoObjects = [];
      var point;
      for (var i = 0, ii = places.length; i < ii; i++) {
          place = places[i];
          geoObjects.push({
              geometry:{
                  type: 'Point',
                  coordinates: place.coordinates
              },
              properties:{
                id: place.id,
                title: place.name,
                rating: place.rating,
                reviews: place.reviews
              }
          });
      }
      return geoObjects
  };
  return getGeoObjects();
});