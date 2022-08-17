import { storageService } from './storage.service.js'

export const locService = {
    getLocs
}

const locs = storageService.load()

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}


