
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvasSize(yyy)


listenToMouse(yyy)


var eraserEnabled = false
eraser.onclick = function(){
  eraserEnabled = true
  actions.className = 'actions x'
  
}
brush.onclick = function(){
  eraserEnabled = false
  actions.className = 'actions'
}

function drawLine(x1,y1,x2,y2){
  context.beginPath()
  context.moveTo(x1,y1)//起点
  context.lineWidth = 5
  context.lineTo(x2,y2)//终点
  context.stroke()
  context.closePath()
}

function autoSetCanvasSize(canvas){
  setCanvasSize()

  //用户调整宽高后自适应100%
  window.onresize = function(){
    setCanvasSize()
  }

function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

function listenToMouse(canvas){
  
    var context = canvas.getContext('2d')

    var using = false;
    var lastPoint = {x: undefined, y: undefined}

    yyy.onmousedown = function(a){
      var x = a.clientX;
      var y = a.clientY;
      using = true;
      if(eraserEnabled){
        context.clearRect(x-10,y-10,20,20)
      }else {
        lastPoint = {'x': x, 'y': y}
        }
    }

    yyy.onmousemove = function(a){
      var x = a.clientX;
      var y = a.clientY;
      
      if(!using){return}
      
      if(eraserEnabled){
        context.clearRect(x-10,y-10,20,20)
      } else {
        var newPoint = {'x': x, 'y': y}  
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)   
        lastPoint = newPoint   
      }
    }

    yyy.onmouseup = function(a){
      using = false;
    }
}
