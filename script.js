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
            else
            {
                document.querySelector(".minMaxTemp").innerHTML = "";
            } 

            if (localStorage.getItem("feelsLike") == "true")
            {
                document.querySelector(".feelsLike").innerHTML = "It feels like " + feels_like.toFixed(1) + "°C" + " | " + (feels_like * 9/5 + 32).toFixed(1) + "°F";
            }
            else
            {
                document.querySelector(".feelsLike").innerHTML = "";
            } 

            if (localStorage.getItem("humidity") == "true")
            {
                document.querySelector(".humidity").innerHTML = "Humidity is " + humidity + "%";
            }
            else
            {
                document.querySelector(".humidity").innerHTML = "";
            } 

            if (localStorage.getItem("pressure") == "true")
            {
                document.querySelector(".pressure").innerHTML = "Pressure is " + pressure + "hPa";
            }
            else
            {
                document.querySelector(".pressure").innerHTML = "";
            } 

            if (localStorage.getItem("windSpeed") == "true")
            {
                document.querySelector(".windSpeed").innerHTML = "Wind speed is " + speed +  "km/h";
            }
            else
            {
                document.querySelector(".windSpeed").innerHTML = "";
            } 

            if (localStorage.getItem("windDirection") == "true")
            {
                document.querySelector(".windDirection").innerHTML = "Wind is blowing at " + deg +  "°";
            }
            else
            {
                document.querySelector(".windDirection").innerHTML = "";
            } 

            document.querySelector(".weather").classList.remove("loading");
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
            document.querySelector("#citySaved").innerHTML = "Add to saved cities?"
        }
  
    },

    setWeather: async function(city) {
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
            document.querySelector(".yc-city").innerHTML = "Weather in " + name;
            document.querySelector(".yc-icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
            document.querySelector(".yc-description").innerHTML = description;
            document.querySelector(".yc-temperature").innerHTML = temp.toFixed(1) + "°C" + " | " + (temp * 9/5 + 32).toFixed(1) + "°F";

            // Add information based on user's settings.

            if (localStorage.getItem("yc-minMaxTemp") == "true")
            {
                document.querySelector(".yc-minMaxTemp").innerHTML = "Lows of " + temp_min.toFixed(1) + "°C" + " | " + (temp_min * 9/5 + 32).toFixed(1) + "°F" + "<br>" +
                "Highs of " + temp_max.toFixed(1) + "°C" + " | " + (temp_max * 9/5 + 32).toFixed(1) + "°F";
            }
            else
            {
                document.querySelector(".yc-minMaxTemp").innerHTML = "";
            } 

            if (localStorage.getItem("feelsLike") == "true")
            {
                document.querySelector(".yc-feelsLike").innerHTML = "It feels like " + feels_like.toFixed(1) + "°C" + " | " + (feels_like * 9/5 + 32).toFixed(1) + "°F";
            }
            else
            {
                document.querySelector(".yc-feelsLike").innerHTML = "";
            } 

            if (localStorage.getItem("humidity") == "true")
            {
                document.querySelector(".yc-humidity").innerHTML = "Humidity is " + humidity + "%";
            }
            else
            {
                document.querySelector(".yc-humidity").innerHTML = "";
            } 

            if (localStorage.getItem("pressure") == "true")
            {
                document.querySelector(".yc-pressure").innerHTML = "Pressure is " + pressure + "hPa";
            }
            else
            {
                document.querySelector(".yc-pressure").innerHTML = "";
            } 

            if (localStorage.getItem("windSpeed") == "true")
            {
                document.querySelector(".yc-windSpeed").innerHTML = "Wind speed is " + speed +  "km/h";
            }
            else
            {
                document.querySelector(".yc-windSpeed").innerHTML = "";
            } 

            if (localStorage.getItem("windDirection") == "true")
            {
                document.querySelector(".yc-windDirection").innerHTML = "Wind is blowing at " + deg +  "°";
            }
            else
            {
                document.querySelector(".yc-windDirection").innerHTML = "";
            } 

            document.querySelector(".weather").classList.remove("loading");
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + name + "')"
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    },

    //search for the city using the user's input
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },

    //open the settings page
    openSettings: function() {
        document.querySelector(".card").style.display = "none";
        document.querySelector(".settings").style.display = "block";
    },

    //close the settings page
    backSettings: function() {
        document.querySelector(".card").style.display = "block";
        document.querySelector(".settings").style.display = "none";
        document.querySelector(".yc-card").style.display = "none";
        
    },

    //open the your cities page
    yourCities: function() {
        document.querySelector(".card").style.display = "none";
        document.querySelector(".yc-card").style.display = "block";
        if (JSON.parse(localStorage.getItem("savedCities")) != null)
        {
            document.querySelector(".empty-card").style.display = "none";
            var cityZero = JSON.parse(localStorage.getItem("savedCities"))[cityIndex];
            this.setWeather(cityZero);
        }
    },

    //show next saved city when clicked
    nextCity: function() {
        cityIndex++;
        if (cityIndex > 10)
        {
            cityIndex--;
        }
        cityZero = JSON.parse(localStorage.getItem("savedCities"))[cityIndex];
        this.setWeather(cityZero);
    },

    //show previous saved city when clicked
    prevCity: function() {
        cityIndex--;
        if (cityIndex < 0)
        {
            cityIndex++;
        }
        cityZero = JSON.parse(localStorage.getItem("savedCities"))[cityIndex];
        this.setWeather(cityZero);
    },


    //close the your cities page
    ycBack: function() {
        document.querySelector(".card").style.display = "block";
        document.querySelector(".yc-card").style.display = "none";
    },

    //add city to saved cities list
    saveCity: function() {
        //get city name 
        var newcity = document.querySelector(".search-bar").value;

        //if there is nothing saved, save an empty array
        if (localStorage.getItem("savedCities") == null)
        {
            localStorage.setItem("savedCities", "[]");
        }

        //get existing array
        var citylist = JSON.parse(localStorage.getItem("savedCities"));

        //check if the city is already added to the list
        if (citylist.includes(newcity))
        {
            document.querySelector("#citySaved").innerHTML = "You have already added this city to your list!";
            return
        }

        citylist.push(newcity);
        //save array
        localStorage.setItem("savedCities", JSON.stringify(citylist));
        document.querySelector("#citySaved").innerHTML = "This city has been added to your list!";
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

document.querySelector(".yc-btn").addEventListener("click", function() {
    weather.yourCities();
});

document.querySelector(".yc-back").addEventListener("click", function() {
    weather.ycBack();
});

document.querySelector(".savecity-btn").addEventListener("click", function() {
    weather.saveCity();
});

document.querySelector(".next-arrow-btn").addEventListener("click", function() {
    weather.nextCity();
});

document.querySelector(".prev-arrow-btn").addEventListener("click", function() {
    weather.prevCity();
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
            localStorage.setItem("savedCities", "");
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

// Change local storage based on if checkbox is checked or not
document.getElementById("feelslikeBox").addEventListener("change", function() {
    if (document.getElementById("feelslikeBox").checked === true)
    {
        localStorage.setItem("feelsLike", "true");
    }

    if (document.getElementById("feelslikeBox").checked === false)
    {
        localStorage.setItem("feelsLike", "false");
    }
})

document.getElementById("humidityBox").addEventListener("change", function() {
    if (document.getElementById("humidityBox").checked === true)
    {
        localStorage.setItem("humidity", "true");
    }

    if (document.getElementById("humidityBox").checked === false)
    {
        localStorage.setItem("humidity", "false");
    }
})

document.getElementById("pressureBox").addEventListener("change", function() {
    if (document.getElementById("pressureBox").checked === true)
    {
        localStorage.setItem("pressure", "true");
    }

    if (document.getElementById("pressureBox").checked === false)
    {
        localStorage.setItem("pressure", "false");
    }
})

document.getElementById("windspeedBox").addEventListener("change", function() {
    if (document.getElementById("windspeedBox").checked === true)
    {
        localStorage.setItem("windSpeed", "true");
    }

    if (document.getElementById("windspeedBox").checked === false)
    {
        localStorage.setItem("windSpeed", "false");
    }
})

document.getElementById("winddirectionBox").addEventListener("change", function() {
    if (document.getElementById("winddirectionBox").checked === true)
    {
        localStorage.setItem("windDirection", "true");
    }

    if (document.getElementById("winddirectionBox").checked === false)
    {
        localStorage.setItem("windDirection", "false");
    }
})

document.getElementById("minmaxtempBox").addEventListener("change", function() {
    if (document.getElementById("minmaxtempBox").checked === true)
    {
        localStorage.setItem("minMaxTemp", "true");
    }

    if (document.getElementById("minmaxtempBox").checked === false)
    {
        localStorage.setItem("minMaxTemp", "false");
    }
})

var cityIndex = 0;

ls.defaultSettings();
ls.checkSettings();

