const apiKey = `3e62c88c7888c7a67a6064c1404706b0`;

const form = document.querySelector(`form`);
const input = document.querySelector(`form input`);
const toggle = document.querySelector(`.form-switch`);


form.addEventListener(`submit`, event => {
  event.preventDefault();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;  
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    createCard(data)
    input.value = ``;
  })

  .catch((error) => {
    errorMessage = `<div class="alert alert-dark" role="alert">${input.value} is not a valid city, please search for a valid one!</div>`
    document.getElementById("card").innerHTML = errorMessage;
  });
});

const createCard = (data) => {
    let html = (
      `
        <h3 class="h6">${data.name}, ${data.sys.country}</h3>
        <i class="wi wi-owm-${data.weather[0].id} display-1"></i>
        <p><span class="h1">${Math.round(data.main.temp)}°<span></p>
        <p>${data.weather[0]["main"]}.</p>
        <div class="row">
          
          <div class="col text-start">
            <p class="fs-6">
            <small>
            <i class="wi wi-thermometer"></i> feels like ${Math.round(data.main.feels_like)}°<br>
            <i class="wi wi-humidity"></i> humidity ${data.main.humidity}%<br>
            <i class="wi wi-barometer"></i> pressure ${data.main.pressure} kPa<br>
            </small>
            </p>
          </div>
          <div class="col text-start">
            <p>
            <small>
            <i class="wi wi-sunrise"></i> sun rise ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}<br>
            <i class="wi wi-sunset"></i> sun set ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}<br>
            <i class="wi wi-strong-wind"></i> wind speed ${Math.round(data.wind.speed * 3.6)}km/h <i class="wi wi-wind from-${data.wind.deg}-deg"></i><br>
            </small>
            </p>
          </div>
          
        </div>
      `
    );
    document.getElementById("card").innerHTML = html;
    document.title = `${data.name} - weather`;

    
};

toggle.addEventListener(`change`, () => {
  var element = document.body;
  element.classList.toggle("dark-mode");
  console.log(`done`)
});
