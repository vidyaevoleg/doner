Topdoner.filter('isRated', function () {
  return function(items) {
    return items.filter(function(item){
      return parseInt(item.properties.rating) > 0
    })
  }
});

Topdoner.filter('getPlaceById', function() {
  return function(input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (input[i].properties.id == id) {
        return input[i];
      }
    }
    return null;
  }
});

Topdoner.filter('getReviewById', function() {
  return function(input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (input[i].id == id) {
        return input[i];
      }
    }
    return null;
  }
});