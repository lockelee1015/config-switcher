var fetch = require('node-fetch')
var fs = require('fs')

function service(serviceId, method, param) {
    return new Promise(function (resolve, reject) {
        readRepo()
            .then(function (url) {
                url += "?serviceId=" + serviceId
                url += "&method=" + method
                return url
            })
            .then(function (url) {
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `data=${JSON.stringify(param)}`
                }).then(function (res) {
                    return resolve(res.json())
                })
            })
    })
}

function readRepo() {
    var dir
    //osx
    if (process.platform === 'darwin') {
        dir = `${process.env.HOME}/.repo/repo.json`
    }

    //linux
    if (process.platform === 'linux') {
        dir = `${process.env.HOME}/.repo/repo.json`
    }

    //win32
    if (process.platform === 'win32') {
        dir = path.join(process.env.HOMEDRIVE, process.env.HOMEPATH + '/.repo/repo.json')
    }
    return new Promise(function (resolve, reject) {
        "use strict";
        fs.readFile(dir, 'utf-8', function (err, data) {
            if (err) {
                reject(err)
                console.log("请先设置远程调用地址");
            } else {
                data = JSON.parse(data)
                resolve(data.repo)
            }
        })
    })
}

module.exports = service