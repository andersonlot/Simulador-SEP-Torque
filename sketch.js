let canvas_div; // recieve the canvas when start and when resize window
let layer_0;
let Width = window.innerWidth, Height = window.innerHeight - 110; // variáveis contendo dimensões do canvas
let zomm = 1200; // Valor inicial do Zoom ( quanto maior, mais distante)
let grupos = [];

// variáveis para navegaçao com mouse
let mouseTemp = [];
let drag_value = [];
let drag_total_value = [-25, -62];
let drag_total_value_temp = [-25, -62];
let drag_value_lerp = [100, -10];
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
function setup() {
  canvas_div = document.getElementById("canvas");
  Width = canvas_div.offsetWidth;
  Height = canvas_div.offsetHeight;
  let canvas = createCanvas(Width, Height);
  canvas.parent('canvas');
  layer_0 = createGraphics(Width, Height, WEBGL);
  novoGrupo();
}

function draw() {
  draw_layer_0();
  document.getElementById('botao_novo_grupo').addEventListener("click", novoGrupo);
  for (let i = 0; i < grupos.length; i++) {
    let item = ['gerador', 'barramento', 'carga'];
    for (let j = 0; j < item.length; j++) {
      let botao_exclui = document.getElementById('deleta_grupo_' + grupos[i].id);
      botao_exclui.addEventListener("click", deletaGrupo);
      botao_exclui.parametro = grupos[i].id;
      if (grupos[i].ativo) {
        let botao_adiciona = document.getElementById('adiciona_' + item[j] + '_' + grupos[i].id);
        botao_adiciona.addEventListener("click", adicionaItemGrupo);
        botao_adiciona.parametro = [grupos[i].id, item[j]];
      }
    }
  }
}

function mouseOverCavasListener() {
  let canva_div = document.getElementById("canvas");
  let _mouseIn;
  if (canva_div.parentNode.querySelector(":hover") == canva_div) {
    _mouseIn = true;
  } else {
    _mouseIn = false;
  }
  return _mouseIn;
}

let Camera = {
  posicao: {
    x: 0,
    y: 0,
    z: 0
  },
  foco: {
    x: 0,
    y: 0,
    z: 0
  }
}
function draw_layer_0() {
  lerpCameraDrag();
  layer_0.clear();
  layer_0.background("#1E1E1E");
  Camera.posicao.x = zomm * sin(drag_value_lerp[0] / 100);
  Camera.posicao.y = calculaMediaYFoco()+10*drag_value_lerp[1];
  Camera.posicao.z = zomm * cos(drag_value_lerp[0] / 100);
  Camera.foco.x = 300;
  Camera.foco.y = calculaMediaYFoco();
  Camera.foco.z = 0;
  layer_0.camera(
    Camera.posicao.x,
    Camera.posicao.y,
    Camera.posicao.z,
    Camera.foco.x,
    Camera.foco.y,
    Camera.foco.z
  )
  layer_0.ambientLight(100, 100, 100, 10);
  layer_0.pointLight(100, 100, 100, 100, -1500, -300);
  layer_0.stroke(20);
  layer_0.strokeWeight(2);
  //começa aqui o conteúdo
  for (let element in grupos) {
    grupos[element].draw();
  }

  // termina aqui o conteúdo
  desenhaLinhasGuia();

  image(layer_0, 0, 0);
}
function windowResized() {
  attCanvasDimension();

}
function mouseWheel(event) {
  if (mouseOverCavasListener()) {
    attCameraZomm(event);
    return false;
  }
}

function mousePressed() {
  if (mouseOverCavasListener()) {
    setCameraDrag();
    return false;
  }
}
function mouseDragged() {
  if (mouseOverCavasListener()) {
    attCameraDrag();
    return false;
  }
}
function mouseReleased() {
  resetCameraDrag();
}


function attCameraDrag() {
  drag_value = [-mouseX + mouseTemp[0], -mouseY + mouseTemp[1]];
  drag_total_value[0] = drag_total_value_temp[0] + 0.005 * drag_value[0];
  drag_total_value[1] = drag_total_value_temp[1] + 0.005 * drag_value[1];
  drag_total_value[1] = Math.max(Math.min(1000, drag_total_value[1]), -1000);
}

function resetCameraDrag() {
  drag_total_value_temp = drag_total_value;
}

function setCameraDrag() {
  mouseTemp = [mouseX, mouseY];
}

function attCameraZomm(event) {
  zomm += event.delta;
  zomm = Math.max(Math.min(3000, zomm), 100);
}

function lerpCameraDrag() {
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
}

function desenhaLinhasGuia() {
  layer_0.stroke("red");
  layer_0.line(-999999, 0, 0, 999999, 0, 0);
  layer_0.stroke("green");
  layer_0.line(0, -999999, 0, 0, 999999, 0);
  layer_0.stroke("blue");
  layer_0.line(0, 0, -999999, 0, 0, 999999);
}

function attCanvasDimension() {
  Width = canvas_div.offsetWidth;
  Height = canvas_div.offsetHeight;
  resizeCanvas(Width, Height);
  layer_0 = createGraphics(Width, Height, WEBGL);
}