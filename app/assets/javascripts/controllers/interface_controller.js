// все угары по интерфейсу здесь
Topdoner.controller('InterfaceCtrl', ['$location', '$rootScope', function ($location, $rootScope) {

  $rootScope.opn = function(what) {
    what.css('opacity', 0)
      .removeClass('hidden')
      .fadeTo(200,1);
  }
  $rootScope.cls = function(what){
    what.fadeTo(200,0);
    setTimeout(function(){
      what.addClass('hidden');
    }, 210);
  }
  
  $rootScope.openPopup = function(popup_sel) {
    $rootScope.opn($('.prnj-popup'));
    $rootScope.opn($(popup_sel));
    $('.lo-r-cont').css('position', 'fixed');
    $('.lo-r-card').css('position', 'fixed');
//    $('.cont').addClass('blured');
  }
  $rootScope.closePopup = function() {
    $rootScope.cls($('.popup'));
    $rootScope.cls($('.prnj-popup'));
    $('.lo-r-cont').css('position', 'relative');
    $('.lo-r-card').css('position', 'relative');
  }

  $rootScope.stopBlur = function(touch) {
    $('.lo-r-card-bg-norm').css('opacity', 1);
    $('.lo-r-card-bg-blured').css('opacity', 0);
    $('.lo-r-card-cont-top').addClass('hover');
    $('.lo-r-card-cont-bottom').addClass('hover');
    if (touch) {
      setTimeout(function(){
        $rootScope.startBlur();
      }, 1200);
    }
  }

  $rootScope.scrollToPlace = function(place) {
    var place_id = place.properties.id;

    setTimeout(function() {
      elem = $('#place-' + place_id);
      $('body').animate({ scrollTop: elem.offset().top - 10}, 700);   
    }, 500);
  }

  $rootScope.startBlur = function() {
    $('.lo-r-card-bg-norm').css('opacity', 0);
    $('.lo-r-card-bg-blured').css('opacity', 1);
    $('.lo-r-card-cont-top').removeClass('hover');
    $('.lo-r-card-cont-bottom').removeClass('hover');
  }

  $rootScope.hoverOrClick = function() {
    var isTouch = 'ontouchstart' in document.documentElement;
    $('.lo-r-card').off();
    if (isTouch) {
      $('.lo-r-card').click(function(){
        $rootScope.stopBlur(true);
      });
    } else {
      setTimeout(function(){
        $('.lo-r-card').mouseenter(function(){
          $rootScope.stopBlur(false);
        })
        $('.lo-r-card').mouseleave(function(){
          $rootScope.startBlur();
        })
      }, 800);
    }
  }

  $rootScope.showListDisp = function() {
    if ($rootScope.user_location) {
      for (var i=0; i < $rootScope.places.length; i++) {
        var place = $rootScope.places[i].geometry.coordinates,
          me = $rootScope.user_location,
          d=0;
        $rootScope.places[i].properties.dist = $rootScope.calcDist(me, place);
//        console.log($rootScope.places[i].properties.dist);
      }
    }
  }

  $rootScope.choosePlacesSort = function(what) {
    if (what === 'r') {
      $rootScope.placesSort = 'r';
      $rootScope.places_list_order = '-properties.rating';
    }
    if (what === 'p') {
      $rootScope.placesSort = 'p';
      $rootScope.places_list_order = '-properties.reviews_count';
    }
    if (what === 'n') {
      $rootScope.placesSort = 'n';
      if (!$rootScope.places[1].properties.dist) {
        $rootScope.opn($('.lo-r-nav-select-wait'));
        if (navigator.geolocation) {
          console.log('so..')
          navigator.geolocation.getCurrentPosition(showPosition);
          console.log('GOT POSITION');
        } else {
          console.log('geolocation error :(');
        }
        function showPosition(position) {
          var location = [position.coords.longitude, position.coords.latitude];
          $rootScope.user_location = location;
          $rootScope.goToPlace(null, 12, location);
          $rootScope.addUserLocationPlacemark(location);
          $rootScope.showListDisp();
          $rootScope.cls($('.lo-r-nav-select-wait'));
          $rootScope.$apply($rootScope.places_list_order = 'properties.dist');
        }
      } else {
        $rootScope.goToPlace(null, 12, $rootScope.user_location)
        $rootScope.places_list_order = 'properties.dist';
        console.log('dist already exist')
      }
    }
  }

  $rootScope.openSlideNav = function() {
    $rootScope.opn($('.prnj-sn'));
    $('.sn').addClass('opened');
  }

  $rootScope.closeSlideNav = function() {
    $rootScope.cls($('.prnj-sn'));
    $('.sn').removeClass('opened');
  }
    
  $rootScope.showLogin = function() {
    $rootScope.cls($('.sn-item-login'));
    setTimeout(function(){
      $rootScope.opn($('.sn-item-choose'));
    }, 220);
  }
  
  $rootScope.snClick = function(what) {
    if (what === 'login') {
      $rootScope.closeSlideNav();
      $rootScope.openPopup('.popup-login');
    } else if (what === 'addplace') {
      $rootScope.closeSlideNav();
      $rootScope.undefineNewPlace();
    } else if (what === 'what'){
      $rootScope.closeSlideNav();
      $rootScope.openPopup('.popup-about');
    } else if (what === 'fb') {
      $rootScope.closeSlideNav();
//      $location.path('#/write_us');
      setTimeout(function(){
        $('body').animate({ scrollTop: $('.lo-r-fb').offset().top - 10}, 700);
      }, 200);
    }
  }

}]);
