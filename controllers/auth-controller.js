const MongoClient = require('mongodb').MongoClient
const url = "mongodb://localhost:27017/trackingdb"
var clientDB
var dbo
const md5 = require('md5')
var dirname = __dirname.slice(0, -11)

module.exports.login = function(req, res){
    res.render(dirname + "public/views/login")
}

module.exports.logout = function(req, res){
    res.clearCookie('user_name')
    res.redirect('/login')
}

module.exports.postLogin = async function(req, res){
    let uName = req.body.user_name
    let pass = req.body.pass

    clientDB = await MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    dbo = clientDB.db("trackingdb")
    let user = await dbo.collection("user").findOne({ user_name: uName })
    
    if(!user){
        res.render(dirname + "public/views/login")
        return
    }

    if(user.pass !== md5(pass)){
        res.render(dirname + "public/views/login")
        return
    }
    res.cookie('user_name', uName)
    res.redirect('/')
}