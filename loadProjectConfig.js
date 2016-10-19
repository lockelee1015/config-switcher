var fs = require('fs')
var path = require('path')

module.exports = function loadProjectConfig(projectRoot) {
    var project = {}
    var projectName = getProjectName(projectRoot)
    project.projectName = projectName
    project.groupList = []
    //先拿jdf
    var jdfGroup = { groupName: 'jdf', path: './src/conf/jdf.properties' }
    jdfGroup.configList = getConfigList(path.resolve(projectRoot, jdfGroup.path))
    project.groupList.push(jdfGroup)
    var otherPropertyFiles = fs.readdirSync(path.resolve(projectRoot, './src/conf/plugin'))
    var pluginGroup = otherPropertyFiles.map(function (filename) {
        var group = {}
        group.path = `./src/conf/plugin/${filename}`
        groupName = filename.replace('.properties', '')
        group.groupName = groupName
        group.configList = getConfigList(path.resolve(projectRoot, group.path))
        return group
    }).map(function (group) {
        project.groupList.push(group)
    })
    writeConfigrc(project, projectRoot)
    writeLoadFile(project, projectRoot)
}

function getProjectName(root) {
    var paths = root.split('/')
    return paths[paths.length - 1]
}

function getConfigList(filename) {
    var file = fs.readFileSync(filename)
    var content = file.toString('UTF-8')
    var uncommentLines = content.split('\n').filter(function (line) {
        return line.indexOf("#") !== 0
    })
    var configs = uncommentLines.map(function (line) {
        var spliterIndex = line.indexOf('=')
        var name = line.substring(0, spliterIndex)
        var value = line.substring(spliterIndex + 1, line.length)
        return { key: name, value: value, description: "请填写描述!" }
    }).filter(function (config) {
        return config.key
    })
    return configs
}

function writeConfigrc(project, projectRoot) {
    var configrc = {}
    configrc.project_name = project.projectName
    configrc.config_map = {}
    project.groupList.map(function (group) {
        configrc.config_map[group.groupName] = group.path
    })
    fs.writeFile(path.resolve(projectRoot, `.configrc`), JSON.stringify(configrc), function (err) {
        if (err) throw err
        console.log("load configrc success!")
    })
}

function writeLoadFile(project, projectRoot) {
    project.groupList = project.groupList.map(function (group) {
        delete group['path']
        return group
    })
    fs.writeFile(path.resolve(projectRoot, `${project.projectName}.txt`), JSON.stringify(project), function (err) {
        if (err) throw err
        console.log("load config success!")
    })
}