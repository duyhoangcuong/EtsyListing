const _id = window['Etsy'].Context.data.input_shop_name

var socket = io.connect('https://giftsvk.com', {
    port: 443,
    reconnect: true,
    transports: ['websocket'],
    query: {
        type: 1,
        etsy_id: _id,
    }
})

document.title = 'Listing tool loaded'

socket.on('etsy-list-new', async function (data) {

    await uploadImgs(data)
    //do stuff
    // let dataListing = {
    //     publish: data.publish,
    //     title: data.title,
    //     description: data.description,
    //     price: '29.99',
    //     quantity: '999',
    //     // tags: tags,
    //     shipping_profile_id: data.shipping_profile_id,
    //     who_made: 'i_did',
    //     is_supply: 'false',
    //     is_handmade: true,
    //     when_made: 'made_to_order',
    //     taxonomy_id: 1029,
    //     should_auto_renew: true,
    //     // image_ids: imageIds,
    //     // inventory: inventory,
    //     _nnc: window['Etsy'].Context.data.csrf_nonce,
    //     is_personalizable: data.is_personalizable,
    //     personalization_is_required: data.personalization_is_required,
    //     personalization_instructions: data.personalization_instructions,
    //     personalization_field_collection: [{
    //         personalization_is_required: data.personalization_is_required,
    //         personalization_instructions: data.personalization_instructions,
    //     }],
    //     section_id: 32827039,
    //     should_advertise: true,
    //     // /listing_images
    // }

    // console.log(dataListing)

    // $.ajax({
    //     url: `https://www.etsy.com/api/v3/ajax/shop/${window['Etsy'].Context.data.shop_id}/listings`,
    //     type: "post",
    //     contentType: "application/json",
    //     data: JSON.stringify(dataListing),
    //     dataType: "json",
    //     success: function (data) {
    //         let response = {
    //             client_id: data.client_id,
    //             shop: data.shop,
    //         }
    //         socket.emit('etsy-list-done', response)
    //     },
    //     error: (jqXHR, textStatus, errorThrown) => {
    //         console.log(jqXHR, textStatus, errorThrown)
    //     }
    // })
})

async function uploadImgs(data) {
    fetch(data.main_images)
        .then(res => res.blob())
        .then(async (blob) => {
            await uploadFile(blob)
        })
}

async function uploadFile(img) {
    try {
        console.log(img)

        // $.ajax({
        //     url: `https://www.etsy.com//your/files/upload`,
        //     type: "post",
        //     contentType: "application/octet-stream",
        //     dataType: "json",
        //     "data": img,
        //     processData: false,
        //     headers: {
        //         'X-File-Name': file.name,
        //         'X-File-Size': img.size,
        //         'X-File-Type': img.type,
        //         "X-CSRF-TOKEN": window['Etsy'].Context.data.csrf_nonce,
        //     },
        //     success: function (data) {
        //         if (data.success == true) {
        //             console.log('file', data.file_id)
        //             resolve(data.file_id)
        //         } else {
        //             console.log(data)
        //             reject('')
        //         }
        //     },
        //     error: (jqXHR, textStatus, errorThrown) => {
        //         console.log(jqXHR, textStatus, errorThrown)
        //         // reject(new Error(`!Error: statusCode - ${jqXHR.status} - ${errorThrown}`))
        //         reject('')
        //     }
        // })
    } catch (err) {
        console.log(err)
    }
}