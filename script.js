let errorMessage = document.getElementsByClassName("errorMessage");
let weatherContent = document.getElementsByClassName("weatherContent")[0];
let weatherIcon = document.getElementsByClassName("weatherIcon");
let inputCountry = document.getElementsByClassName("country")[0];
let container = document.getElementsByClassName("container")[0];
let search = document.getElementsByClassName("search")[0];
let locationError = document.getElementsByClassName("locationError")[0];

const kelvin =273;
const apikey = "71f03949d407c14397b66877652b8984";
let latitude ="";

async function getWeather(cityName){
    try{
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apikey}`;
        const response = await fetch(api);

        if(latitude == "")
        {
        locationError.style.cssText = "visibility:visible;"
        }
        if(response.statusText !== "Not Found")
        {
            const data = await response.json();

            if((data.weather[0].icon).includes("n"))
            {
                document.body.style.cssText="background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.3)),url('../img/weatherNight-bg.jpg');";
                weatherContent.style.cssText="color:white";
                container.style.cssText = "height:400px; padding:50px 10px; background-color:#0000008a;";
            }
            else{
                document.body.style.cssText="background-image:url('../img/weather-bg.jpg');";
                weatherContent.style.cssText="color:#133045";
                container.style.cssText = "height:400px; padding:50px 10px; background-color:rgba(86, 125, 175, 0.644);";
            }

            errorMessage[0].style.visibility="hidden";
            weatherContent.style.visibility="visible";
            weatherIcon[0].src = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${data.weather[0].icon}.svg`;
            document.getElementsByTagName("p")[0].innerHTML =`${Math.floor(data.main.temp - kelvin)}<sup>o</sup> <span class="state">c</span>`;
            document.getElementsByTagName("p")[1].textContent = data.weather[0].description;
            document.getElementsByTagName("p")[2].textContent = data.name;

            document.getElementsByTagName("p")[0].onclick = function(){
                if(document.getElementsByClassName("state")[0].innerHTML == "c")
                {
                    document.getElementsByTagName("p")[0].innerHTML =`${Math.floor(((data.main.temp - kelvin) * 9/5 + 32))}<sup>o</sup> <span class="state">f</span>`;
                }
                else{
                    document.getElementsByTagName("p")[0].innerHTML =`${Math.floor(data.main.temp - kelvin)}<sup>o</sup> <span class="state">c</span>`;
                }
            };
        }
        else{
            weatherContent.style.visibility="hidden";
            errorMessage[0].innerHTML="please enter correct country/city";

            errorMessage[0].style.visibility="visible";
            document.body.style.cssText="background-image:url('../img/weather-bg.jpg');";
            weatherContent.style.cssText="color:#133045";
            container.style.cssText = "height:50px; padding:70px 10px; top:50%;";
        }
    }
    catch(e){
        
    }
}

function getCityName()
{
    let cityName = inputCountry.value;
    return cityName;
}

window.onload = function(){
if("geolocation" in navigator){
    search.style.visibility="hidden";
    navigator.geolocation.getCurrentPosition(setPosition,showError)
}
}

async function getWeatherAuto(latitude,longitude){
    search.style.visibility="visible";

    let apis = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
    const responses = await fetch(apis);
    const datas = await responses.json();

    if((datas.weather[0].icon).includes("n"))
            {
                document.body.style.cssText="background-image: linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.3)),url('../img/weatherNight-bg.jpg');";
                weatherContent.style.cssText="color:white";
                container.style.cssText = "height:400px; padding:50px 10px; background-color:#0000008a;";
            }
            else{
                document.body.style.cssText="background-image:url('../img/weather-bg.jpg');";
                weatherContent.style.cssText="color:#133045";
                container.style.cssText = "height:400px; padding:50px 10px; background-color:rgba(86, 125, 175, 0.644);";
            }

            weatherContent.style.visibility="visible";
            weatherIcon[0].src = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${datas.weather[0].icon}.svg`;
            document.getElementsByTagName("p")[0].innerHTML =`${Math.floor(datas.main.temp - kelvin)}<sup>o</sup> <span class="state">c</span>`;
            document.getElementsByTagName("p")[1].textContent = datas.weather[0].description;
            document.getElementsByTagName("p")[2].textContent = datas.name;

            document.getElementsByTagName("p")[0].onclick = function(){
                if(document.getElementsByClassName("state")[0].innerHTML == "c")
                {
                    document.getElementsByTagName("p")[0].innerHTML =`${Math.floor(((datas.main.temp - kelvin) * 9/5 + 32))}<sup>o</sup> <span class="state">f</span>`;
                }
                else{
                    document.getElementsByTagName("p")[0].innerHTML =`${Math.floor(datas.main.temp - kelvin)}<sup>o</sup> <span class="state">c</span>`;
                }
            };
}   

function setPosition(position){
     latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeatherAuto(latitude,longitude);
}

function showError(error){
    search.style.visibility="visible";
    errorMessage[0].innerHTML="website can't access your location";
    errorMessage[0].style.visibility="visible";
}