import { storageService } from './storage.service.js'
import { utilService } from './utils.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
    goToLoc,
    deleteLoc,
    goToAddress
}
let geocoder;
let gMap
let gLocs = storageService.load() || []

function initMap(lat = 31.501595418345833, lng = 34.46217911117168) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            geocoder = new google.maps.Geocoder();
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
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
        console.log('mapsMouseEvent : ', mapsMouseEvent)
        let lat = mapsMouseEvent.latLng.lat()
        let lng = mapsMouseEvent.latLng.lng()
        let locName = prompt('Whats the place name ?')
        addLoc(locName, lat, lng)
        infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        })
        infoWindow.setContent(locName)
        infoWindow.open(map)
    })
}

function addLoc(name, lat, lng) {
    if (!name) return
    gLocs.push({
        name,
        lat,
        lng,
        id: utilService.makeId(),
        createdAt: Date.now(),
    })
    _saveInfoToStorage()
}

function _saveInfoToStorage() {
    storageService.save(gLocs)
}

function addMarker(loc) {
    let marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function panTo(lat, lng) {
    let laLatLng = new google.maps.LatLng(lat, lng)
    let loc = { lat: laLatLng.lat(), lng: laLatLng.lng() }
    gMap.panTo(loc)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyAONBuSkGU1JpdVw8GEKJhkzB0X8bsHsMU' //DONE: Enter your API Key
    let elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function goToLoc(lat, lng) {
    const laLatLng = new google.maps.LatLng(lat, lng)
    const loc = { lat: laLatLng.lat(), lng: laLatLng.lng() }
    gMap.panTo(loc)
}

function deleteLoc(locId) {
    const index = gLocs.findIndex(loc => loc.id === locId)
    gLocs.splice(index, 1)
    _saveInfoToStorage()
}

function goToAddress(address) {
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == 'OK') {
            gMap.setCenter(results[0].geometry.location);
            // var marker = new google.maps.Marker({
            //     gMap: gMap,
            //     position: results[0].geometry.location
            // });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}