var dirname = __dirname.slice(0, -7)

module.exports.login = function(req, res){
    res.render(dirname + "public/views/add_tracking_etsy_history.html")
}