var express = require("express")
var router = express.Router()

router.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html")
})

router.get("/tracking-shop", function (req, res) {
    res.sendFile(__dirname + "/public/tracking_shop.html")
})

router.get("/tracking-product", function (req, res) {
    res.sendFile(__dirname + "/public/tracking_product.html")
})

router.get("/tools", function (req, res) {
    res.sendFile(__dirname + "/public/tools.html")
})

router.get("/listing", function (req, res) {
    res.sendFile(__dirname + "/public/etsy_listing.html")
})

router.get("/add_tracking_history", function (req, res) {
    res.sendFile(__dirname + "/public/add_tracking_etsy_history.html")
})

router.get("/undefined", function (req, res) {
    res.send('null')
})

router.get("/mockup", function (req, res) {
    res.sendFile(__dirname + "/public/mockup.html")
})

module.exports = router