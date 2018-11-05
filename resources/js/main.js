var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy)

listenToUser(yyy)

var lineWidth = 5

var eraserEnabled = false
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    brush.classList.remove('active')
}

brush.onclick = function () {
    eraserEnabled = false
    brush.classList.add('active')
    eraser.classList.remove('active')
}

clear.onclick = function () {
    context.clearRect(0, 0, yyy.width, yyy.height)
}

download.onclick = function () {
    var image = yyy.toDataURL("image/png").replace("image/png", "image/octet-stream"); // here is the most important part because if you dont replace you will get a DOM 18 exception.
    window.location.href = image; // it will save locally
}

black.onclick = function () {
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    red.classList.remove('active')
    yellow.classList.remove('active')
    orange.classList.remove('active')
}

red.onclick = function () {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
    yellow.classList.remove('active')
    orange.classList.remove('active')
}

green.onclick = function () {
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
    yellow.classList.remove('active')
    orange.classList.remove('active')
}

blue.onclick = function () {
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
    yellow.classList.remove('active')
    orange.classList.remove('active')
}

yellow.onclick = function () {
    context.fillStyle = 'yellow'
    context.strokeStyle = 'yellow'
    yellow.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
    blue.classList.remove('active')
    orange.classList.remove('active')
}

orange.onclick = function () {
    context.fillStyle = 'orange'
    context.strokeStyle = 'orange'
    orange.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
    yellow.classList.remove('active')
    blue.classList.remove('active')
}

thin.onclick = function () {
    lineWidth = 5
}

thick.onclick = function () {
    lineWidth = 10
}

function drawCircle(x, y, radius) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1) //起点
    context.lineWidth = lineWidth
    context.lineTo(x2, y2) //终点
    context.stroke()
    context.closePath()
}

function autoSetCanvasSize(canvas) {
    setCanvasSize()

    //用户调整宽高后自适应100%
    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function listenToUser(canvas) {

    var context = canvas.getContext('2d')

    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    }

    //特性检测
    if ('ontouchstart' in document.documentElement) {
        //触屏设备
        canvas.ontouchstart = function (a) {
            var x = a.touches[0].clientX;
            var y = a.touches[0].clientY;
            using = true;
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, lineWidth * 4, lineWidth * 4)
            } else {
                lastPoint = {
                    'x': x,
                    'y': y
                }
                drawCircle(x, y, lineWidth / 2)
            }
        }
        canvas.ontouchmove = function (a) {
            var x = a.touches[0].clientX;
            var y = a.touches[0].clientY;

            if (!using) {
                return
            }

            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, lineWidth * 4, lineWidth * 4)
            } else {
                var newPoint = {
                    'x': x,
                    'y': y
                }
                drawCircle(x, y, lineWidth / 2)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }
        canvas.ontouchend = function (a) {
            using = false;
        }


    } else {
        //非触屏设备
        canvas.onmousedown = function (a) {
            var x = a.clientX;
            var y = a.clientY;
            using = true;
            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, lineWidth * 4, lineWidth * 4)
            } else {
                lastPoint = {
                    'x': x,
                    'y': y
                }
                drawCircle(x, y, lineWidth / 2)
            }
        }

        canvas.onmousemove = function (a) {
            var x = a.clientX;
            var y = a.clientY;

            if (!using) {
                return
            }

            if (eraserEnabled) {
                context.clearRect(x - 10, y - 10, lineWidth * 4, lineWidth * 4)
            } else {
                var newPoint = {
                    'x': x,
                    'y': y
                }
                drawCircle(x, y, lineWidth / 2)
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.onmouseup = function (a) {
            using = false;
        }
    }
}