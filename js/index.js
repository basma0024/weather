let todayDayName=document.querySelector('.todayDayName');
let todayDateMonth= document.querySelector('.todayDateMonth');
let todayDate=document.querySelector('.todayDate');
let todayLocation=document.querySelector('.todayLocation');
let todatDegree=document.querySelector('.todatDegree');
let todayImg=document.querySelector('.todayImg');
let todayText=document.querySelector('.todayText');
let humidity=document.querySelector('.humidity');
let wind=document.querySelector('.wind');
let windDirec=document.querySelector('.windDirec');
// next date

let nextDayName=document.querySelectorAll('.nextDayName');
let nextImg=document.querySelectorAll('.nextImg');
let nextMaxDegree=document.querySelectorAll('.nextMaxDegree');
let nextMinDegree=document.querySelectorAll('.nextMinDegree');
let nextText=document.querySelectorAll('.nextText');
// search input
let searchInput=document.querySelector('.searchInput');


async function getUserLocation() {
    
        let ipRes = await fetch('https://ipinfo.io/json');
        let ipData = await ipRes.json();
        return ipData.city; 
   
}


// fetch api
async function getWeather(cityName){
    let weatheRes=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=44c6a6885f444d92b75222324240807&q=${cityName}&days=3`)
    let weatherData=await weatheRes.json()
    return weatherData
    // console.log(weatherData)
    // console.log(weatheRes)
}
// today data
 function displayTodayData(data){

    let date = new Date();
    todayDayName.innerHTML=date.toLocaleDateString("en-US",{weekday:"long" })
    todayDateMonth.innerHTML=date.toLocaleDateString("en-US",{month:"long" })
    todayDate.innerHTML=date.getDate()


    todayLocation.innerHTML = data.location.name
    todatDegree.innerHTML = data.current.temp_c
    todayImg.setAttribute("src","https://"+ data.current.condition.icon)
    todayText.innerHTML=data.current.condition.text
    humidity.innerHTML=data.current.humidity+"%"
    wind.innerHTML=data.current.wind_kph+"km/h"
    windDirec.innerHTML=data.current.wind_dir


}

// next data
function displaynextData(data){
    
    let shortUrl=data.forecast.forecastday
//     console.log(nextMaxDegree)
    for(let i=0;i<2;i++){

        let nextDay=new Date(shortUrl[i+1].date)
        // console.log(nextDay)
        nextDayName[i].innerHTML=nextDay.toLocaleDateString("en-US",{weekday:"long"})

        nextMaxDegree[i].innerHTML = shortUrl[i+1].day.maxtemp_c
        nextMinDegree[i].innerHTML = shortUrl[i+1].day.mintemp_c
        nextImg[i].setAttribute("src","https://" + shortUrl[i+1].day.condition.icon)
        nextText[i].innerHTML=shortUrl[i+1].day.condition.text

    }

}


// run functions
async function runFun(city="alexandria"){
    let weatherData = await getWeather(city);
// console.log(weatherData)
    if(!weatherData.error){
    displayTodayData(weatherData)
    displaynextData(weatherData)
    }
}
runFun()


// search
searchInput.addEventListener("input",function(){
    // console.log(searchInput.value)
    runFun(searchInput.value)
})
