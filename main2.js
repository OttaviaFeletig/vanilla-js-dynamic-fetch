const API_KEY = "a6d240a2d9d5496fac4114433200112";
let city = "Berlin";

const getDataForAnyCity = async () => {
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
    );
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      console.log("response.status", response.status);
    }
  } catch (error) {
    console.log("error", error);
  }
};

const displayData = async () => {
  const data = await getDataForAnyCity();
  if (data) {
    // hide spinner
    const spinner = document.getElementById("spinner");
    spinner.classList.add("invisible");
    //show table
    const table = document.getElementById("data-to-display");
    table.classList.remove("invisible");

    const city = document.getElementById("city");
    const tbody = document.getElementById("weather-data");
    cleanDOM(city, tbody);

    const { current, forecast, location } = data;
    city.innerText = `Diplaying the weather for ${location.name} in ${location.country}`;
    forecast.forecastday.forEach((day) => {
      const row = document.createElement("tr");
      const td1 = document.createElement("td");
      const td2 = document.createElement("td");
      const td3 = document.createElement("td");
      const td4 = document.createElement("td");
      td1.innerText = day.date;
      td2.innerText = day.day.mintemp_c;
      td3.innerText = day.day.maxtemp_c;
      td4.innerText = day.day.condition.text;
      row.appendChild(td1);
      row.appendChild(td2);
      row.appendChild(td3);
      row.appendChild(td4);
      tbody.appendChild(row);
    });
  } else {
    alert("something went wrong");
  }
};

const cleanDOM = (city, tbody) => {
  city.innerHTML = "";
  tbody.innerHTML = "";
  document.getElementById("city-search").value = "";
};
const createEvents = () => {
  const search = document.getElementById("city-search");

  search.addEventListener("change", searchForCity);
  search.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      displayData();
    }
  });
};

const searchForCity = (event) => {
  city = event.target.value;
};
const controller = () => {
  displayData();
  createEvents();
};
controller();
