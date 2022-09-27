
const Width = 600, Height = 600;
var zomm = 1200;
var mouseXtemp;
var mouseYtemp;
var dragX;
var dragY;
var dragSummX = -25;
var dragSummY = -62;
var dragSummXTemp = -25;
var dragSummYTemp = -62;
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



let canva;
function setup() {

  canva = createCanvas(Width + 300, Height);
  canva.parent('canvas');
  leftCanva = createGraphics(Width, Height, WEBGL);
  leftCanvaTop = createGraphics(Width, Height);
  rightCanva = createGraphics(300, Height);
  aviso=true;
}


const gerador = new Gerador(0);
gerador.addWorld();
const barra1 = new Barramento(300);
barra1.addWorld();
const carga1 = new Carga(600);
carga1.addWorld();
const transmissao1 = new Transmissao(gerador, barra1, 0.005);
transmissao1.addWorld();
const transmissao2 = new Transmissao(barra1, carga1, 0.01);
transmissao2.addWorld();
const barra2 = new Barramento(300, 500);
barra2.addWorld();
const transmissao3 = new Transmissao(barra2, barra1, 0.01);
transmissao3.addWorld();
const barra3 = new Barramento(300, -500);
barra3.addWorld();
const transmissao4 = new Transmissao(barra3, barra1, 0.01);
transmissao4.addWorld();
const carga2 = new Carga(600, 500);
carga2.addWorld();
const transmissao5 = new Transmissao(barra2, carga2, 0.005);
transmissao5.addWorld();



Matter.Runner.run(engine);
Matter.Render.run(render);



function draw() {
  drawLeftCanva();
  drawRightCanva();
  clear();
  background(0);
  image(leftCanva, 0, 0);
  image(rightCanva, Width, 0);
  image(leftCanvaTop, 0, 0)
  gerador.torque = 2;
  drawLeftCanvaTop();
}

function drawLeftCanvaTop() {
  leftCanvaTop.clear();
  if(!aviso){return;}
  leftCanvaTop.push();
  leftCanvaTop.noStroke();
  leftCanvaTop.fill(10,10,15,240);
  leftCanvaTop.translate(50,400);
  leftCanvaTop.rect(0,0,500,150,10);
  leftCanvaTop.fill(220,200,0);
  leftCanvaTop.translate(250,100);
  leftCanvaTop.push();
  leftCanvaTop.rectMode(CENTER);
  leftCanvaTop.rect(0,0,100,30,5);
  leftCanvaTop.pop();
  leftCanvaTop.fill(20,20,50);
  leftCanvaTop.textSize(20);
  leftCanvaTop.textAlign(CENTER,CENTER);
  leftCanvaTop.textStyle(BOLD);
  leftCanvaTop.text("OK",0,0);
  leftCanvaTop.translate(0,-50);
  leftCanvaTop.fill(200,200,210);
  leftCanvaTop.textSize(18);
  leftCanvaTop.textAlign(CENTER,CENTER);
  leftCanvaTop.textStyle(BOLD);
  leftCanvaTop.text("Bem vindo ao Simulador GearSEP!",0,0);
  leftCanvaTop.pop();
}

var dragX_lerp =100;
var dragY_lerp =-10;

function drawLeftCanva() {
  dragX_lerp=lerp(dragX_lerp,dragSummX,0.05);
  dragY_lerp=lerp(dragY_lerp,dragSummY,0.05);
  leftCanva.clear();
  leftCanva.background(20);
  leftCanva.camera(zomm * sin(dragX_lerp / 100), zomm * sin(dragY_lerp / 100), zomm * cos(dragX_lerp / 100), 300, 0, 0);
  leftCanva.ambientLight(100, 100, 100, 10);
  leftCanva.pointLight(100, 100, 100, 100, -1500, -300);
  leftCanva.stroke(20);
  leftCanva.strokeWeight(2);
  gerador.draw();
  gerador.att();
  barra1.draw();
  carga1.draw();
  transmissao1.draw();
  transmissao2.draw();
  barra2.draw();
  transmissao3.draw();
  barra3.draw();
  transmissao4.draw();
  carga2.draw();
  transmissao5.draw();
  leftCanva.stroke("red");
  leftCanva.line(-999999, 0, 0, 999999, 0, 0);
  leftCanva.stroke("green");
  leftCanva.line(0, -999999, 0, 0, 999999, 0);
  leftCanva.stroke("blue");
  leftCanva.line(0, 0, -999999, 0, 0, 999999);
 
}

function drawRightCanva() {
  rightCanva.clear();
  rightCanva.background(40);
}

function mouseWheel(event) {
  if (mouseIn()) {
    zomm += event.delta;
    zomm = Math.max(Math.min(2500, zomm), 100);
    return false;
  }
}
function mouseIn() {
  if (mouseX > 0 && mouseY > 0 && mouseX< width && mouseY< height){
    return true;
  }
  return false;
}
function mousePressed(event) {
  if (mouseIn()) {
    mouseXtemp = mouseX;
    mouseYtemp = mouseY;
    return false;
  }
}
function mouseDragged(event) {
  if (mouseIn()) {
    dragX = -mouseX + mouseXtemp;
    dragY = -mouseY + mouseYtemp;
    dragSummX = dragSummXTemp + 0.1 * dragX;
    dragSummY = dragSummYTemp + 0.1 * dragY;
    return false;
  }
}
function mouseReleased() {
  aviso=false;
  dragSummXTemp = dragSummX;
  dragSummYTemp = dragSummY;
}








