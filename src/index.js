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
      // const icon = `${data.current.weatherIcons[0]}`;
      const li = document.createElement('li');
      li.classList.add('city');
      const markup = `
          <h2 class="city-name" data-name="${data.location.name},${
        data.location.country
      }">
            <span>${data.location.name}</span>
            <sup>${data.location.country}</sup>
          </h2>
   <div class="city-temp">${Math.round(
     data.current.temperature
   )}<sup>°C</sup></div>
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
