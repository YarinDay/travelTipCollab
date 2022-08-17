import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

export const appController = {
}

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onGoToLoc = onGoToLoc

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
    .then(locs => {
            if(!locs) {
                document.querySelector('.locs').innerHTML = 'There is nothing on the Locations List...'
                return
            }
            locs.map(loc => {
                document.querySelector('.locs').innerHTML += `<div class="loc-container">${JSON.stringify(loc, null, 2)}<button onclick="onGoToLoc('${loc.lat}', '${loc.lng}')"class="kaki">GoTo ${loc.name}</button></div>`
            })
            // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
            // document.querySelector('.locs').innerHTML += btn
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        console.log('pos : ',pos);
            })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo(lat = 35.6895, lng = 139.6917) {
    console.log('Panning the Map')
    console.log('lat : ',lat);
    console.log('lng : ',lng);
    mapService.panTo(lat, lng)
}

function onGoToLoc(lat, lng) {
    mapService.goToLoc(lat, lng)
}