jQuery ->
	cont = $('#chart')
	Morris.Line
		element: 'visits'
		data: JSON.parse(cont.attr('data-visits'))
		xkey: 'time_at'
		ykeys: ['values']
		labels: ['Посещаемость сайта']
		parseTime: false
	Morris.Line
		element: 'reviews'
		data: JSON.parse(cont.attr('data-reviews-per-day'))
		xkey: 'time_at'
		ykeys: ['values']
		labels: ['Создание отзывов']
		parseTime: false
	Morris.Line
		element: 'places'
		data: JSON.parse(cont.attr('data-places-per-day'))
		xkey: 'time_at'
		ykeys: ['values']
		labels: ['Создание мест']
		parseTime: false			
	Morris.Line
		element: 'users'
		data: JSON.parse(cont.attr('data-users-per-day'))
		xkey: 'time_at'
		ykeys: ['values']
		labels: ['Создание юзеров']
		parseTime: false		
	Morris.Donut
	  element: 'devices'
	  data: JSON.parse(cont.attr('data-devices'))
