var canvas_div; // recieve the canvas when start and when resize window
var Width = window.innerWidth, Height = window.innerHeight-110; // variáveis contendo dimensões do canvas
var zomm = 1200; // Valor inicial do Zoom ( quanto maior, mais distante)

// variáveis para navegaçao com mouse
var mouseTemp=[];
var drag_value=[];
var drag_total_value = [-25,-62];
var drag_total_value_temp = [-25,-62];
var drag_value_lerp = [100,-10];
// Calling for Matter.js library
let engine = Matter.Engine.create();
let render = Matter.Render.create({
  //element: document.body,
  engine: engine,
  options: {
    width: Width,
    height: Height,
    wireframes: false
  }
});
Matter.Runner.run(engine);
Matter.Render.run(render);

const grupos=[];



let canva;
function setup() {
  canvas_div = document.getElementById("canvas");
  Width = canvas_div.offsetWidth;
  Height = canvas_div.offsetHeight;
  canva = createCanvas(Width, Height);
  canva.parent('canvas');
  layer_0 = createGraphics(Width, Height, WEBGL);
  layer_1 = createGraphics(Width, Height);
  aviso = true;
}


var _mouseIn;


  
  
  
 

function draw() {
  
  let canva_div = document.getElementById("canvas");
  if (canva_div.parentNode.querySelector(":hover") == canva_div) {
    _mouseIn = true;
  } else {
    _mouseIn = false;
  }
  draw_layer_0();
  image(layer_0, 0, 0);
  document.getElementById('botao_novo_grupo').addEventListener("click",functionName);
  
}

function functionName(){
  //function defination
  console.log("HI");
  novoGrupo();
  }

function draw_layer_1() {
  layer_1.clear();
  if (!aviso) { return; }
  layer_1.push();
  layer_1.noStroke();
  layer_1.fill(10, 10, 15, 240);
  layer_1.translate(width / 2, 400);
  layer_1.rectMode(CENTER);
  layer_1.rect(0, 0, 500, 150, 10);
  layer_1.fill(220, 200, 0);
  layer_1.translate(0, 30);
  layer_1.push();
  layer_1.rectMode(CENTER);
  layer_1.rect(0, 0, 100, 30, 5);
  layer_1.pop();
  layer_1.fill(20, 20, 50);
  layer_1.textSize(20);
  layer_1.textAlign(CENTER, CENTER);
  layer_1.textStyle(BOLD);
  layer_1.text("OK", 0, 0);
  layer_1.translate(0, -50);
  layer_1.fill(200, 200, 210);
  layer_1.textSize(18);
  layer_1.textAlign(CENTER, CENTER);
  layer_1.textStyle(BOLD);
  layer_1.text("Bem vindo ao Simulador GearSEP!", 0, 0);
  layer_1.pop();
}




function draw_layer_0() {
  if (Math.abs(drag_total_value[0] - drag_value_lerp[0]) > 1.5) {
    drag_value_lerp[0] = lerp(drag_value_lerp[0], drag_total_value[0], 0.1);
  } else {
    drag_value_lerp[0] = drag_total_value[0];
  }
  if (Math.abs(drag_total_value[1] - drag_value_lerp[1]) > 1.5) {
    drag_value_lerp[1] = lerp(drag_value_lerp[1], drag_total_value[1], 0.15);
  } else {
    drag_value_lerp[1] = drag_total_value[1];
  }
  layer_0.clear();
  layer_0.background("#1E1E1E");
  layer_0.camera(zomm * sin(drag_value_lerp[0] / 100), zomm * drag_value_lerp[1] / 100, zomm * cos(drag_value_lerp[0] / 100), 300, 0, 0);
  layer_0.ambientLight(100, 100, 100, 10);
  layer_0.pointLight(100, 100, 100, 100, -1500, -300);
  layer_0.stroke(20);
  layer_0.strokeWeight(2);
  //começa aqui o conteúdo
  for(let element in grupos){
    grupos[element].draw();
  }
  
  // termina aqui o conteúdo
  layer_0.stroke("red");
  layer_0.line(-999999, 0, 0, 999999, 0, 0);
  layer_0.stroke("green");
  layer_0.line(0, -999999, 0, 0, 999999, 0);
  layer_0.stroke("blue");
  layer_0.line(0, 0, -999999, 0, 0, 999999);
}
function windowResized() {
  canvas_div = document.getElementById("canvas");
  Width = canvas_div.offsetWidth;
  Height = canvas_div.offsetHeight;
  resizeCanvas(Width, Height);
  layer_0 = createGraphics(Width, Height, WEBGL);
  layer_1 = createGraphics(Width, Height);
}
function mouseWheel(event) {
  if (mouseIn()) {
    zomm += event.delta;
    zomm = Math.max(Math.min(2500, zomm), 100);
    return false;
  }
}
function mouseIn() {
  return _mouseIn;
}
function mousePressed(event) {
  if (mouseIn()) {
    mouseTemp = [mouseX, mouseY];
    return false;
  }
}
function mouseDragged(event) {
  if (mouseIn()) {
    drag_value = [-mouseX + mouseTemp[0],-mouseY + mouseTemp[1]];
    drag_total_value[0] = drag_total_value_temp[0] + 0.005 * drag_value[0];
    drag_total_value[1] = drag_total_value_temp[1] + 0.005 * drag_value[1];
    drag_total_value[1] = Math.max(Math.min(1000, drag_total_value[1]),-1000);
    return false;
  }
}
function mouseReleased() {
  aviso = false;
  drag_total_value_temp = drag_total_value;
}








