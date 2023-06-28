let weather = {
    "apiKey":"67dbd100d432f222c3e377a9f8b784bc",

    fetchWeather: async function(city)
    {

        let response = await fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        );

        if (response.status == 404){
            document.querySelector(".weather").style.display = "none";
            document.querySelector(".error").style.display = "block";       
        }

        else {
            let data = await response.json()
            const {name} = data;
            const {icon, description} = data.weather[0];
            const {temp, humidity} = data.main;
            const {speed} = data.wind;
            document.querySelector(".city").innerHTML = "Weather in " + name;
            document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
            document.querySelector(".description").innerHTML = description;
            document.querySelector(".temperature").innerHTML = temp.toFixed(1) + "°C";
            document.querySelector(".humidity").innerHTML = "Humidity is " + humidity + "%";
            document.querySelector(".wind").innerHTML = "Wind speed is " + speed +  "km/h";
            document.querySelector(".weather").classList.remove("loading");
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
  
    },

    
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },

};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});


