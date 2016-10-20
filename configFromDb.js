var fs = require('fs')
var fetch = require('node-fetch')
var service = require('./jfwService')
var path = require('path')

function configFromDb(configrc) {
    console.log("项目名称:"+configrc.projectName)
    service('JFWCONFIG', 'getConfig', configrc)
        .then(function (res) {
            writeProperties(configrc.config_map, res.result)
        })
}

function writeProperties(configMap, data) {
    console.log("已获取配置===>准备修改配置")
    for (var groupName in configMap) {
        var filePath = configMap[groupName]
        var configDetail = data[groupName]
        writeOneProperties(filePath, configDetail, groupName)
    }
}

function writeOneProperties(filePath, configDetail, groupName) {
    fs.writeFile(path.join(filePath), getConfigDetailText(configDetail), function (err) {
        if (err) throw err
        var tips = `配置${groupName}.properties成功`
        console.log(tips);
    })
}

function getConfigDetailText(configDetail) {
    var text = ``
    for (var line of configDetail) {
        text = `${text}\n#${line.description}\n${line.key}=${line.value}`
    }
    return text
}

module.exports = configFromDb