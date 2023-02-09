const button = document.querySelector("button");
const apiKey = "";  // Enter Your Own APIKey;

const onSuccess = (position)=>{
    button.innerText = "Detecting your location...";
    let {latitude,longitude} = position.coords;
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`).then(response => response.json()).then(data => {
        let allDetails = data.results[0].components; // getting all details of user location
        let {city, state_district, state, country} = allDetails;
       button.innerText = `${city}, ${state_district}, ${state}, ${country}`;
       console.table(allDetails);
    }).catch(()=>{
        button.innerText = "Something went wrong";
    });
    button.setAttribute("disabled","true");
}
const onError = (error)=>{
    if(error.code == 1){
        button.innerText = "Access denied";
    }
    else if(error.code == 2){
        button.innerText = "Network Error, connect your internet";
    }else{
        button.innerText = "Something went wrong";
    }
    button.setAttribute("disabled","true");
}
button.addEventListener("click",()=>{
    if(navigator.geolocation){
        button.innerText = "Allow to detect the location";
        navigator.geolocation.getCurrentPosition(onSuccess,onError);  // it will give the current position of the device. it takes three parameters success, error, options . if everything went right then success.
        // here we need only two parameters in this project. we donnt need option parameter to pass

    }else{
        button.innerText = "Your Browser not Support";
    }
})