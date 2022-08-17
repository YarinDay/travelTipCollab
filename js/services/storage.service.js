export const storageService = {
    save: saveToStorage,
    load: loadFromStorage
}

const STORAGE_KEY = 'travelDB'

function saveToStorage(val) {
    const str = JSON.stringify(val)
    localStorage.setItem(STORAGE_KEY, str)
}

function loadFromStorage() {
    const str = localStorage.getItem(STORAGE_KEY)
    const val = JSON.parse(str)
    return val
}
