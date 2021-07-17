var socket = io.connect("https://giftsvk.com", {
    port: 443,
    reconnect: true,
    transports: ['websocket']
})

socket.emit("get-add-tracking-status")
socket.emit("get-server-status")

sleep = async ms => {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    )
}

try {
    $.ajax({
        url: '/last-updated',
        type: "get",
        contentType: "application/json",
        dataType: "json",
        success: function (data) {
            $('#last-updated').text("Last updated: " + getUpdateHistoryEpoch(data.lastUpdated))
        },
        error: (jqXHR, textStatus, errorThrown) => {
            console.log(jqXHR, textStatus, errorThrown)
        }
    })
} catch (err) {
    console.log(err)
}

$('#ping-vps').on('click', () => {
    $('#etsy-img').css('mix-blend-mode', 'luminosity')
    $('#etsy-status').empty()
    socket.emit("run-ping-vps")
})

$('#ping-customcat').on('click', () => {
    $('#cc-img').css('mix-blend-mode', 'luminosity')
    $('#customcat-status').empty()
    socket.emit("run-ping-customcat")
})

$('#update-server').on('click', async () => {
    toastr.clear()
    toastr.info('Reloading server!')
    socket.emit("run-update-server")
    await sleep(5000)
    location.reload()
})

socket.on("return-server-status", data => {
    $('#process-status').text(data)
})

socket.on("return-ping-vps", data => {
    $('#etsy-img').css('mix-blend-mode', 'normal')
    $('#etsy-status').append(`<h5>${data} online</h5>`)
})

socket.on("return-ping-customcat", data => {
    $('#cc-img').css('mix-blend-mode', 'normal')
    $('#customcat-status').append(`<h5>${data} online</h5>`)
})

socket.on("add-tracking-status", data => {
    $('#etsy-img').css('mix-blend-mode', 'normal')
    $('#etsy-status').empty()
    for (let item of data) {
        $('#etsy-status').append(`<h5>${item.item} done</h5>`)
    }
})

$('#fix-tracking-history-btn').on('click', () => {
    $('#fix-tracking-history-btn').toggleClass("active-fix-tracking")
    let content = $('#fix-tracking-history-btn').next()
    if (content.css("display") === "block") {
        content.css("display", "none")
    } else {
        content.css("display", "block")
    }
})

$('#run-add-tracking-my-btn').on('click', () => {
    $('#etsy-status').empty()
    socket.emit("run-add-tracking", 'My')
})

$('#run-add-tracking-trang-btn').on('click', () => {
    $('#etsy-status').empty()
    socket.emit("run-add-tracking", 'Trang')
})

socket.on("return-fix-tracking-history", () => {
    toastr.clear()
    toastr.success('Thành công!')
})

$('#check-limit-btn').on('click', () => {
    toastr.clear()
    toastr.info('Checking API limit...')
    socket.emit("check-limit-api")
})

$('#open-all-vps-btn').on('click', () => {
    socket.emit("open-all-vps")
})

socket.on("return-check-limit-api", data => {
    let index = data.indexOf('x-ratelimit-remaining')
    data = data.slice(index, index + 28).trim()
    toastr.clear()
    toastr.success(data)
})

getContent = data => {
    let content = ''
    switch (data.status) {
        case 1: content = 'Send request to Customcat'
            break
        case 2: content = 'Received data from Customcat'
            break
        case 3: content = 'Reload Etsy, waiting...'
            break
        case 4: content = 'Send data to VPS'
            break
        case 5: content = 'Done'
            break
        default: content = `adding #` + data.status
    }

    if(data.name == 'server'){
        return content
    }
    return `${data.name}: ${content}`
}

socket.on("add-tracking-status-server-to-client", (data) => {
    let content = getContent(data)
    $('#process-status').text(content)
})