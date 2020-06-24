let KEY = config.API_KEY;

fetch(`http://api.weatherstack.com/current?access_key=${KEY}&query=Seattle`)
  .then((response) => response.json())
  .then((data) => console.log(data));
