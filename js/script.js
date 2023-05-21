// automaticaly enters in Los Angeles on page loadup
window.onload = function(){
    return getData("Los Angeles", key )
};

// resets the font and color of the city name
function resetCityNameStyles() {
    const cityName = document.querySelector(".city-name");
    cityName.style.fontSize = "80px";
    cityName.style.color = "rgb(0, 0, 61)";
  }

// function to get api data 
function getData(cityName, key) {
    axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}&units=imperial`)
        .then(response => {
            const data = response.data;

            let temp = parseInt(data.main.temp);
            let wind = parseInt(data.wind.speed);
            let max = parseInt(data.main.temp_max);
            let min = parseInt(data.main.temp_min);
            let forcast = data.weather[0].description;
            let humidity = parseInt(data.main.humidity);

            var fahrenheit = [temp , max , min]
            window.globalFahrenheit = fahrenheit
            
            console.log("temp:" + " " + temp + "\u00B0" + "F" );
            console.log("wind:" + " " + wind + " " + "mph");
            console.log("high:" + " " + max + "\u00B0" + "F" );
            console.log("low:" + " " + min + "\u00B0" + "F" );
            console.log("forcast:" + " " + forcast);
            console.log("humidity:" + " " + humidity + "%");
           
            updateData({temp , wind , max , min , forcast , humidity});

            resetCityNameStyles();
        })
        .catch(error => {
            const errorMessage = "Please Input a Valid Location";
            const cityName = document.querySelector(".city-name")
            cityName.textContent = errorMessage
            cityName.style.fontSize = "20px";
            cityName.style.color = "red";
            console.log("Error: Location Invalid")
        });
}

// inputs data into html code
function updateData(weatherData) {
    document.querySelector('.main-temp').textContent = `${weatherData.temp}\u00B0F`;
    document.querySelector('.main-forcast').textContent = `${weatherData.forcast}`;
    document.querySelector('.max-data').textContent = `${weatherData.max}\u00B0F`;
    document.querySelector('.min-data').textContent = `${weatherData.min}\u00B0F`;
    document.querySelector('.humidity-data').textContent = `${weatherData.humidity}%`;
    document.querySelector('.wind-data').textContent = `${weatherData.wind} mph`;
};

const cityBtn = document.getElementById("city-btn");
const cityName = document.getElementById("city-input");

// event listener that takes in city name and passes it through api and returns data
cityBtn.addEventListener("click", function(event) {
    const cityName = document.getElementById("city-input").value;
    event.preventDefault();
    if (cityName === "") {
        return;
    }
    document.getElementById("city-input").value = ""
    const titleCityName = toTitleCase(cityName);
    document.querySelector(".city-name").textContent = titleCityName;
    getData(cityName, key);
});

// so that when you hit enter you activate the button
cityName.addEventListener("keydown" , function(event) {
    if(event.key === "Enter"){
    cityBtn.click();
    };
});

// takes string in and returns it in title case
function toTitleCase(str) {
    return str.toLowerCase().replace(/(^|\s)\S/g, function(char) {
      return char.toUpperCase();
    });
  };

  const altBtn = document.querySelector(".alt-btn");
  var globalFahrenheit = []

  altBtn.addEventListener("click", function(event){
    event.preventDefault();
    if(altBtn.textContent === "Convert to Celsius"){
        fahrenheitToCelsius(globalFahrenheit)
        document.querySelector('.main-temp').textContent = `${celsiusArray[0]}\u00B0C`;
        document.querySelector('.max-data').textContent = `${celsiusArray[1]}\u00B0C`;
        document.querySelector('.min-data').textContent = `${celsiusArray[2]}\u00B0C`;
        document.querySelector('.alt-btn').textContent = "Convert to Fahrenheit"
    } else {
        document.querySelector('.main-temp').textContent = `${globalFahrenheit[0]}\u00B0F`;
        document.querySelector('.max-data').textContent = `${globalFahrenheit[1]}\u00B0F`;
        document.querySelector('.min-data').textContent = `${globalFahrenheit[2]}\u00B0F`;
        document.querySelector('.alt-btn').textContent = "Convert to Celsius"
    }
  })

  const celsiusArray = [];

  function fahrenheitToCelsius(fahrenheit) {
    for (var i = 0; i < fahrenheit.length; i++) {
      var celsius = Math.round((fahrenheit[i] - 32) * 5 / 9);
      celsiusArray.push(celsius);
    }
    return celsiusArray;
  }
