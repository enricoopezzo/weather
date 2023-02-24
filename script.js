const apiKey = `3e62c88c7888c7a67a6064c1404706b0`;

// const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

const form = document.querySelector(`form`);

form.addEventListener(`submit`, event => {
  event.preventDefault();
  const inputVal = form.input.value;
  console.log(inputVal)
});