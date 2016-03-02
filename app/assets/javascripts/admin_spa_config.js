var Topdoner = angular.module('Topdoner_admin', ['yaMap']);

Topdoner.filter('isRated', function () {
  return function (items) {
    return items.filter(function (item) {
      return parseInt(item.properties.rating) > 0
    })
  }
});

Topdoner.filter('getPlaceById', function() {
  return function (input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (input[i].properties.id == id) {
        return input[i];
      }
    }
    return null;
  }
});

Topdoner.filter('getReviewById', function () {
  return function (input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (input[i].id == id) {
        return input[i];
      }
    }
    return null;
  }
});

Topdoner.service('geocodingService', [function () {
	var place; 
	
	this.get = function (coordinates) {
		place = {
	    	coords: coordinates,
	    	metro: undefined,
	    	metro_line: undefined,
	    	street: undefined,
	    	city: undefined		
		}
		return this.getMetro(coordinates)

		.then(function (res) {
			place.metro = obtainMetros(res.geoObjects);
			place.metro_line = getMetroLine(place.metro);
			return this.getStreet(coordinates);
		}.bind(this))

		.then(function (res) {
			place.street = obtainStreets(res.geoObjects);
			return this.getCity(coordinates);
		}.bind(this))
		
		.then(function (res) {
			place.city =  obtainCities(res.geoObjects);
			return place;
		});
	}

	this.getMetro = function(coords) {
	    return ymaps.geocode(coords, {kind: 'metro'});
	}    

	this.getStreet = function (coords) {
	    return ymaps.geocode(coords,{kind: 'house'});
	}

	this.getCity = function (coords) {
	    return ymaps.geocode(coords)
	}

	function obtainMetros (geobjects) {
	    metros = [];
	    geobjects.each(function (obj) {
	        metros.push(obj.properties.get('name'));
	    });

	    metro = metros[0];
	      
	    if (!!metro) {
	      	return metro.replace('метро ', '');
	    } else {
	      	return '';
	    }

	}

	function obtainStreets (geobjects) {
	        houses = [];
	        geobjects.each(function (obj) {
	            houses.push(obj.properties.get('name'));
	        });
	        house = houses[0];
	        
	        if (!!house) {
	        	return house;
	        } else {
	        	return '';
	        }
	}

	function obtainCities (geobjects) {
		names = [];
		
		geobjects.each(function (obj) {
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
        	return loc;
        } else {
        	return dist + ', ' + loc
        };
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

}]);


Topdoner.service('dataProvider', ['places','users', 'vkposts', '$filter', function (places, users, vkposts, reviews, $filter) {


	// if (!($scope.current_user)) {
	//     users.getCurrentUser().then(function(data){
	//     	$scope.current_user = data;
	//     })
	// }
		
	var obj = {
		

	}

	return obj;
}]);



Topdoner.directive('starRating',
	['$compile',function($compile) {
		return {
			restrict : 'A',
			template : '<ul class="rating">'
					 + '	<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">'
					 + '\u2605'
					 + '</li>'
					 + '</ul>',
			scope : {
				ratingValue : '=',
				max : '=',
				onRatingSelected : '&'
			},
			link : function(scope, elem, attrs) {
				var updateStars = function() {
					scope.stars = [];
					for ( var i = 0; i < scope.max; i++) {
						scope.stars.push({
							filled : i < scope.ratingValue
						});
					}
				};
				
				scope.toggle = function(index) {
					scope.ratingValue = index + 1;
					scope.onRatingSelected({
						rating : index + 1
					});
				};
				
				scope.$watch('ratingValue',
					function(oldVal, newVal) {
						if (newVal) {
							updateStars();
						}
					}
				);
			}
		};
	}]
);

