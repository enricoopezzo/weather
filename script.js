const apiKey = `3e62c88c7888c7a67a6064c1404706b0`;

const form = document.querySelector(`form`);
const input = document.querySelector(`form input`);

form.addEventListener(`submit`, event => {
  event.preventDefault();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;  
  
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    createCard(data)
  })

  .catch((error) => {
    errorMessage = `<div class="alert alert-info" role="alert">${input.value} is not a valid city, please search for a valid one!</div>`
    document.getElementById("main").innerHTML = errorMessage;
  });
});

const createCard = (data) => {
    let html = (
      `
      <div class="card card-body">
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>${Math.round(data.main.temp)} C°</p>
        <figure> 
<img class="city-icon" src=http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png alt=${data.weather[0]["main"]}> 
<figcaption>${data.weather[0]["description"]}</figcaption> 
</figure>
        <p>
            <button class="btn btn-primary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
            Show forecast
            </button>
        </p>
        <div class="collapse" id="collapseExample">
        <table>
            5 days
        </table>
        </div>
        </div>
      `
    );
    document.getElementById("main").innerHTML = html;
};


// const getForecast = (data) => {
//   forecastUrl = `api.openweathermap.org/data/2.5/forecast?q=${inputVal}&appid=${apiKey}`
// }