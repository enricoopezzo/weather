const apiKey = `3e62c88c7888c7a67a6064c1404706b0`;
// Query selectors
const form = document.querySelector(`form`);
const input = document.querySelector(`form input`);
const toggle = document.querySelector(`.form-check-input`);
const toggleIcon = document.querySelector(`.form-switch label`)


form.addEventListener(`submit`, event => {
  event.preventDefault(); //prevent page reload
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;  
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    createCard(data)
    input.value = ``;
  })

  .catch((error) => {
    errorMessage = `<div class="alert alert-dark" role="alert">${input.value} is not a valid city, please search for a valid one!</div>`;
    document.getElementById(`card`).innerHTML = errorMessage;
  });
});

const createCard = (data) => {
    let html = (
      `
        <h3 class="h6 mb-3">${data.name.toUpperCase()}, ${data.sys.country}</h3>
        <i class="wi wi-owm-${new Date(data.sys.sunrise *1000).getTime() <= new Date().getTime() && new Date(data.sys.sunset * 1000).getTime() > new Date().getTime() ? `day-` + data.weather[0].id : `night-` + data.weather[0].id} display-1"></i>
        <p class="mb-5 fs-1"><span class="h1">${Math.round(data.main.temp)}°<span><br>
          <span class="h2">${data.weather[0]["main"]}.</span>          
        </p>
        <div class="row">
          <div class="col text-start">
            <p class="fs-6">
            <small>
            <i class="wi wi-thermometer"></i> feels like ${Math.round(data.main.feels_like)}°<br>
            <i class="wi wi-humidity"></i> humidity ${data.main.humidity}%<br>
            <i class="wi wi-barometer"></i> pressure ${data.main.pressure}hPa<br>
            </small>
            </p>
          </div>
          <div class="col text-start">
            <p>
            <small>
            <i class="wi wi-sunrise"></i> sunrise ${new Date((data.sys.sunrise + data.timezone) * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}<br>
            <i class="wi wi-sunset"></i> sunset ${new Date((data.sys.sunset + data.timezone) * 1000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}<br>
            <i class="wi wi-strong-wind"></i> wind ${Math.round(data.wind.speed * 3.6)}km/h <i class="wi wi-wind from-${data.wind.deg}-deg"></i><br>
            </small>
            </p>
          </div>
          
        </div>
      `
    );

    document.getElementById(`card`).innerHTML = html;
    document.title = `Current Weather - ${data.name}`;
};

// Dark mode

toggle.addEventListener(`change`, () => {
  const element = document.querySelector('html');
  const darkModeOn = toggle.checked;
  if (darkModeOn) {
    element.setAttribute(`data-bs-theme`, `dark`);
    toggleIcon.innerHTML = `<i class="wi wi-night-clear"></i>`;
  } else {
    element.removeAttribute(`data-bs-theme`);
    toggleIcon.innerHTML = `<i class="wi wi-day-sunny"></i>`;
  }
});