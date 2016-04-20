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
    fs.writeFile(dir, `{"repo":"${repo}"}`, function (err) {
        if (err) throw err
        console.log('配置远程调用地址成功!')
    })

}

module.exports = writeRepoInRootDir