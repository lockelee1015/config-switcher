#!/usr/bin/env node
var args = require('minimist')(process.argv.slice(2))
var lineReader = require('line-reader')
var fs = require('fs')
var result = ''

if (args.v || args.version) {
    console.log('v1.0.0')
}

if (args.f) {
    var filename = args.f + ".properties"
    if (args.c && typeof (args.c) === 'string') {
        var config = args.c
        configOneFile(filename, config)
    } else {
        console.log("请输入要选择的配置版本")
    }
}

if(args.h||args.help){
    console.log("    v     查看版本")
    console.log("    f     你要修改的配置文件(省略.properties)")
    console.log("    c     你选择的配置组名")
    console.log("如果要修改某一个配置文件,比如jdf.properties选择jfw配置组")
    console.log("jfw-config -f jdf -c jfw")
}

function configOneFile(){
    readProperties(filename, config)
}


/**
 * 读取一个配置文件
 * @param filename
 * @param config
 */
function readProperties(filename, config) {
    lineReader.open(filename, function (err, reader) {
        if (err) throw err
        var currentConfig = '@'
        while (reader.hasNextLine()) {
            reader.nextLine(function (err, line) {
                if (err)throw err;
                flag = true
                if (flag) {
                    if (line.indexOf("#(") > -1) {
                        currentConfig = getConfig(line)
                        recordLine(line)
                    } else if (config === currentConfig) {
                        recordLine(uncommentLine(line))
                    } else {
                        if (currentConfig != '') {
                            recordLine(commentLine(line))
                        }else{
                            recordLine(line)
                        }
                    }
                }
            })
        }
        //console.log(result)
        reader.close(function (err) {
            if (err) throw err
            fs.writeFile(filename,result,function(err){
                if(err) throw err
                console.log("修改配置成功")
            })
        })
    })
}

function recordLine(line){
    result = result+line+'\n'
}

/**
 * 获取当前行的配置名
 * @param line
 * @returns {string}
 */
function getConfig(line) {
    var start = line.indexOf("#(")+2
    console.log(line)
    console.log(start)
    var end = line.indexOf(")")
    console.log(end)
    var config = line.substring(start, end)
    console.log(config)
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
    if(line.indexOf('#')==0){
        return uncommentLine(line.substring(1))
    }else{
        return line
    }
}