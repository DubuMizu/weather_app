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
            console.log(data);
            const {name} = data;
            const {icon, description} = data.weather[0];
            const {temp, humidity, feels_like, temp_min, temp_max, pressure} = data.main;
            const {speed, deg} = data.wind;
            document.querySelector(".city").innerHTML = "Weather in " + name;
            document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
            document.querySelector(".description").innerHTML = description;
            document.querySelector(".temperature").innerHTML = temp.toFixed(1) + "°C" + " | " + (temp * 9/5 + 32).toFixed(1) + "°F";

            // Add information based on user's settings.

            if (localStorage.getItem("minMaxTemp") == "true")
            {
                document.querySelector(".minMaxTemp").innerHTML = "Lows of " + temp_min.toFixed(1) + "°C" + " | " + (temp_min * 9/5 + 32).toFixed(1) + "°F" + "<br>" +
                "Highs of " + temp_max.toFixed(1) + "°C" + " | " + (temp_max * 9/5 + 32).toFixed(1) + "°F";
            }
            if (localStorage.getItem("feelsLike") == "true")
            {
                document.querySelector(".feelsLike").innerHTML = "It feels like " + feels_like.toFixed(1) + "°C" + " | " + (feels_like * 9/5 + 32).toFixed(1) + "°F";
            }
            if (localStorage.getItem("humidity") == "true")
            {
                document.querySelector(".humidity").innerHTML = "Humidity is " + humidity + "%";
            }
            if (localStorage.getItem("pressure") == "true")
            {
                document.querySelector(".pressure").innerHTML = "Pressure is " + pressure + "hPa";
            }
            if (localStorage.getItem("windSpeed") == "true")
            {
                document.querySelector(".windSpeed").innerHTML = "Wind speed is " + speed +  "km/h";
            }
            if (localStorage.getItem("windDirection") == "true")
            {
                document.querySelector(".windDirection").innerHTML = "Wind is blowing at " + deg +  "°";
            }
            document.querySelector(".windSpeed").innerHTML = "Wind speed is " + speed +  "km/h";

            document.querySelector(".weather").classList.remove("loading");
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
  
    },

    
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },

    openSettings: function() {
        document.querySelector(".card").style.display = "none";
        document.querySelector(".settings").style.display = "block";
    },

    backSettings: function() {
        document.querySelector(".card").style.display = "block";
        document.querySelector(".settings").style.display = "none";
    }

};

document.querySelector(".search button").addEventListener("click", function() {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

document.querySelector(".settings-btn").addEventListener("click", function() {
    weather.openSettings();
});

document.querySelector(".btn-back").addEventListener("click", function() {
    weather.backSettings();
});

// Local storage

let ls = {
    defaultSettings: function()
    {
        if (localStorage.getItem("isLoaded") === null)
        {
            localStorage.setItem("isLoaded", "true");
            localStorage.setItem("feelsLike", "false");
            localStorage.setItem("humidity", "true");
            localStorage.setItem("pressure", "false");
            localStorage.setItem("minMaxTemp", "false");
            localStorage.setItem("windSpeed", "true");
            localStorage.setItem("windDirection", "false");
        }
        
    },

    resetSettings: function()
    {
        localStorage.setItem("isLoaded", "true");
        localStorage.setItem("feelsLike", "false");
        localStorage.setItem("humidity", "true");
        localStorage.setItem("pressure", "false");
        localStorage.setItem("minMaxTemp", "false");
        localStorage.setItem("windSpeed", "true");
        localStorage.setItem("windDirection", "false");
    },

    checkSettings: function()
    {
        if (localStorage.getItem("feelsLike") == "true")
        {
            document.querySelector(".feelslikeBox").checked = true;
        }
        if (localStorage.getItem("humidity") == "true")
        {
            document.querySelector(".humidityBox").checked = true;
        }
        if (localStorage.getItem("pressure") == "true")
        {
            document.querySelector(".pressureBox").checked = true;
        }
        if (localStorage.getItem("minMaxTemp") == "true")
        {
            document.querySelector(".minmaxtempBox").checked = true;
        }
        if (localStorage.getItem("windSpeed") == "true")
        {
            document.querySelector(".windspeedBox").checked = true;
        }
        if (localStorage.getItem("windDirection") == "true")
        {
            document.querySelector(".winddirectionBox").checked = true;
        }
    },
}

ls.defaultSettings();
ls.checkSettings();

