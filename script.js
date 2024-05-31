const api = {
    key: "7e3f21edee540e6110af347b55eb1ab2",
    base: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  async function getResults(query) {
    try {
      const response = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const weather = await response.json();
      displayResults(weather);

    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  }
  
  function displayResults(weather) {
    const city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    const now = new Date();
    const date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    const temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    const weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    const hilow = document.querySelector('.current .hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    searchbox.value = '';

  }
  
  function dateBuilder(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }