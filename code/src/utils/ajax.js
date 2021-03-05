import axios from 'axios'

export default function ajax(url, params={}, method='get'){
    return new Promise((resolve, reject) => {
        axios[method](url, params)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.data)
            })
    })
}