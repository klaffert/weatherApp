const KEY = config.API_KEY;
const form = document.querySelector('.banner form');
const input = document.querySelector('.banner input');
const errorMessage = document.querySelector('.banner .errorMessage');
const list = document.querySelector('.fetch-section .cities');

function convertToF(celsius) {
  // make the given fahrenheit variable equal the given celsius value
  // multiply the given celsius value by 9/5 then add 32
  let fahrenheit = (celsius * 9) / 5 + 32;
  // return the variable fahrenheit as the answer
  return fahrenheit;
}

convertToF(30);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const listItems = list.querySelectorAll('.fetch-section .city');
  const inputVal = input.value;

  function convertToF(celsius) {
    // make the given fahrenheit variable equal the given celsius value
    // multiply the given celsius value by 9/5 then add 32
    let c = `${Math.round(data.current.temperature)}`;
    let fahrenheit = (c * 9) / 5 + 32;
    // return the variable fahrenheit as the answer
    return fahrenheit;
  }

  const url = `http://api.weatherstack.com/current?access_key=${KEY}&query=${inputVal}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const li = document.createElement('li');
      li.classList.add('city');
      const celsius = `${Math.round(data.current.temperature)}`;
      const fahrenheit = (celsius * 9) / 5 + 32;
      const markup = `
          <h2 class="city-name" data-name="${data.location.name},${data.location.region}">
            <span>${data.location.name}</span>
            <sup>${data.location.region}</sup>
          </h2>
   <div class="city-temp">${fahrenheit}<sup>°F</sup></div>
   <figure>
   <img class="city-icon" src=${data.current.weather_icons[0]}>
   <figcaption>${data.current.weather_descriptions[0]}></figcaption>
   </figure>
        `;
      li.innerHTML = markup;
      list.appendChild(li);
    })
    .catch(() => {
      errorMessage.textContent = 'Please search for a valid city!';
    });
  errorMessage.textContent = '';
  form.reset();
  input.focus();
});
