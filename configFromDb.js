var fs = require('fs')
var fetch = require('node-fetch')
var service = require('./jfwService')
var path = require('path')

function configFromDb(configrc) {
    console.log("项目名称:" + configrc.project_name)
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
        try {
            writeOneProperties(filePath, configDetail, groupName)
        } catch (err) {
            console.log(groupName + '配置出错:' + err.message)
        }
    }
}

function writeOneProperties(filePath, configDetail, groupName) {
    var absolutepath = path.join(filePath)
    fs.writeFile(path.join(filePath), getConfigDetailText(configDetail, groupName), function (err) {
        if (err) {
            throw err
        }
        var tips = `配置${groupName}.properties成功`
        console.log(tips);
    })
}

function getConfigDetailText(configDetail, groupName) {
    if (!configDetail) {
        console.error(groupName + '在配置中心不存在，请检查配置中心与configrc是否同步')
    }
    var text = ``
    for (var line of configDetail) {
        text = `${text}\n#${line.description}\n${line.key}=${line.value}`
    }
    return text
}

module.exports = configFromDb