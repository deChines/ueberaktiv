var canvas = document.querySelector("#scene"),
  ctx = canvas.getContext("2d"),
  particles = [],
  amount = 0,
  mouse = {x:0,y:0},
  radius = 1;

var colors = "rgb(0,0,0,0.9)";

var copy = document.querySelector("#copy");

var ww = canvas.width = window.innerWidth/2;
var wh = canvas.height = window.innerHeight/2;

function Particle(x,y){
  this.x =  Math.random()*ww;
  this.y =  Math.random()*wh;
  this.dest = {
    x : x,
    y: y
  };
  if (canvas.width <= 600) {
    this.r =  Math.random()*3 + 1;
  } else if (canvas.width <= 767) {
    this.r =  Math.random()*4 + 2;
  } else {
    this.r =  Math.random()*5 + 3;
  }
  this.vx = (Math.random()-0.5)*500;
  this.vy = (Math.random()-0.5)*500;
  this.accX = 0;
  this.accY = 0;
  this.friction = Math.random()*0.05 + 0.90;

  this.color = colors;
}

Particle.prototype.render = function() {


  this.accX = (this.dest.x - this.x)/100;
  this.accY = (this.dest.y - this.y)/100;
  this.vx += this.accX;
  this.vy += this.accY;
  

  this.x += this.vx;
  this.y += this.vy;

  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
  ctx.fill();
  var distance = null;
  if (canvas.width <= 600) {
    var distance = 0.1;
  } else if (canvas.width <= 767) {
    var distance = 0.2;
  } else {
    var distance = 0.3;
  }
  
  if(distance < this.vy){
  this.vy *= this.friction;
  }
  if(distance < this.vx){
  this.vx *= this.friction;
  }
  
  var a = this.x - mouse.x;
  var b = this.y - mouse.y;
  var distance = Math.sqrt( a*a + b*b );
  if(distance<(radius*70)){
    this.accX = (this.x - mouse.x)/10;
    this.accY = (this.y - mouse.y)/10;
    this.vx += this.accX;
    this.vy += this.accY;
  }

}

function onMouseMove(e){
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

function onTouchMove(e){
  if(e.touches.length > 0 ){
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
  }
}

function onTouchEnd(e){
mouse.x = -9999;
mouse.y = -9999;
}

function initScene(){
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;

  console.log(ww);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (canvas.width <= 600) {
    ctx.font = "bold "+(ww/7)+"px sans-serif";
  } else if (canvas.width <= 767) {
    ctx.font = "bold "+(ww/7)+"px sans-serif";
  } else {
    ctx.font = "bold "+(ww/10)+"px sans-serif";
  }
  
  ctx.textAlign = "center";
  ctx.fillText(copy.value, ww/2, wh/2);

  var data  = ctx.getImageData(0, 0, ww, wh).data;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "screen";

  particles = [];

  let initamount = 300;

  if (canvas.width <= 600) {
    initamount = 100;
  } else if (canvas.width <= 850) {
    initamount = 150;
  } else {
    initamount = 250;
  };

  for(var i=0;i<ww;i+=Math.round(ww/initamount)){
    for(var j=0;j<wh;j+=Math.round(ww/initamount)){
      if(data[ ((i + j*ww)*4) + 3] > 100){
        particles.push(new Particle(i,j));
      }
    }
  }
  amount = particles.length;

}

function onMouseClick(){
  radius++;
  if(radius ===5){
    radius = 0;
  }
}

function render(a) {
  requestAnimationFrame(render);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < amount; i++) {
    particles[i].render();
  }
};

copy.addEventListener("keyup", initScene);
window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("touchend", onTouchEnd);
initScene();
requestAnimationFrame(render);