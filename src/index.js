const KEY = config.API_KEY;
const form = document.querySelector('.banner form');
const input = document.querySelector('.banner input');
const errorMessage = document.querySelector('.banner .errorMessage');
const list = document.querySelector('.fetch-section .cities');

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const listItems = list.querySelectorAll('.fetch-section .city');
  const inputVal = input.value;

  const url = `http://api.weatherstack.com/current?access_key=${KEY}&query=${inputVal}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const li = document.createElement('li');
      li.classList.add('city');

      //Convert C to F
      const celsius = `${Math.trunc(data.current.temperature)}`;
      const fahrenheit = Math.trunc((celsius * 9) / 5 + 32);

      const content = `
          <h2 class="city-name" data-name="${data.location.name}">
            <span>${data.location.name}</span>
          </h2>
          <div class="city-temp">${fahrenheit}<sup>°F</sup></div>
          <figure>
            <img class="city-icon" src=${data.current.weather_icons[0]}>
              <figcaption>${data.current.weather_descriptions[0]}</figcaption>
          </figure>
        `;
      li.innerHTML = content;
      list.appendChild(li);
    })
    .catch(() => {
      errorMessage.textContent = 'Please search for a valid city!';
    });
  errorMessage.textContent = '';
  form.reset();
  input.focus();
});
