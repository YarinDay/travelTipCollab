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
window.onHideLocs = onHideLocs
window.onClearLocs = onClearLocs
window.onDeleteLoc = onDeleteLoc
window.onMoveToMyLoc = onMoveToMyLoc
window.onGoToAddress = onGoToAddress

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))
}

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

function onHideLocs() {
    document.querySelector('.locs').innerHTML = ``
}

function onClearLocs() {
    window.localStorage.clear()
    document.querySelector('.locs').innerHTML = ``
}

function onMoveToMyLoc() {
    getPosition()
        .then(pos => {
            const lat = pos.coords.latitude
            const lng = pos.coords.longitude
            mapService.goToLoc(lat, lng)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            document.querySelector('.user-pos').innerText =
                `Could not find your location..`
            console.log('error!!!', err)
        })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            if (!locs || !locs.length) {
                document.querySelector('.locs').innerHTML = 'There is nothing on the Locations List...'
                return
            }
            const strHTMLs = locs.map(loc => {
                return `<div class="loc-container">
                ${JSON.stringify(loc, null, 2)}
                <button onclick="onGoToLoc('${loc.lat}', '${loc.lng}')" class="btn-loc-coords">
                GoTo ${loc.name}
                </button>
                <button onclick="onDeleteLoc('${loc.id}')" class="btn-loc-details">
                Delete
                </button>
                </div>`
            })
            document.querySelector('.locs').innerHTML = strHTMLs.join('')
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
            console.log('pos : ', pos);
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo(lat = 35.6895, lng = 139.6917) {
    console.log('Panning the Map')
    console.log('lat : ', lat);
    console.log('lng : ', lng);
    mapService.panTo(lat, lng)
}

function onGoToLoc(lat, lng) {
    mapService.goToLoc(lat, lng)
}

function onDeleteLoc(loc) {
    mapService.deleteLoc(loc)
}

function onGoToAddress() {
    const address = document.getElementById('address').value;
    mapService.goToAddress(address)
}