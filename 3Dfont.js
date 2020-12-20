window.addEventListener ? window.addEventListener("mousemove", showMouseXY, false) : window.attachEvent && window.attachEvent("onmousemove", showMouseXY);

function text3d(x, y) {
  var colors3d = ["#cccccc", "#c9c9c9", "#bbbbbb", "#b9b9b9", "#aaaaaa", "#a9a9a9"];
  var styleStore = "";
  for (var i = 0; i < 6; i++) {
    styleStore += (x * (i * .03)) + "px " + (y * (i * .03)) + "px 0 " + colors3d[i] + ",";
  }
  return styleStore.substr(0, styleStore.length - 1);
}

function shadow3d(x, y) {
  var shadow = ["rgba(0,0,0,.1)", "rgba(0,0,0,.15)", "rgba(0,0,0,.2)", "rgba(0,0,0,.2)", "rgba(0,0,0,.25)", "rgba(0,0,0,.3)"];
  var styleStore = "";
  for (var i = 0; i < 6; i++) {
    styleStore += (x * (i * .15)) + "px " + (y * (i * .15)) + "px " + (i * 4) + "px " + shadow[i] + ",";
  }
  return styleStore.substr(0, styleStore.length - 1);
}

function showMouseXY(event) {
  var target = document.querySelector("header h1");
  var body = document.querySelector("body");
  var cX = -(window.innerWidth / 2 - event.clientX) / 10;
  var cY = (window.innerHeight / 2 - event.clientY) / 10;
  target.setAttribute("style", "text-shadow:" + text3d(-(cX), cY) + "," + shadow3d(-(cX), cY) + ";transform:rotateY(" + cX + "deg) rotateX(" + cY + "deg);");
  var radX = (event.clientX > (window.innerWidth * .333333) ? (event.clientX < window.innerWidth * .666666 ? "center" : "right") : "left");
  var radY = (event.clientY > (window.innerHeight * .333333) ? (event.clientY < window.innerHeight * .666666 ? "center" : "bottom") : "top");
  // console.log("x: " + cX);
  // console.log("y: " + cY);
  // console.log("x: " + radX);
  // console.log("y: " + radY);

  // if (radX == "center" && radY =="center") {
  //   console.log("sweetspot");
  //   document.getElementById("tremble").style.animation = "shake 0.5s";
  // }

  var bgX = -((event.clientX-window.innerWidth)/window.innerWidth)*100;
  var bgY = -((event.clientY-window.innerHeight)/window.innerHeight)*100;
  body.setAttribute("style","background: radial-gradient(circle at "+bgX+"% "+bgY+"%, #eee 20%, #aaa); background: -webkit-radial-gradient("+bgX+"% "+bgY+"%,#eee 20%, #aaa);")
  // console.log("background: radial-gradient(circle at "+bgX+"% "+bgY+"%, #eee 20%, #aaa; background: -webkit-radial-gradient("+bgX+"% "+bgY+"%,#eee 20%, #aaa);")

}
