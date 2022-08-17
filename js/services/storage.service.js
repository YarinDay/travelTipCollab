
export const storageService = {
    saveToStorage,
    loadFromStorage
}

        function saveToStorage(key, val) {
            console.log('key : ',key);
            console.log('val : ',val);
            const str = JSON.stringify(val)
            localStorage.setItem(key, str)
        }
        
        function loadFromStorage(key) {
            const str = localStorage.getItem(key)
            const val = JSON.parse(str)
            return val
        }