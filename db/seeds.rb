# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
User.create(username: 'vidyai', username: 'olezha', email: 'admin@mail.ru',password: '12345678', image_url: 'http://vignette1.wikia.nocookie.net/keklandia/images/1/19/%D0%9A%D0%95%D0%9A/revision/latest/scale-to-width-down/670?cb=20150909100914&path-prefix=ru')
Place.create(user_id: 1,street: 'Каширская',city: 'Москва', metro: 'Каширская',coordinates: '[37.411961,55.831903]')
Place.create(user_id: 1,street: 'Москворечье',city: 'Москва', metro: 'Чеховская',coordinates: '[37.565466,55.763338]')
Place.create(user_id: 1,street: 'Советская',city: 'Москва', metro: 'Серпуховская',coordinates: '[37.565466,55.766318]')
Place.create(user_id: 1,street: 'Барикадная',city: 'Москва', metro: 'Калужская',coordinates: '[37.616332,55.744521]')
Place.create(user_id: 1,street: 'Комсомольская',city: 'Москва', metro: 'Комсомольская',coordinates: '[37.415983,55.792559]')
Place.create(user_id: 1,street: 'Пионерская',city: 'Москва', metro: 'Киевская',coordinates: '[37.432183,55.791229]')
Place.create(user_id: 1,street: 'Октябрьская',city: 'Москва', metro: 'Охотный ряд',coordinates: '[37.435222,55.793111]')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180,  vegetables: 3,meat: 4,sanitation: 2,service: 5,place_id: 1,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 2,meat: 5,sanitation: 3,service: 6,place_id: 2,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 3,meat: 4,sanitation: 4,service: 2,place_id: 3,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сcity: cие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 4,meat: 3,sanitation: 5,service: 3,place_id: 4,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 5,meat: 2,sanitation: 6,service: 3,place_id: 5,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 5,meat: 2,sanitation: 6,service: 3,place_id: 6,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 2,meat: 5,sanitation: 3,service: 6,place_id: 2,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 3,meat: 4,sanitation: 4,service: 2,place_id: 3,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сcity: cие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 4,meat: 3,sanitation: 5,service: 3,place_id: 4,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 5,meat: 2,sanitation: 6,service: 3,place_id: 5,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 3,meat: 4,sanitation: 2,service: 6,place_id: 1,body: 'Xего я был похож на голодного льва, который раздирал свою жертву мотая головой из стороны в сторону (-)Амбре было не из приятных – ближайшие три часа, зажевывая все запахи ')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 2,meat: 5,sanitation: 3,service: 6,place_id: 2,body: 'Xего я был похож на голодного льва, который раздирал свою жертву мотая головой из стороны в сторону (-)Амбре было не из приятных – ближайшие три часа, зажевывая все запахи ')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 3,meat: 4,sanitation: 4,service: 2,place_id: 3,body: 'Xего я был похож на голодного льва, который раздирал свою жертву мотая головой из стороны в сторону (-)Амбре было не из приятных – ближайшие три часа, зажевывая все запахи ')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 4,meat: 3,sanitation: 5,service: 3,place_id: 4,body: 'Xего я был похож на голодного льва, который раздирал свою жертву мотая головой из стороны в сторону (-)Амбре было не из приятных – ближайшие три часа, зажевывая все запахи ')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 5,meat: 2,sanitation: 6,service: 3,place_id: 5,body: 'Xего я был похож на голодного льва, который раздирал свою жертву мотая головой из стороны в сторону (-)Амбре было не из приятных – ближайшие три часа, зажевывая все запахи ')
Review.create(user_id: 1,title: 'Супер от луши', total: 8,author: '',min_price: 120, max_price: 180, vegetables: 5,meat: 2,sanitation: 6,service: 3,place_id: 6,body: 'Так получилось, что провидение забросило меня к ещё одному клинскому алтарю. После дневного променада голоден не был, но искусство требует жертв, тем более роль Мастера исполняет особь женского пола. Грех было не проверить постулат о том, что противоположный пол к святыням лучше не подпускать. Место - поворот на посёлок Майданово с Ленинградского шоссе. Время - 18.20
Барышня работает медленно. Не с душой, а неуклюже. Первый звоночек, однако. Гранатового соуса не оказалось. Вроде был, но закончился. Второй звоночек. Спросила с собой или нет. Плюхнула шлепок, пожелала приятного аппетита. Похвально, но..')
Review.create(user_id: 1,title: 'FUCKING AMAZING', total: 6, author: '',min_price: 120, max_price: 180, vegetables: 3,meat: 4,sanitation: 2,service: 5,place_id: 1,body: 'Так получилось, что провидение забросило меня к ещё одному клинскому алтарю. После дневного променада голоден не был, но искусство требует жертв, тем более роль Мастера исполняет особь женского пола. Грех было не проверить постулат о том, что противоположный пол к святыням лучше не подпускать. Место - поворот на посёлок Майданово с Ленинградского шоссе. Время - 18.20
Барышня работает медленно. Не с душой, а неуклюже. Первый звоночек, однако. Гранатового соуса не оказалось. Вроде был, но закончился. Второй звоночек. Спросила с собой или нет. Плюхнула шлепок, пожелала приятного аппетита. Похвально, но..')
Review.create(user_id: 1,title: 'FUCKING AMAZING', total: 6, author: '',min_price: 120, max_price: 180, vegetables: 2,meat: 5,sanitation: 3,service: 6,place_id: 2,body: 'Так получилось, что провидение забросило меня к ещё одному клинскому алтарю. После дневного променада голоден не был, но искусство требует жертв, тем более роль Мастера исполняет особь женского пола. Грех было не проверить постулат о том, что противоположный пол к святыням лучше не подпускать. Место - поворот на посёлок Майданово с Ленинградского шоссе. Время - 18.20
Барышня работает медленно. Не с душой, а неуклюже. Первый звоночек, однако. Гранатового соуса не оказалось. Вроде был, но закончился. Второй звоночек. Спросила с собой или нет. Плюхнула шлепок, пожелала приятного аппетита. Похвально, но..')
Review.create(user_id: 1,title: 'FUCKING AMAZING', total: 6, author: '',min_price: 120, max_price: 180, vegetables: 3,meat: 4,sanitation: 4,service: 2,place_id: 3,body: 'Так получилось, что провидение забросило меня к ещё одному клинскому алтарю. После дневного променада голоден не был, но искусство требует жертв, тем более роль Мастера исполняет особь женского пола. Грех было не проверить постулат о том, что противоположный пол к святыням лучше не подпускать. Место - поворот на посёлок Майданово с Ленинградского шоссе. Время - 18.20
Барышня работает медленно. Не с душой, а неуклюже. Первый звоночек, однако. Гранатового соуса не оказалось. Вроде был, но закончился. Второй звоночек. Спросила с собой или нет. Плюхнула шлепок, пожелала приятного аппетита. Похвально, но..')
Review.create(user_id: 1,title: 'FUCKING AMAZING', total: 6, author: '',min_price: 120, max_price: 180, vegetables: 4,meat: 3,sanitation: 5,service: 3,place_id: 4,body: 'Так получилось, что провидение забросило меня к ещё одному клинскому алтарю. После дневного променада голоден не был, но искусство требует жертв, тем более роль Мастера исполняет особь женского пола. Грех было не проверить постулат о том, что противоположный пол к святыням лучше не подпускать. Место - поворот на посёлок Майданово с Ленинградского шоссе. Время - 18.20
Барышня работает медленно. Не с душой, а неуклюже. Первый звоночек, однако. Гранатового соуса не оказалось. Вроде был, но закончился. Второй звоночек. Спросила с собой или нет. Плюхнула шлепок, пожелала приятного аппетита. Похвально, но..')
Review.create(user_id: 1,title: 'FUCKING AMAZING', total: 6, author: '',min_price: 120, max_price: 180, vegetables: 5,meat: 2,sanitation: 6,service: 3,place_id: 5,body: 'Так получилось, что провидение забросило меня к ещё одному клинскому алтарю. После дневного променада голоден не был, но искусство требует жертв, тем более роль Мастера исполняет особь женского пола. Грех было не проверить постулат о том, что противоположный пол к святыням лучше не подпускать. Место - поворот на посёлок Майданово с Ленинградского шоссе. Время - 18.20
Барышня работает медленно. Не с душой, а неуклюже. Первый звоночек, однако. Гранатового соуса не оказалось. Вроде был, но закончился. Второй звоночек. Спросила с собой или нет. Плюхнула шлепок, пожелала приятного аппетита. Похвально, но..')
Review.create(user_id: 1,title: 'SUPAAA', total: 3,author: '',min_price: 120, max_price: 180, vegetables: 5,meat: 2,sanitation: 6,service: 3,place_id: 6,body: 'Продолжаю социальный эксперимент по обзору заведений, радующих страждующих в славном городе Клин. На сей раз самое сердце города - Ленинградское шоссе. Место, известное аборигенам как М-10. Для голодных дачников - пересечение ленинградки и улицы Гагарина. Отчетом о шаурме в неприметной палатке, находящейся в ТД Мытищи, в городе Мытищи, что логично. ')
Review.create(user_id: 1,title: 'SUPAAA', total: 3,author: '',min_price: 120, max_price: 180, vegetables: 2,meat: 5,sanitation: 3,service: 6,place_id: 2,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
Review.create(user_id: 1,title: 'SUPAAA', total: 3,author: '',min_price: 120, max_price: 180, vegetables: 3,meat: 4,sanitation: 4,service: 2,place_id: 3,body: 'Отчетом о шаурме в неприметной палатке, находящейся в ТД Мытищи, в городе Мытищи, что логично. ')
Review.create(user_id: 1,title: 'SUPAAA', total: 3,author: '',min_price: 120, max_price: 180, vegetables: 4,meat: 3,sanitation: 5,service: 3,place_id: 4,body: 'Отчетом о шаурме в неприметной палатке, находящейся в ТД Мытищи, в городе Мытищи, что логично. Город Мытищи изобилует шаурмячными предложениями, но по пути была эта — мы заценили и не разочаровались, чего и вам советуем. Цена — 120 р. за свиток в сырном лаваше, 110 р. за обычную. ')
Review.create(user_id: 1,title: 'SUPAAA', total: 3,author: '',min_price: 120, max_price: 180, vegetables: 5,meat: 2,sanitation: 6,service: 3,place_id: 5,body: 'Отчетом о шаурме в неприметной палатке, находящейся в ТД Мытищи, в городе Мытищи, что логично. Город Мытищи изобилует шаурмячными предложениями, но по пути была эта — мы заценили и не разочаровались, чего и вам советуем. Цена — 120 р. за свиток в сырном лаваше, 110 р. за обычную. ')
Review.create(user_id: 1,title: 'SUPAAA', total: 3,author: '',min_price: 120, max_price: 180, vegetables: 5,meat: 2,sanitation: 6,service: 3,place_id: 6,body: 'Отчетом о шаурме в неприметной палатке, находящейся в ТД Мытищи, в городе Мытищи, что логично. Город Мытищи изобилует шаурмячными предложениями, но по пути была эта — мы заценили и не разочаровались, чего и вам советуем.Цена — 120 р. за свиток в сырном лаваше, 110 р. за обычную. ')
Review.create(user_id: 1,title: 'SUPAAA', total: 3,author: '',min_price: 120, max_price: 180, vegetables: 3,meat: 4,sanitation: 2,service: 5,place_id: 1,body: 'Отчетом о шаурме в неприметной палатке, находящейся в ТД Мытищи, в городе Мытищи, что логично. Город Мытищи изобилует шаурмячными предложениями, но по пути была эта — мы заценили и не разочаровались, чего и вам советуем. Цена — 120 р. за свиток в сырном лаваше, 110 р. за обычную. ')
Review.create(user_id: 1,title: 'SUPAAA', total: 3,author: '',min_price: 120, max_price: 180, vegetables: 2,meat: 5,sanitation: 3,service: 6,place_id: 2,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
Review.create(user_id: 1,title: 'SUPAAA', total: 3,author: '',min_price: 120, max_price: 180, vegetables: 3,meat: 4,sanitation: 4,service: 2,place_id: 3,body: 'Отчетом о шаурме в неприметной палатке, находящейся в ТД Мытищи, в городе Мытищи, что логично. Город Мытищи изобилует шаурмячными предложениями, но по пути была эта — мы заценили и не разочаровались, чего и вам советуем.Цена — 120 р. за свиток в сырном лаваше, 110 р. за обычную. ')
Review.create(user_id: 1,title: 'SUPAAA', total: 3,author: '',min_price: 120, max_price: 180, vegetables: 4,meat: 3,sanitation: 5,service: 3,place_id: 4,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
Review.create(user_id: 1,title: 'SUPAAA', total: 3,author: '',min_price: 120, max_price: 180, vegetables: 5,meat: 2,sanitation: 6,service: 3,place_id: 5,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
Review.create(user_id: 1,title: 'SUPAAA', total: 3,author: '',min_price: 120, max_price: 180, vegetables: 5,meat: 2,sanitation: 6,service: 3,place_id: 6,body: 'Лаваш. Вот он меня слегка разочаровал. Хоть сие чудо и долго томилось под прессом, лаваш оказался резиновый, и некоторые места с трудом отдирались зубами, от чего я был похож на голодного льва, который раздирал')
