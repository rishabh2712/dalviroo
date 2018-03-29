import openSocket from 'socket.io-client'
import {apiUrl} from '../../config.js'
const fetch = require('node-fetch')

const socket = openSocket('http://139.59.19.181:3050')

function subscribeToOrder(cb) {
  socket.on('order_in_pipeline', data => cb(null, data))
}

function subscribeToDone(data) {
  socket.emit('subscribeToDone', {done: data.done, id: data.id})
}

export const generateReports = () => {
  var xhr = new XMLHttpRequest()
  xhr.open('GET',apiUrl+'/report', true);
  xhr.responseType = 'arraybuffer'
  xhr.onload = function () {
    if (this.status === 200) {
        let filename = "";
        let disposition = xhr.getResponseHeader('Content-Disposition')
        if (disposition && disposition.indexOf('attachment') !== -1) {
            let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
            let matches = filenameRegex.exec(disposition)
            if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '')
        }
        let type = xhr.getResponseHeader('Content-Type')
        let blob = typeof File === 'function'
            ? new File([this.response], filename, { type: type })
            : new Blob([this.response], { type: type })
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
            window.navigator.msSaveBlob(blob, filename)
        } else {
            var URL = window.URL || window.webkitURL;
            var downloadUrl = URL.createObjectURL(blob)
            if (filename) {
                // use HTML5 a[download] attribute to specify filename
                let a = document.createElement("a")
                // safari doesn't support this yet
                if (typeof a.download === 'undefined') {
                    window.location = downloadUrl
                } else {
                    a.href = downloadUrl
                    a.download = filename
                    document.body.appendChild(a)
                    a.click()
                }
            }
            else {
                window.location = downloadUrl
            }
            setTimeout(function () { URL.revokeObjectURL(downloadUrl); }, 100) // cleanup
        }
    }
}
xhr.send()
}



export { subscribeToDone, subscribeToOrder }
