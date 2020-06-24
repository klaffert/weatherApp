const API_KEY = config.API_KEY;
fetch('http://api.weatherstack.com/current?access_key=API_KEY&query=Altoona')
  .then((response) => response.json())
  .then((data) => console.log(data));
