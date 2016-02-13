Topdoner.controller('MapCtrl', ['$scope', 'vkposts', 'places', function ($scope, vkposts, places) {

		$scope.getAllData = function () {
			
			places.getPlacesWithReviews().then(function (res) {
				$scope.places = res.data;
			})

			vkposts.getVkPosts().then( function (res) {
				$scope.vkposts = res.data;
				$scope.initCurrentPost();
			})	
		}

		$scope.fullAdress = function (current_place) {
			if (!current_place) { return }
			city = current_place.properties.city;
			street = current_place.properties.street;
			metro = current_place.properties.metro;

			return [metro, street, city].join();
		}

		$scope.initCurrentPost = function() {
			$scope.current_post = $scope.vkposts[0]
			$scope.next_post = $scope.vkposts[1]
		}

		$scope.toNextPost = function () {
			current_index = $scope.vkposts.indexOf($scope.current_post)
			$scope.prev_post = (current_index < 0) ? undefined : $scope.vkposts[current_index-1];
			$scope.next_post = ((current_index+2) > $scope.places.length) ? undefined : $scope.vkposts[current_index+2];
			$scope.current_post = $scope.vkposts[current_index+1];
		}

		$scope.toPrevPost = function () {
			current_index = $scope.vkposts.indexOf($scope.current_post)
			$scope.prev_post = ((current_index-2) < 0) ? undefined : $scope.vkposts[current_index-1];
			$scope.next_post = (current_index > $scope.places.length) ? undefined : $scope.vkposts[current_index+2];
			$scope.current_post = $scope.vkposts[current_index-1];
		}
		$scope.afterMapInit = function(Map){
			$scope.MAP = Map;
			$scope.YMAPS = ymaps;
		}

		$scope.defineNewPlace = function() {
			$scope.new_place = {
				clicked: true
			}
		}

		function getMetroLine (st) {
	    if (st !== undefined){
	      var m = [
	      ['Бульвар Рокоссовского','Черкизовская','Преображенская площадь','Сокольники','Красносельская','Комсомольская','Красные Ворота','Чистые пруды','Лубянка','Охотный Ряд','Библиотека имени Ленина','Кропоткинская','Парк культуры','Фрунзенская','Спортивная','Воробьёвы горы','Университет','Проспект Вернадского','Юго-Западная','Тропарёво'],
	      ['Алма-Атинская','Красногвардейская','Домодедовская','Орехово','Царицыно','Кантемировская','Каширская','Коломенская','Автозаводская','Павелецкая','Новокузнецкая','Театральная','Тверская','Маяковская','Белорусская','Динамо','Аэропорт','Сокол','Войковская','Водный стадион','Речной вокзал'],
	      ['Пятницкое шоссе','Митино','Волоколамская','Мякинино','Строгино','Крылатское','Молодежная','Кунцевская','Славянский бульвар','Парк Победы','Киевская','Смоленская','Арбатская','Площадь Революции','Курская','Бауманская','Электрозаводская','Семеновская','Партизанская','Измайловская','Первомайская','Щёлковская'],
	      ['Александровский сад','Арбатская','Смоленская','Киевская','Выставочная','Международная','Студенческая','Кутузовская','Фили','Багратионовская','Филевский парк','Пионерская','Кунцевская'],
	      ['Белорусская','Новослободская','Проспект Мира','Комсомольская','Курская','Таганская','Павелецкая','Добрынинская','Октябрьская','Парк культуры','Киевская','Краснопресненская'],
	      ['Медведково','Бабушкинская','Свиблово','Ботанический сад','ВДНХ','Алексеевская','Рижская','Проспект Мира','Сухаревская','Тургеневская','Китай-город','Третьяковская','Октябрьская','Шаболовская','Ленинский проспект','Академическая','Профсоюзная','Новые Черёмушки','Калужская','Беляево','Коньково','Теплый Стан','Ясенево','Новоясеневская'],
	      ['Жулебино','Лермонтовский проспект','Выхино','Рязанский проспект','Кузьминки','Текстильщики','Волгоградский проспект','Пролетарская','Таганская','Китай-город','Кузнецкий Мост','Пушкинская','Баррикадная','Улица 1905 года','Беговая','Полежаевская','Октябрьское поле','Щукинская','Спартак','Тушинская','Сходненская','Планерная'],
	      ['Новокосино','Новогиреево','Перово','Шоссе Энтузиастов','Авиамоторная','Площадь Ильича','Марксистская','Третьяковская','Деловой центр','Парк Победы'],
	      ['Алтуфьево','Бибирево','Отрадное','Владыкино','Петровско-Разумовская','Тимирязевская','Дмитровская','Савёловская','Менделеевская','Цветной бульвар','Чеховская','Боровицкая','Полянка','Серпуховская','Тульская','Нагатинская','Нагорная','Нахимовский проспект','Севастопольская','Чертановская','Южная','Пражская','Улица Академика Янгеля','Аннино','Бульвар Дмитрия Донского'],
	      ['Марьина Роща','Достоевская','Трубная','Сретенский бульвар','Чкаловская','Римская','Крестьянская Застава','Дубровка','Кожуховская','Печатники','Волжская','Люблино','Братиславская','Марьино','Борисово','Шипиловская','Зябликово'],
	      ['Каширская','Варшавская','Каховская'],
	      ['Битцевский парк','Лесопарковая','Улица Старокачаловская','Улица Скобелевская','Бульвар адмирала Ушакова','Улица Горчакова','Бунинская Аллея'],
	      ['Тимирязевская','Улица Милашенкова','Телецентр','Улица Академика Королёва','Выставочный центр','Улица Сергея Эйзенштейна']
	      ],
	      mm = ['sok', 'zam', 'ap', 'fil', 'kol', 'kr', 'tk', 'kal', 'st', 'lub', 'kah', 'but', 'tim'];

	      for (var i=0; i<12; i++) {
	        for (var j=0; j<m[i].length; j++) {
	          if (st === m[i][j]) {
	          return mm[i];
	          }
	        }
	      }
	    } else {
	      console.log('oh shit');
	      return ''
	    } 
		}

		function geocodePoint (e) {
	    coords = e.get('coords');
	    place = {
	    	coords: coords,
	    	metro: undefined,
	    	metro_line: undefined,
	    	street: undefined,
	    	city: undefined
	    };

	    function getStation (metro) {
	    	return metro.replace('метро', '');
	    }

	    ymaps.geocode(coords, {kind: 'metro'}).then( function (res) {
	      metros = [];
	      res.geoObjects.each(function (obj) {
	          metros.push(obj.properties.get('name'));
	      });

	      metro = metros[0];
	      
	      if (!!metro) {
	      	place['metro'] = getStation(metro);
					place['metro_line'] = getMetroLine(place['metro']);
	      } else {
	      	place['metro'] = '';
	      	place['metro_line'] = '';
	      }

			  updatePlace();
	    });

	    ymaps.geocode(coords,{kind: 'house'}).then(function (res) {
	        houses = [];
	        res.geoObjects.each(function (obj) {
	            houses.push(obj.properties.get('name'));
	        });
	        house = houses[0];
	        if (!!house) {
	        	place['street'] = house;
	        } else {
	        	place['street'] = '';
	        }
	        updatePlace();
	    });

	    ymaps.geocode(coords).then(function (res) {
	      names = [];
	      res.geoObjects.each(function (obj) {
	          names.push(obj.properties.get('name'));
	      });

	      loc = names[names.length-3],
	      dist = names[names.length-4];
	      
	      for (var i=1; i<names.length; i++) {
	      	word = names[i];
	      	if (word.indexOf('городской') !== -1 ) {
	      		dist = names[names.indexOf(dist)-1];
	      		break;
	      	};
	      };

       	if (dist == loc) {
        	place['city'] = loc;
        } else {
        	place['city'] = dist + ', ' + loc
        };
				
				updatePlace();
			});

	    function updatePlace() {
	    	place_copy = place;
	    	results = [];
	    	keys = Object.keys(place_copy);
	    	for (var i = 0; i < keys.length; i++) {
	    		key = keys[1];
	    		if (!!place_copy[key]) {
	    			results.push(1);
	    		} else {
	    			results.push(0);
	    		}
	    	}

	    	if ( results.indexOf(0) === -1) {
	    		console.log(place);
	    		return place;
	    	}
	    } 
		}
		
		$scope.mapClick = function (e) {
			if (!($scope.new_place)) {
				return
			}
	   
	  	place_data = geocodePoint(e);
			console.log(place_data);
	  	
	  // $rootScope.new_place = {coordinates: coords.toString(),
	  //   										city: '',
	  //   										metro: '',
			// 			  						metro_line: '',
	  //   										street: ''
	  //   									};





		}


		$scope.calcTime = function(t) {
			var post = Date.parse(t),
				now = new Date,
				d = (now - post)/(1e3*24*3.6e3);

			if (d >= 7) {
				return Math.round(d/7) + ' нед. назад'
			} else {
				if (d >= 1) {
					return Math.round(d) + ' д. назад'
				} else {
					if (d >= 1/24) {
						return 'недавно'
					} else {
						return 'только что'
					}
				}
			}
		}
		
	$scope.choosePlace = function (place_data) {
		$scope.new_place = undefined;
		$scope.current_place = place_data.place;
		$scope.reviews = place_data.reviews;
		console.log($scope.current_place)
	}


	$scope.toggleSearch = function() {
		if (!$('.lo-l-map-opnsearch').hasClass('opened')) {
			$('.lo-l-map-opnsearch').html('Скрыть').addClass('opened');
			$scope.opn($('.ymaps-2-1-34-search'));
			$('.ymaps-2-1-34-input__control').focus();
		} else {
			$('.lo-l-map-opnsearch').html('Найти').removeClass('opened');
			$scope.cls($('.ymaps-2-1-34-search'));
		}
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

}]);

