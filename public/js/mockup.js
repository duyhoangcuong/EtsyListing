var count = 0
var idNum = 0

var sources = [
  '/img/mockup/mk1.jpg',
  '/img/mockup/mk2.jpg',
  '/img/mockup/mk3.jpg',
  '/img/mockup/mk4.jpg',
  '/img/mockup/mk5.jpg',
]

var putLocation = {
  mk1: [197, 231, 1759, 1272],
  mk2: [81, 109, 923, 669],
  mk3: [147, 80, 677, 862],
  mk4: [206, 34, 636, 667],
  mk5: [233, 26, 608, 578],
}

function downloadCanvas(link, canvasId, filename) {
  link.href = document.getElementById(canvasId).toDataURL()
  link.download = filename
}

$('#download-all').on('click', function () {
  downloadCanvas(this, 'myCanvas', 'test.png')
})

$("input").on('dragenter', function (e) {
  $(".drop").css({
    "border": "4px dashed #09f",
    "background": "rgba(0, 153, 255, .05)"
  })
  $(".cont").css({
    "color": "#09f"
  })
}).on('dragleave dragend mouseout drop', function (e) {
  $(".drop").css({
    "border": "3px dashed #DADFE3",
    "background": "transparent"
  })
  $(".cont").css({
    "color": "#8E99A5"
  })
})

async function handleFileSelect(evt) {
  let files = evt.target.files
  count = 0
  idNum = 0
  $('#canvas-container').empty()
  await createCanvas(files)
}

async function createCanvas(files) {
  let imgBackground
  let img
  let location = 0
  let canvas
  let context
  let startX = 0
  let startY = 0
  let width = 0
  let height = 0

  for (let j = 0; j < sources.length; j++) {
    imgBackground = new Image
    imgBackground.src = sources[j]
    await imgBackground.decode()

    $('#canvas-container').append(`
      <canvas id="canvas${idNum}"></canvas>
    `)

    canvas = document.getElementById(`canvas${idNum}`)
    canvas.width = imgBackground.naturalWidth
    canvas.height = imgBackground.naturalHeight
    canvas.style.height = "300px"
    canvas.style.width = imgBackground.naturalWidth * 300 / imgBackground.naturalHeight
    context = canvas.getContext('2d')

    await context.drawImage(imgBackground, 0, 0, canvas.width, canvas.height)

    img = new Image
    img.src = URL.createObjectURL(files[count])
    await img.decode()

    startX = parseInt(putLocation[`mk${j + 1}`][0])
    startY = parseInt(putLocation[`mk${j + 1}`][1])
    width = parseInt(putLocation[`mk${j + 1}`][2] - putLocation[`mk${j + 1}`][0])
    height = parseInt(putLocation[`mk${j + 1}`][3] - putLocation[`mk${j + 1}`][1])

  console.log(startX + '/ ' +startY+ '/ ' +width+ '/ ' +height)
    
    await context.drawImage(img, startX, startY, width, height)
    location += canvas.width
    idNum++
  }

  if (count < files.length - 1) {
    count++
    await createCanvas(files)
    return
  }
}

$('#files').on('change', handleFileSelect)