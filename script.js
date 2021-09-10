const pagedisplay = document.querySelector(".main");
pagedisplay.innerHTML = `
    <div class="row">
        <div class="col d-flex flex-column align-items-center">
            <h1 class="gradient">IP Address lookup <i class="fas fa-location-arrow symbol"></i></h1>
            <form class="row g-2">
                <label for="searchquery" class="form-label labeltxt">Curious to crack details of a IP of another internet user...🕵️‍♂️<br/>Go on enter the IP address below 👇</label>
                <input type="text" class="form-control value" id="searchquery" placeholder="Enter a valid IP address eg: 142.168.0.0">
                <button type="submit" class="btn btn-outline-dark mark" onclick="ipquery(event)">Search <i class="fas fa-search"></i></button>
            </form>
        </div>
    </div>
    `;//searchbox and title design


async function userip(){//function fetching details from API endpoint by try catch method
    try{
        const clientdata = await fetch(`https://ipapi.co/json/`);
        const convertingClientData = await clientdata.json();
        // console.log(convertingClientData);
        userdtaip(convertingClientData);//calling the function
    }catch(err){
        document.querySelector(".clr").innerHTML = `<p class="srdown">Server Down. Try again after sometime <br/> Sorry for the inconvenience caused 🙏</p>`;//incase api is down error is displayed using catch
    }
}
userip();//calling the function manually

function userdtaip(usersip){//after fetching details from the API endpoint it calls the function "userdtaip()" and displays IP details on screen.
    const cltdata = document.createElement('div');
    cltdata.innerHTML = `
    <h6 class="paddingh5">Hey...found details of your IP <span class="codetxt">$</span>[<span class="colors">${usersip.ip}</span>] 👇</h6> 
    <div class="container d-flex justify-content-center detailsbox">
        <div class="row p-2 offset-auto">
            <div class="col-6">
                <p><strong>IP address & Version:</strong> ${usersip.ip} , <strong class="revert">(${usersip.version})</strong></p>
                <p><strong>City:</strong> ${usersip.city}</p>
                <p><strong>Region:</strong> ${usersip.region}, <strong class="strike">${usersip.region_code}</strong></p>
                <p><b>Latitude:</b> ${usersip.latitude}</p>
                <p><b>Longitude:</b> ${usersip.longitude}</p>
                <p><b>ISP:</b> ${usersip.org}</p>
            </div>
            <div class="col-6">
                <p><strong>Country:</strong> ${usersip.country_name}, <b class="strike">${usersip.country}</b></p>
                <p><b>Capital:</b> ${usersip.country_capital}</p>
                <p><b>Postal code:</b> ${usersip.postal}</p>
                <p><b>Time-zone:</b> ${usersip.timezone}, <b class="strike">${usersip.utc_offset}</b></p>
                <p><b>Country code:</b> ${usersip.country_calling_code}</p>
                <p><b>Currency:</b> ${usersip.currency}</p>
            </div>
        </div>
    </div>
    `;

//using google maps api to locate the ip address using latitude and longitude

    let map;
    function initMap() {
        let mapslt = `${usersip.latitude}`;
        let mapslg = `${usersip.longitude}`;
        let options = {
            zoom: 13,
            center: { lat: parseFloat(mapslt), lng: parseFloat(mapslg) }
        }
        map = new google.maps.Map(document.getElementById("map"), options);
        const marker = new google.maps.Marker({
            position: { lat: parseFloat(mapslt), lng: parseFloat(mapslg) },
            map: map,
          });
          const infowindow = new google.maps.InfoWindow({
            content: "<p>Marker Location:" + marker.getPosition() + "</p>",
          });
        
          google.maps.event.addListener(marker, "click", () => {
            infowindow.open(map, marker);
          });
    }
    initMap();

    document.querySelector(".clr").append(cltdata);
    
    // console.log(mapslt)
}

//if user wants to search for specific IP then the user can enter the IP in the search box and make a search this triggers a onclick function "ipquery(event)"
function ipquery(event){
    event.preventDefault();
    const searchValue = document.querySelector(".value").value;
    // console.log(searchValue);
    fetching(searchValue);
}

async function fetching(searchValue){//function fetching details from API endpoint by try catch method
    try{
    const data = await fetch(`https://ipapi.co/${searchValue}/json/`);
    const converting = await data.json();
    document.querySelector(".clr").innerHTML = "";
    // console.log(converting);
    adrs(converting);
    }catch(err){
        document.querySelector(".clr").innerHTML = `<p class="srdown">Server Down. Try again after sometime <br/> Sorry for the inconvenience caused 🙏</p>`;//incase api is down error is displayed using catch
    }
}

function adrs(ipadrs){//after fetching details from the API endpoint it calls the function "adrs(ipadrs)" and displays IP details on screen.
    const data1 = document.createElement('div');
    data1.innerHTML = `
    <h6 class="paddingh5">Found details of the IP you asked 😋 <span class="codetxt">$</span>[<span class="colors">${ipadrs.ip}</span>]👇</h6>
    <div class="container d-flex justify-content-center detailsbox">
       <div class="row p-2">
            <div class="col-6">
                <p><strong>IP address & Version:</strong> ${ipadrs.ip} , <strong class="revert">(${ipadrs.version})</strong></p>
                <p><strong>City:</strong> ${ipadrs.city}</p>
                <p><strong>Region:</strong> ${ipadrs.region}, <strong class="strike">${ipadrs.region_code}</strong></p>
                <p><b>Latitude:</b> ${ipadrs.latitude}</p>
                <p><b>Longitude:</b> ${ipadrs.longitude}</p>
                <p><b>ISP:</b> ${ipadrs.org}</p>
            </div>
            <div class="col-6">
                <p><strong>Country:</strong> ${ipadrs.country_name}, <b class="strike">${ipadrs.country}</b></p>
                <p><b>Capital:</b> ${ipadrs.country_capital}</p>
                <p><b>Postal code:</b> ${ipadrs.postal}</p>
                <p><b>Time-zone:</b> ${ipadrs.timezone}, <b class="strike">${ipadrs.utc_offset}</b></p>
                <p><b>Country code:</b> ${ipadrs.country_calling_code}</p>
                <p><b>Currency:</b> ${ipadrs.currency}</p>
            </div>
        </div>
    </div>
    `;

//using google maps api to locate the ip address using latitude and longitude

    let map;
    function initMap() {
        let mapslt = `${ipadrs.latitude}`;
        let mapslg = `${ipadrs.longitude}`;
        let options = {
            zoom: 13,
            center: { lat: parseFloat(mapslt), lng: parseFloat(mapslg) }
        }
        map = new google.maps.Map(document.getElementById("map"), options);//crea
        const marker = new google.maps.Marker({
            position: { lat: parseFloat(mapslt), lng: parseFloat(mapslg) },
            map: map,
          });
          const infowindow = new google.maps.InfoWindow({
            content: "<p>Marker Location:" + marker.getPosition() + "</p>",
          });
        
          google.maps.event.addListener(marker, "click", () => {
            infowindow.open(map, marker);
          });
    }
    initMap();

    document.querySelector(".clr").append(data1);
}


//footer details
const footing = document.querySelector('.bottom');
footing.innerHTML = `
<p class="btm"><i class="fas fa-code footingbg"></i> Coded with <i class="fas fa-heart footingbg"></i> by Sai Deepak</p>`;