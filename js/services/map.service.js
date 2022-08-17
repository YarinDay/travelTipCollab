
import { storageService } from './storage.service.js'
import { appController } from '../app.controller.js'
import { utilService } from './utils.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
    goToLoc
}

// Var that is used throughout this Module (not global)
let gMap
// const STORAGE_KEY = 'travelDB'
let gLocs = storageService.load() || []

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
            startMap(gMap, lat, lng)
        })
}

function startMap(map, lat, lng) {
    const myLatlng = { lat, lng }
    let infoWindow = new google.maps.InfoWindow({
        content: "Click the map to get Lat/Lng!",
        position: myLatlng
    });
    infoWindow.open(map);
    map.addListener("click", (mapsMouseEvent) => {
        console.log('mapsMouseEvent : ',mapsMouseEvent);
        let lat = mapsMouseEvent.latLng.lat()
        let lng = mapsMouseEvent.latLng.lng()
        console.log('lat : ',lat);
        console.log('lng : ',lng);
        let locName = prompt('Whats the place name ?')
        addLoc(lat, lng, locName)
        // console.log('infoWindow : ',infoWindow.position.lat());

        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({

            position: mapsMouseEvent.latLng,
        });
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        );
        infoWindow.open(map);
    });
}

function addLoc(lat, lng, name) {
    console.log('lat : ',lat);
    console.log('lng : ',lng);
    gLocs.push({
        lat,
        lng,
        name,
        id: utilService.makeId(),
        createdAt: Date.now(),
    })
    _saveInfoToStorage()
}

function _saveInfoToStorage() {
    storageService.save(gLocs)
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
    let loc = { lat: laLatLng.lat(), lng: laLatLng.lng() }
    console.log('laLatLng : ', loc);
    console.log('gMap : ', gMap);
    gMap.panTo(loc)
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
//32.0132° N,
// 34.7480° E
function goToLoc(lat, lng) {
    console.log('lat : ',lat);
    console.log('lng : ',lng);
    var laLatLng = new google.maps.LatLng(lat, lng)
    console.log('laLatLng : ',laLatLng);
    let loc = { lat: laLatLng.lat(), lng: laLatLng.lng() }
    console.log('laLatLng : ', loc);
    console.log('gMap : ', gMap);
    gMap.panTo(loc)

}