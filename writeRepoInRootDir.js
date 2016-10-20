var fs = require('fs')
var path = require('path')

function writeRepoInRootDir(repo) {
    var dir
    //mac
    if (process.platform === 'darwin') {
        dir = `${process.env.HOME}/.repo`
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir)
    }

    //linux
    if (process.platform === 'linux') {
        dir = `${process.env.HOME}/.repo`
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir)
    }

    //win32
    if (process.platform === 'win32') {
        dir = path.join(process.env.HOMEDRIVE, process.env.HOMEPATH + '/.repo')
        if (!fs.existsSync(dir))
            fs.mkdirSync(dir);
    }

    dir = `${dir}/repo.json`

    if (typeof repo === 'boolean') {
        // var file = fs.readSync(dir).toString()
        // cosole.log(file)
        var repoStr = fs.readFileSync(dir)
        var repo = JSON.parse(repoStr)
        console.log('当前获取配置地址为',repo.repo)
    } else {
        fs.writeFile(dir, `{"repo":"${repo}"}`, function (err) {
            if (err) throw err
            console.log('配置远程调用地址成功!')
        })
    }
}

module.exports = writeRepoInRootDir