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

      let time = `${data.location.localtime}`.slice(10, 16);
      time = time.split(':');
      console.log(time);

      let hours = Number(time[0]);
      let minutes = Number(time[1]);

      let timeValue;

      if (hours > 0 && hours <= 12) {
        timeValue = '' + hours;
      } else if (hours > 12) {
        timeValue = '' + (hours - 12);
      } else if (hours == 0) {
        timeValue = '12';
      }

      timeValue += minutes < 10 ? ':0' + minutes : ':' + minutes; // get minutes
      timeValue += hours >= 12 ? ' P.M.' : ' A.M.'; // get AM/PM

      const content = `
          <h2 class="city-name" data-name="${data.location.name}, ${data.location.localtime}">
            <span>${data.location.name}</span>
            <p>${timeValue}</p>
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
      errorMessage.textContent = 'Needs to be a valid city!';
    });
  errorMessage.textContent = '';
  form.reset();
  input.focus();
});
