
const Width=900,Height=600;
var zomm=1000;
var mouseXtemp;
var mouseYtemp;
var dragX;
var dragY;
var dragSummX=0;
var dragSummY=0;
// Calling for Matter.js library
let engine = Matter.Engine.create();
let render = Matter.Render.create({
    //element: document.body,
    engine: engine,
    options:{
        width: Width,
        height: Height,
        wireframes: false
    }
});


const gerador = new Gerador(100);
gerador.addWorld();
const barra1 = new Barramento(300);
barra1.addWorld();
const carga1 = new Carga(600);
carga1.addWorld();
const transmissao1= new Transmissao(gerador,barra1,0.005);
transmissao1.addWorld();
const transmissao2= new Transmissao(barra1,carga1,1);
transmissao2.addWorld();
const barra2 = new Barramento(300,500);
barra2.addWorld();
const transmissao3 = new Transmissao(barra2,barra1,1);
transmissao3.addWorld();
const barra3 = new Barramento(300,-500);
barra3.addWorld();
const transmissao4 = new Transmissao(barra3,barra1,1);
transmissao4.addWorld();
const carga2 = new Carga(600,500);
carga2.addWorld();
const transmissao5 = new Transmissao(barra2,carga2,0.005);
transmissao5.addWorld();



Matter.Runner.run(engine);
Matter.Render.run(render);

let canva;
function setup() {
  canva=createCanvas(Width,Height,WEBGL);
  canva.parent('canvas');
}
function draw() {
  //clear();
  background(160,50);
  camera(zomm*sin(dragSummX/100), zomm*sin(dragSummY/100), zomm*cos(dragSummX/100), 0, 0,0);
  ambientLight(100,100,100);
  pointLight(200,200,200,800, -300, 700);
  stroke("black");
  strokeWeight(2);
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
  stroke("red");
  line(-999999,0,0,999999,0,0);
  stroke("green");
  line(0,-999999,0,0,999999,0);
  stroke("blue");
  line(0,0,-999999,0,0,999999);
}
function mouseWheel(event) {
  if(mouseIn()){
    zomm += event.delta;
    zomm=Math.max(Math.min(2500, zomm),100);
    return false;
  }
}
function mouseIn(){
  if(mouseX>0&&mouseY>0){
    return true;
  }
  return false;
}
function mousePressed(event) {
  mouseXtemp = mouseX;
  mouseYtemp = mouseY;
}
function mouseDragged(event) {
  dragX = -mouseX + mouseXtemp;
  dragY = -mouseY + mouseYtemp;
  dragSummX = dragSummXTemp + dragX;
  dragSummY = dragSummYTemp + dragY;
}
function mouseReleased(){
  dragSummXTemp=dragSummX;
  dragSummYTemp=dragSummY;
}








