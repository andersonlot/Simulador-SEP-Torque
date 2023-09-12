let canvas_div; // recieve the canvas when start and when resize window
let layer_0;
let Width = window.innerWidth, Height = window.innerHeight - 110; // variáveis contendo dimensões do canvas
let grupos = [];


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
    for(let ii=0; ii<grupos[i].partes.length; ii++) {
      let botao_exclui_parte = document.getElementById('exclui_partes_'+grupos[i].partes[ii].id+'_'+grupos[i].id);
      botao_exclui_parte.addEventListener('click', deletaParte);
      botao_exclui_parte.parametro = [grupos[i].id,grupos[i].partes[ii].id];
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

function draw_layer_0() {
  layer_0.clear();
  layer_0.background("#1E1E1E");
  Camera.run(layer_0);
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
    Camera.attZoom(event);
    return false;
  }
}

function mousePressed() {
  if (mouseOverCavasListener()) {
    Camera.mouseDrag.set();
    return false;
  }
}
function mouseDragged() {
  if (mouseOverCavasListener()) {
    Camera.mouseDrag.att();
    return false;
  }
}
function mouseReleased() {
  Camera.mouseDrag.reset();
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