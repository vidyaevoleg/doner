<<<<<<< HEAD
Topdoner.controller('MainCtrl', ['$scope','$filter','places','reviews','users','$location','$rootScope','$stateParams', function ($scope,$filter,places,reviews,users,$location,$rootScope,$stateParams) {
	$rootScope.places = places.getPlaces();

=======
Topdoner.controller('MainCtrl', ['$scope','$filter','places','reviews','$location','$rootScope','$stateParams', function ($scope,$filter,places,reviews,$location,$rootScope,$stateParams) {
$rootScope.places = places.getPlaces();
  
>>>>>>> 35a40d46432ddea8e0b5acdadad21c4e64872e61
  $rootScope.choosePlace = function(place){   
    $location.path('/places/'+place.properties.id);    
  };	
	
  $rootScope.deletePlace = function(place_id) {
    places.deletePlace(place_id)
    var place = $filter('getPlaceById')($rootScope.places, place_id)
    $rootScope.places.splice($rootScope.places.indexOf(place), 1 );
    $location.path('/home')

  }
  $rootScope.deleteReview = function(review_id){
    reviews.deleteReview(review_id)
    $('#review-'+review_id).toggle(500)
    $location.path('/places/'+ $stateParams.id)
  }
	$rootScope.getMetroColor = function(station) {
    if (place){
      var m = [
        ['Бульвар Рокоссовского','Черкизовская','Преображенская площадь','Сокольники','Красносельская','Комсомольская','Красные ворота','Чистые пруды','Лубянка','Охотный ряд','Библиотека им. Ленина','Кропоткинская','Парк культуры','Фрунзенская','Спортивная','Воробьёвы горы','Университет','Проспект Вернадского','Юго-Западная','Тропарёво'],
        ['Алма-Атинская','Красногвардейская','Домодедовская','Орехово','Царицыно','Кантемировская','Каширская','Коломенская','Автозаводская','Павелецкая','Новокузнецкая','Театральная','Тверская','Маяковская','Белорусская','Динамо','Аэропорт','Сокол','Войковская','Водный стадион','Речной вокзал'],
        ['Пятницкое шоссе','Митино','Волоколамская','Мякинино','Строгино','Крылатское','Молодежная','Кунцевская','Славянский бульвар','Парк Победы','Киевская','Смоленская','Арбатская','Площадь Революции','Курская','Бауманская','Электрозаводская','Семеновская','Партизанская','Измайловская','Первомайская','Щелковская'
  ],
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
      console.log(station);
      for (var i=0; i<12; i++) {
        for (var j=0; j<m[i].length; j++) {
          if (station === m[i][j]) {
  //          console.log('lo-r-card-metro-'+mm[i]);
            return 'lo-r-card-metro-'+mm[i];
          }
        }
      }      
    } else {
      return ''
    } 
	}
	$rootScope.mapClick=function(e){
//		console.log('pop');
      var coords = e.get('coords');
      $scope.new_place = {coordinates: coords.toString()}
      ymaps.geocode(coords,{kind: 'metro'}).then(function (res) {
          var names = [];
          res.geoObjects.each(function (obj) {
              names.push(obj.properties.get('name'));
          });
          var metro = names[0]
          $scope.$apply(function(){
            $scope.new_place['metro'] = metro.substring(6)
          });
      });
      ymaps.geocode(coords).then(function (res) {
          var names = [];
          res.geoObjects.each(function (obj) {
              names.push(obj.properties.get('name'));
          });
          var adress = names[0],city = names[3] + ',' + names[4]
          $scope.$apply(function(){
            $scope.new_place['city'] = city
            $scope.new_place['street'] = adress
          });
      });
    };
	
	
	$scope.fixDropzone = function() {
		$('.dz-message').html('Перетащи фото или кликни');
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
			$('.lo-l-addplace-tip').fadeOut(1000);
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
	
//	$scope.placesSort = '-properties.rating';
	$scope.choosePlacesSort = function(what) {
		$('.lo-r-nav-select-item').removeClass('active');
//		console.log($(s);
		if (what === 'r') {
			$('.lo-r-nav-select-item-r').addClass('active');
		}
		if (what === 'p') {
			$('.lo-r-nav-select-item-p').addClass('active');
		}
		if (what === 'n') {
			$('.lo-r-nav-select-item-n').addClass('active');
		}
	}

	
}]);