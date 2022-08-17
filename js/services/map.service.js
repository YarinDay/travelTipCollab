
import { storageService } from './services/storage.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo
}

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 31.501595418345833, lng = 34.46217911117168) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)
            let locs = {
                lat,
                lng
            }
            startMap(gMap, locs)
        })
}

function startMap(map, pos) {
    let { lat, lng } = pos
    const myLatlng = { lat, lng };
    console.log('myLatlng : ',myLatlng);

    // const map = new google.maps.Map(document.getElementById("map"), {
    //     zoom: 4,
    //     center: myLatlng,
    // });

    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: myLatlng
    });
    console.log('position : ', position);
    console.log('infoWindow : ',infoWindow);
    infoWindow.open(map);

    // Configure the click listener.
    map.addListener("click", (mapsMouseEvent) => {
        // Close the current InfoWindow.
        console.log('KKK')
        console.log('infoWindow : ', infoWindow);
        infoWindow.close();

        // Create a new InfoWindow.
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);
    });
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    console.log('laLatLng : ', laLatLng);
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAONBuSkGU1JpdVw8GEKJhkzB0X8bsHsMU' //DONE: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}