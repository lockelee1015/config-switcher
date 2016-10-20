#!/usr/bin/env node
var args = require('minimist')(process.argv.slice(2))
var fs = require('fs')
var package = require('./package.json')
var configOneFile = require('./configOneFile')
var configFromDb = require('./configFromDb')
var writeRepoInRootDir = require('./writeRepoInRootDir')
var loadProjectConfig = require('./loadProjectConfig')
console.log('args', args)

if (args.repo) {
    writeRepoInRootDir(args.repo)
}

if (args.a || args.auto) {
    //读取.configrc文件
    fs.readFile('.configrc', function (err, data) {
        if (err) {
            console.log("该项目没有.configrc文件")
        } else {
            configFromDb(JSON.parse(data))
        }
    })
}

if (args.v || args.version) {
    console.log(package.version)
}

if (args.d) {
    var dir = args.d
    files = fs.readdirSync(dir)
    console.log(files)
    files.forEach(function (filename) {
        configOneFile(dir + "/" + filename, args.c)
    })
}

if (args.f || args.file) {
    var filename = args.f + ".properties"
    if (args.c && typeof (args.c) === 'string') {
        var config = args.c
        configOneFile(filename, config)
    } else {
        console.log("请输入要选择的配置版本")
    }
}

if (args.l || args.load) {
    loadProjectConfig(process.cwd())
}

if (args.h || args.help) {
    console.log("config-switcher:" + package.version)
    console.log("    repo        设置远程调用地址")
    console.log("    a(auto)     自动从数据库获取配置信息")
    console.log("    v(version)  查看版本")
    console.log("    f(file)     你要修改的配置文件(省略.properties)")
    console.log("    c(config)   你选择的配置组名")
    console.log("    l(load)     加载当前路径下的配置文件生成.configrc和配置")
    console.log("如果要修改某一个配置文件,比如jdf.properties选择jfw配置组")
    console.log("config-switcher -f jdf -c jfw")
    console.log("如果要远程获取配置")
    console.log("config-switcher -a")
}
