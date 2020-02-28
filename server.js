var express = require('express');
var request = require('request-promise');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended : true}));

var city = "Rome";

async function getWeather(city) {
    var weather_data = [];

        var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`;

        var response_body = await request(url);

        var weather_json = JSON.parse(response_body);
	
        var weather = {
		
            city : city,
            temperature : Math.round(weather_json.main.temp),
            description : weather_json.weather[0].description,
            // icon : weather_json.weather[0].icon,
	        // country : weather_json.sys.country
        };

        weather_data.push(weather);

    return weather_data;
}

app.get('/', function(req, res) {	
        getWeather(city).then(function(results) {
            var weather_data = {weather_data : results};
            res.render('weather', weather_data);
        });
});

app.post('/', function(req, res) {
        city = req.body.city_name;    
        res.redirect('/');
});

app.listen(8000);