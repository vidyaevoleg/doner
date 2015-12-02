Topdoner.controller('MainCtrl', ['$scope','$filter','places','reviews','$location','$rootScope','$stateParams', function ($scope,$filter,places,reviews,$location,$rootScope,$stateParams) {

	$rootScope.MAP;
	
	$scope.list_limit = 4;
	

//	$scope.logoCycle;
	
//	$scope.startLogo = function() {
//		var colors = ['#FFFF00', '#FF00FF', '#FF0000', '#C0C0C0', '#808000', '#800000', '#00FF00', '#008080', '#0000FF', '#000080'],
//			l = colors.length,
//			logo = $('.lo-l-head-logo'),
//			i=0;
//		$scope.logoCycle = setInterval(function(){
//			if (i > l) {
//				i=0;
//				logo.css('background-color', colors[i]);
//				i++;
//			} else {
//				logo.css('background-color', colors[i]);
//				i++;
//			}
//		}, 100);
//	}
//	$scope.stopLogo = function() {
//		clearInterval($scope.logoCycle);
//		$('.lo-l-head-logo').css('background-color', '#000');
//	}
	
	$scope.places_list_order = '-properties.rating';
	
	$scope.loadMore = function() {
		if ($scope.list_limit < $scope.places.length) {
			$scope.list_limit = $scope.list_limit + 6;
		} else {
			$scope.list_limit = $scope.list_limit + 1;
			$scope.cls($('.load-more'));
		}
	}
	
	$rootScope.setDefaultZoom = function(){
		var place = $rootScope.place;
		if (place) {
			$rootScope.MAP.setCenter(place.geometry.coordinates, 12, {duration: 500});
		}
	}

	
	
	$scope.goToPlace = function(place,zoom,location) {
		if ($rootScope.MAP) {
	  	$rootScope.MAP.panTo(location || place.geometry.coordinates,{duration: 600});
	  	setTimeout(function() {
		    $rootScope.MAP.setCenter(location || place.geometry.coordinates, zoom || 16, {duration: 500});
	  	}, 600);			
		}
	}

	$rootScope.afterMapInit=function(Map){
		$rootScope.MAP = Map;
//		debugger
//		$rootScope.searchControl = new $rootScope.MAP.controls.SearchControl({
//     		options: {
//         		float: 'right',
//         		floatIndex: 100,
//         		noPlacemark: true
//     		}
//		});
//		$rootScope.MAP.controls.add($rootScope.searchControl());
	//		console.log($rootScope.MAP);

		setTimeout(function() {
			var place = $rootScope.place;
			if (place) {
				$scope.goToPlace(place)    	
			}
		}, 1000);
	};

  $rootScope.choosePlace = function(place){
		$location.path('/places/'+place.properties.id);
  };
	
	$rootScope.setRightCenter = function() {
		if ($rootScope.place) {
			$scope.goToPlace($rootScope.place)
		}
	};

	$rootScope.deletePlace = function(place_id) {
		if (confirm('Удалить место?')) {
			places.deletePlace(place_id)
			var place = $filter('getPlaceById')($rootScope.places, place_id)
			$rootScope.places.splice($rootScope.places.indexOf(place), 1 );
			$location.path('/home')
		}
	}

	$rootScope.deleteReview = function(review_id){
		if (confirm('Удалить обзор?')) {
			reviews.deleteReview(review_id)
			$('#review-'+review_id).toggle(500)
			$location.path('/places/'+ $stateParams.id)
		}
	}

	
	
	$rootScope.getMetroLine = function(st) {
		if (st !== undefined){
		  var m = [
			['Бульвар Рокоссовского','Черкизовская','Преображенская площадь','Сокольники','Красносельская','Комсомольская','Красные Ворота','Чистые пруды','Лубянка','Охотный ряд','Библиотека им. Ленина','Кропоткинская','Парк культуры','Фрунзенская','Спортивная','Воробьёвы горы','Университет','Проспект Вернадского','Юго-Западная','Тропарёво'],
			['Алма-Атинская','Красногвардейская','Домодедовская','Орехово','Царицыно','Кантемировская','Каширская','Коломенская','Автозаводская','Павелецкая','Новокузнецкая','Театральная','Тверская','Маяковская','Белорусская','Динамо','Аэропорт','Сокол','Войковская','Водный стадион','Речной вокзал'],
			['Пятницкое шоссе','Митино','Волоколамская','Мякинино','Строгино','Крылатское','Молодежная','Кунцевская','Славянский бульвар','Парк Победы','Киевская','Смоленская','Арбатская','Площадь Революции','Курская','Бауманская','Электрозаводская','Семеновская','Партизанская','Измайловская','Первомайская','Щелковская'],
			['Александровский сад','Арбатская','Смоленская','Киевская','Выставочная','Международная','Студенческая','Кутузовская','Фили','Багратионовская','Филевский парк','Пионерская','Кунцевская'],
			['Белорусская','Новослободская','Проспект Мира','Комсомольская','Курская','Таганская','Павелецкая','Добрынинская','Октябрьская','Парк культуры','Киевская','Краснопресненская'],
			['Медведково','Бабушкинская','Свиблово','Ботанический сад','ВДНХ','Алексеевская','Рижская','Проспект Мира','Сухаревская','Тургеневская','Китай-город','Третьяковская','Октябрьская','Шаболовская','Ленинский проспект','Академическая','Профсоюзная','Новые Черемушки','Калужская','Беляево','Коньково','Теплый Стан','Ясенево','Новоясеневская'],
			['Жулебино','Лермонтовский проспект','Выхино','Рязанский проспект','Кузьминки','Текстильщики','Волгоградский проспект','Пролетарская','Таганская','Китай-город','Кузнецкий мост','Пушкинская','Баррикадная','Улица 1905 года','Беговая','Полежаевская','Октябрьское поле','Щукинская','Спартак','Тушинская','Сходненская','Планерная'],
			['Новокосино','Новогиреево','Перово','Шоссе Энтузиастов','Авиамоторная','Площадь Ильича','Марксистская','Третьяковская','Деловой центр','Парк Победы'],
			['Алтуфьево','Бибирево','Отрадное','Владыкино','Петровско-Разумовская','Тимирязевская','Дмитровская','Савеловская','Менделеевская','Цветной бульвар','Чеховская','Боровицкая','Полянка','Серпуховская','Тульская','Нагатинская','Нагорная','Нахимовский проспект','Севастопольская','Чертановская','Южная','Пражская','Улица Академика Янгеля','Аннино','Бульвар Дмитрия Донского'],
			['Марьина Роща','Достоевская','Трубная','Сретенский бульвар','Чкаловская','Римская','Крестьянская застава','Дубровка','Кожуховская','Печатники','Волжская','Люблино','Братиславская','Марьино','Борисово','Шипиловская','Зябликово'],
			['Каширская','Варшавская','Каховская'],
			['Битцевский парк','Лесопарковая','Улица Старокачаловская','Улица Скобелевская','Бульвар адмирала Ушакова','Улица Горчакова','Бунинская аллея'],
			['Тимирязевская','Улица Милашенкова','Телецентр','Улица Академика Королёва','Выставочный центр','Улица Сергея Эйзенштейна']
		  ],
		  mm = ['sok', 'zam', 'ap', 'fil', 'kol', 'kr', 'tk', 'kal', 'st', 'lub', 'kah', 'but', 'tim'];
	//      console.log(st);
		  for (var i=0; i<12; i++) {
			for (var j=0; j<m[i].length; j++) {
			  if (st === m[i][j]) {
				  console.log(mm[i]);
				return mm[i];
			  }
			}
		  }
		} else {
			console.log('oh shit');
		  return ''
		} 
	}
	
	$scope.showDist = function(d){
		if (d >= 1) {
			return d + ' км';
		} else {
			return 'Близко'
		}
	}
	
	
	$scope.isDistExist = function(d) {
		if (d >= 0) {
			return true
		} else {
			return false
		}
	}
	
	$rootScope.getMetroColor = function(line) {
		return 'lo-r-card-metro-'+line;
	}
	
	$rootScope.mapClick=function(e){
//		console.log('pop');

      var coords = e.get('coords');
      $scope.new_place = {coordinates: coords.toString(),
      										city: '',
      										metro: '',
						  					metro_line: '',
      										street: ''
      									};
      ymaps.geocode(coords,{kind: 'metro'}).then(function (res) {
          var metros = [];
          res.geoObjects.each(function (obj) {
              metros.push(obj.properties.get('name'));
          });
          var metro = metros[0]
          $scope.$apply(function(){
            $scope.new_place['metro'] = metro.replace('метро ', '');
			  $scope.new_place['metro_line'] = $rootScope.getMetroLine($scope.new_place['metro']);
          });
      });
      ymaps.geocode(coords,{kind: 'house'}).then(function (res) {
          var houses = [];
          res.geoObjects.each(function (obj) {
              houses.push(obj.properties.get('name'));
          });
          var house = houses[0];
          $scope.$apply(function(){
            $scope.new_place['street'] = house
          });
		  		  console.log();

      });
      ymaps.geocode(coords).then(function (res) {
          var names = [];
          res.geoObjects.each(function (obj) {
              names.push(obj.properties.get('name'));
          });
          var loc = names[names.length-3],
          		dist = names[names.length-4];
          for (var i=1;i<names.length;i++) {
          	var word = names[i];
          	if (word.indexOf('городской') !== -1 ) {
          		dist = names[names.indexOf(dist)-1];
          		break;
          	};
          };
		     	$scope.$apply(function() {
	         	if (dist == loc) {
	          	$scope.new_place['city'] = loc;
	          } else {
	          	$scope.new_place['city'] = dist + ',' + loc
	          }
      	  });
				});
    };
	
	
	$rootScope.fixDropzone = function() {
		$('.dz-message').html('Кликните или перетащите сюда фотографии');
	}

  $rootScope.reviewValid = function(review){
    if ((review.place_id.length < 1) || (review.meat.length < 1) || (review.vegetables.length < 1) || (review.body.length < 1) || (review.service.length<1) || (review.sanitation.length <1)){
      alert('чувак заполни все формы')
      return false
    }
    return true
  }	
	$scope.addPlaceAction = function() {
    $scope.new_place = undefined
		$('.lo-l-addplace').after('<span class="lo-l-addplace-tip">Выбирай на карте место, браток.</span>');
		setTimeout(function(){
			$('.lo-l-addplace-tip').fadeOut(2000);
		}, 1000);
	}
	
	$scope.opn = function(what) {
		what.css('opacity', 0)
			.removeClass('hidden')
			.fadeTo(200,1);
	}
	$scope.cls = function(what){
		what.fadeTo(200,0);
		setTimeout(function(){
			what.addClass('hidden');
		}, 210);
	}
	
	$rootScope.openPopup = function(popup_sel) {
		$scope.opn($('.prnj'));
		$scope.opn($(popup_sel));
		$('.lo-r-cont').css('position', 'fixed');
		$('.lo-r-card').css('position', 'fixed');
		$('.cont').addClass('blured');
	}
	$scope.closePopup = function() {
		$scope.cls($('.popup'));
		$scope.cls($('.prnj'));
		$('.lo-r-cont').css('position', 'relative');
		$('.lo-r-card').css('position', 'relative');
		$('.cont').removeClass('blured');
	}
	
	
	$rootScope.placesSort = 'r';
	$scope.whatPlacesSort = function(i) {
		if (i === $rootScope.placesSort) {
			return 'active';
		} else {
			return '';
		}
	}
	$scope.choosePlacesSort = function(what) {
		if (what === 'r') {
			$rootScope.placesSort = 'r';
			$scope.places_list_order = '-properties.rating';
		}
		if (what === 'p') {
			$rootScope.placesSort = 'p';
			$scope.places_list_order = '-properties.reviews_count';
		}
		if (what === 'n') {
			$rootScope.placesSort = 'n';
			if (!$rootScope.places[1].properties.dist) {
				$scope.opn($('.lo-r-nav-select-wait'));
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
					$scope.goToPlace(null, 12, location)
//					console.log('STARTS');
	//				if (!$rootScope.places[1].properties.dist) {
						$scope.showListDisp();
	//				} else {
	//					console.log('dist exist');
	//				}
//					console.log('done');
					$scope.cls($('.lo-r-nav-select-wait'));
					$scope.$apply($scope.places_list_order = 'properties.dist');
				}
			} else {
				$scope.goToPlace(null, 12, $rootScope.user_location)
				$scope.places_list_order = 'properties.dist';
				console.log('dist already exist')
			}
		}
	}
	
	$scope.calcDist = function(me, place) {
		function toRads(angle) {
			return angle * (Math.PI / 180);
		}
		return Math.round(6371 * Math.acos(Math.sin(toRads(me[0]))*Math.sin(toRads(place[0])) + Math.cos(toRads(me[0]))*Math.cos(toRads(place[0]))*Math.cos(toRads(me[1]) - toRads(place[1]))));
	}
	
	$scope.showListDisp = function() {
		if ($rootScope.user_location) {
			for (var i=0; i < $rootScope.places.length; i++) {
				var place = $rootScope.places[i].geometry.coordinates,
					me = $rootScope.user_location,
					d=0;
				$rootScope.places[i].properties.dist = $scope.calcDist(me, place);
//				console.log($rootScope.places[i].properties.dist);
			}
		}
	}
	
	  $scope.stopBlur = function() {
//	  $('.lo-r-card-bg').removeClass('blured');
		$('.lo-r-card-bg-norm').css('opacity', 1);
//		$('.lo-r-card-bg-blured').addClass('hover');
		  $('.lo-r-card-bg-blured').css('opacity', 0);
//	  $('.lo-r-card-cont').fadeTo(200,0);
//		  	  $('.lo-r-card-cont').addClass('hidden');
		  $('.lo-r-card-cont-top').addClass('hover');
		  $('.lo-r-card-cont-bottom').addClass('hover');
  }
  $scope.startBlur = function() {
//	  		$('.lo-r-card-bg-norm').fadeTo(200,0);
	  		$('.lo-r-card-bg-norm').css('opacity', 0);

//	  $('.lo-r-card-bg-blured').fadeTo(200,1);
//	  		$('.lo-r-card-bg-blured').removeClass('hover');
	  		  $('.lo-r-card-bg-blured').css('opacity', 1);


//	  $('.lo-r-card-cont').fadeTo(200,1);
//	  $('.lo-r-card-cont').removeClass('hidden');
//	  		  $('.lo-r-card-cont-top','.lo-r-card-cont-bottom').removeClass('hover');
	  $('.lo-r-card-cont-top').removeClass('hover');
		  $('.lo-r-card-cont-bottom').removeClass('hover');
	  
	  

  }
  
  
  $scope.isUserLocation = function() {
	  if ($rootScope.user_location) {
		  return true
	  } else {
		  return false
	  }
  }
  
  $scope.showPlaceDist = function() {
	  if ($scope.isUserLocation()) {
		  var place = $scope.place.geometry.coordinates,
		  me = $rootScope.user_location;
	  	return $scope.showDist($scope.calcDist(me, place));
	  }
	  
  }

  
  $scope.renameReviewCount = function(c) {
	  if (c > 4) {
		  return c + ' отзывов';
	  } else if (c > 1) {
		  return c + ' отзыва';
	  } else if (c === 1) {
		  return c + ' отзыв';
	  } else {
		  return;
	  }
  }

	
}]);