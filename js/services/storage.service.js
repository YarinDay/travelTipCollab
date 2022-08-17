export const storageService = {
    save: saveToStorage,
    loadFromStorage
}

function saveToStorage(key, val) {
    const str = JSON.stringify(val)
    localStorage.setItem(key, str)
}

function loadFromStorage(key) {
    const str = localStorage.getItem(key)
    const val = JSON.parse(str)
    return val
}
=======
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
>>>>>>> 4528ed5b89435128a771b3061f28d719fe733953
