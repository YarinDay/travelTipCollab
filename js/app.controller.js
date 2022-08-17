import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

export const appController = {
    renderLocs
}

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.renderLocs = renderLocs
window.onGetUserPos = onGetUserPos
window.onGoToLoc = onGoToLoc
window.onHideLocs = onHideLocs
window.onClearLocs = onClearLocs
window.onDeleteLoc = onDeleteLoc

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

function onHideLocs() {
    document.querySelector('.locs').innerHTML = ``
}

function onClearLocs() {
    window.localStorage.clear()
    document.querySelector('.locs').innerHTML = ``
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            if (!locs || !locs.length) {
                document.querySelector('.locs').innerHTML = 'There is nothing on the Locations List...'
                return
            }
            renderLocs(locs)
        })
}

function renderLocs(locs) {
    console.log('locs : ', locs);
    const strHTMLs = locs.map(loc => {
        return `
        Location :
        <div class="loc-container">
        ${JSON.stringify(loc, null, 2)}
        <button onclick="onGoToLoc('${loc.lat}', '${loc.lng}')" class="btn btn-loc-coords">GoTo${loc.name}</button>
        <button onclick="onDeleteLoc('${loc.id}')" class="btn btn-loc-details">
        Delete
        </button>
        </div>`
    })
    document.querySelector('.locs').innerHTML = strHTMLs.join('')

}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                ` You are at: Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude} `
            console.log('pos : ', pos);
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo(lat = 35.6895, lng = 139.6917) {
    console.log('Panning the Map')
    mapService.panTo(lat, lng)
}

function onGoToLoc(lat, lng) {
    mapService.goToLoc(lat, lng)
}

function onDeleteLoc(loc) {
    mapService.deleteLoc(loc)
}