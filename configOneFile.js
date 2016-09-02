var fs = require('fs')

function configOneFile(filename, config) {
    readProperties(filename, config)
}

/**
 * 读取一个配置文件
 * @param filename
 * @param config
 */
function readProperties(filename, config) {
    console.log(filename)
    var currentConfig = '@'
    var result = ''
    fs.readFile(filename,'utf-8',function(err,data){
        var list = data.split('\n')
        list.map(function(line){
            flag = true
                if (flag) {
                    if (line.indexOf("#(") > -1) {
                        currentConfig = getConfig(line)
                        result += recordLine(line)
                    } else if (config === currentConfig) {
                        result += recordLine(uncommentLine(line))
                    } else {
                        if (currentConfig != '') {
                            result += recordLine(commentLine(line))
                        } else {
                            result += recordLine(line)
                        }
                    }
                }
        })
        fs.writeFile(filename, result, function (err) {
                if (err) throw err
                console.log("switch success!")
            })
    })
}

function recordLine(line) {
    return line + '\n'
}

/**
 * 获取当前行的配置名
 * @param line
 * @returns {string}
 */
function getConfig(line) {
    var start = line.indexOf("#(") + 2
    var end = line.indexOf(")")
    var config = line.substring(start, end)
    return config
}

/**
 * 注释一行
 * @param line
 * @returns {*}
 */
function commentLine(line) {
    if (line.indexOf("#") == 0) {
        return line
    } else {
        return "#" + line
    }
}

/**
 * 解开一行注释
 * @param line
 * @returns {*}
 */
function uncommentLine(line) {
    if (line.indexOf('#') == 0) {
        return uncommentLine(line.substring(1))
    } else {
        return line
    }
}

module.exports = configOneFile