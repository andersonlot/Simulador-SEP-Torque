/**
 * Classe para criar um objeto do tipo gerador. 
 * @class Gerador
 */
class Gerador {
    /**
    * Define a posição do Gerador
    * @param {number} xPosition
    * @param {number} yPosition
    * @param {number} id
    */
    constructor(xPosition, yPosition, id) {
        this.id = id;
        this.type = "gerador";
        this.size = 200;
        this.p = { x: xPosition || 0, y: yPosition || 0 };
        this.torque = 2;
        this.body = Matter.Bodies.circle(this.p.x, this.p.y, this.size / 2, {
            friction: 0,
            frictionAir: 0.01,
            frictionStatic: 1
        });
        this.color = [50, 50, 70];
        this.pontoFixo = Matter.Constraint.create({
            pointA: { x: this.p.x, y: this.p.y },
            bodyB: this.body,
            length: 0,
            frictionAir: 0,
            friction: 0,
            frictionStatic: 1,
            stiffness: 1
        });
        this.addWorld();
    };
    /**
    * Desenha o Gerador
    * @method draw
    */
    draw() {
        this.att();
        layer_0.push();
        layer_0.fill(this.color);
        layer_0.translate(this.body.position.x, this.body.position.y, 0);
        layer_0.rotateX(this.body.angle);
        layer_0.rotateZ(-PI / 2);
        layer_0.cylinder(this.size, 100, 10);
        layer_0.pop();
    };
    /**
    * Atualiza calculos de torque a cada frame
    * @method att
    */
    att() {
        this.body.torque = this.torque;
    };
    /**
    * Adiciona no mundo
    * @method addWorld
    */
    addWorld() {
        Matter.World.add(engine.world, [this.pontoFixo, this.body]);
    }
    removeWorld() {
        Matter.World.remove(engine.world, [this.pontoFixo, this.body]);
    }
};


/**
 * Classe para criar um objeto do tipo barramento elétrico
 * @class Barramento
 */
class Barramento {
    /**
     * Define a posição do Barramento
     * @param {number} xPosition 
     * @param {number} yPosition 
     * @param {number} id
     */

    constructor(xPosition, yPosition, id) {
        this.id = id;
        this.type = "barramento";
        this.size = 200;
        this.p = { x: xPosition || 0, y: yPosition || 0 };
        this.body = Matter.Bodies.circle(this.p.x, this.p.y, this.size / 2, {
            friction: 0,
            frictionAir: 0.01,
            frictionStatic: 1
        });
        this.color = [70, 70, 70];
        this.pontoFixo = Matter.Constraint.create({
            pointA: { x: this.p.x, y: this.p.y },
            bodyB: this.body,
            length: 0,
            frictionAir: 0,
            friction: 0,
            frictionStatic: 1,
            stiffness: 1
        });
        this.addWorld();
    };
    /**
     * Desenha o Barramento
     */
    draw() {
        layer_0.push();
        layer_0.fill(this.color);
        layer_0.translate(this.body.position.x, this.body.position.y, 0);
        layer_0.rotateX(this.body.angle);
        layer_0.rotateZ(-PI / 2);
        layer_0.cylinder(this.size, 100, 10);
        layer_0.pop();
    };
    /**
    * Adiciona no mundo
    */
    addWorld() {
        Matter.World.add(engine.world, [this.pontoFixo, this.body]);
    }
    removeWorld() {
        Matter.World.remove(engine.world, [this.pontoFixo, this.body]);
    }
};


/**
 * Classe para criar um objeto do tipo barramento carga 
 * @class Carga
 * 
 */
class Carga {
    /**
     * Define a posição da Carga
     * @param {number} xPosition 
     * @param {number} yPosition 
     * @param {number} id
     */
    constructor(xPosition, yPosition, id) {
        this.id = id;
        this.type = "barramento de carga";
        this.size = 200;
        this.p = { x: xPosition || 0, y: yPosition || 0 };
        this.body = Matter.Bodies.circle(this.p.x, this.p.y, this.size / 2, {
            friction: 0,
            frictionAir: 0.01,
            frictionStatic: 1
        });
        this.color = [80, 70, 70];
        this.pontoFixo = Matter.Constraint.create({
            pointA: { x: this.p.x, y: this.p.y },
            bodyB: this.body,
            length: 0,
            frictionAir: 0,
            friction: 0,
            frictionStatic: 1,
            stiffness: 1
        });
        this.addWorld();
    };
    /**
    * Desenha a carga
    */
    draw() {
        layer_0.push();
        layer_0.fill(this.color);
        layer_0.translate(this.body.position.x, this.body.position.y, 0);
        layer_0.rotateX(this.body.angle);
        layer_0.rotateZ(-PI / 2);
        layer_0.cylinder(this.size, 100, 10);
        layer_0.pop();
    };
    /**
    * Adiciona no mundo
    */
    addWorld() {
        Matter.World.add(engine.world, [this.pontoFixo, this.body]);
    }
    removeWorld() {
        Matter.World.remove(engine.world, [this.pontoFixo, this.body]);
    }
};

/**
 * Classe para criar rede de transmissão entre dois barramentos 
 * @class Transmissao
 */
class Transmissao {
    /**
     * Infome os dois barramentos que deseja conectar e o valor da condutância ( máximo 1 )
     * @param {Barramento} barrA
     * @param {Barramento} barrB
     * @param {number <= 1} condutividade
     * @param {number} id
     */
    constructor(barrA, barrB, condutividade, id) {
        this.id = id;
        this.barrA = barrA;
        this.barrB = barrB;
        let stiffnessValue = condutividade;
        let lengthValue = Math.sqrt(Math.abs(this.barrA.p.x - this.barrB.p.x) * Math.abs(this.barrA.p.x - this.barrB.p.x) + Math.abs(this.barrA.p.y - this.barrB.p.y) * Math.abs(this.barrA.p.y - this.barrB.p.y));
        this.slings = [];
        this.slings[0] = Matter.Constraint.create({
            bodyA: barrA.body,
            pointA: { x: -100, y: 0 },
            bodyB: barrB.body,
            pointB: { x: -100, y: 0 },
            length: lengthValue,
            stiffness: stiffnessValue,
            frictionAir: 0,
            friction: 0,
            frictionStatic: 1
        });

        this.slings[1] = Matter.Constraint.create({
            bodyA: barrA.body,
            pointA: { x: 0, y: -100 },
            bodyB: barrB.body,
            pointB: { x: 0, y: -100 },
            length: lengthValue,
            stiffness: stiffnessValue,
            frictionAir: 0,
            friction: 0,
            frictionStatic: 1
        });

        this.slings[2] = Matter.Constraint.create({
            bodyA: barrA.body,
            pointA: { x: 100, y: 0 },
            bodyB: barrB.body,
            pointB: { x: 100, y: 0 },
            length: lengthValue,
            stiffness: stiffnessValue,
            frictionAir: 0,
            friction: 0,
            frictionStatic: 1
        });

        this.slings[3] = Matter.Constraint.create({
            bodyA: barrA.body,
            pointA: { x: 0, y: 100 },
            bodyB: barrB.body,
            pointB: { x: 0, y: 100 },
            length: lengthValue,
            stiffness: stiffnessValue,
            frictionAir: 0,
            friction: 0,
            frictionStatic: 1
        });
        this.addWorld();
    }
    /**
     * Desenha a Transmissão
     */
    draw() {
        let A = [this.barrA.p.x, this.barrA.body.position.y + this.slings[0].pointA.y, -(this.barrA.body.position.x + this.slings[0].pointA.x - this.barrA.p.x)],
            B = [this.barrB.p.x, this.barrB.body.position.y + this.slings[0].pointB.y, -(this.barrB.body.position.x + this.slings[0].pointB.x - this.barrB.p.x)],
            C = [this.barrB.p.x, this.barrB.body.position.y + this.slings[1].pointB.y, -(this.barrB.body.position.x + this.slings[1].pointB.x - this.barrB.p.x)],
            D = [this.barrA.p.x, this.barrA.body.position.y + this.slings[1].pointA.y, -(this.barrA.body.position.x + this.slings[1].pointA.x - this.barrA.p.x)];
        layer_0.push();
        layer_0.fill(100, 0, 0);
        layer_0.beginShape();
        layer_0.vertex(A[0], A[1], A[2]);
        layer_0.vertex(B[0], B[1], B[2]);
        layer_0.vertex(C[0], C[1], C[2]);
        layer_0.vertex(D[0], D[1], D[2]);
        layer_0.endShape();
        layer_0.pop();

        let E = [this.barrA.p.x, this.barrA.body.position.y + this.slings[2].pointA.y, -(this.barrA.body.position.x + this.slings[2].pointA.x - this.barrA.p.x)],
            F = [this.barrB.p.x, this.barrB.body.position.y + this.slings[2].pointB.y, -(this.barrB.body.position.x + this.slings[2].pointB.x - this.barrB.p.x)],
            G = [this.barrB.p.x, this.barrB.body.position.y + this.slings[3].pointB.y, -(this.barrB.body.position.x + this.slings[3].pointB.x - this.barrB.p.x)],
            H = [this.barrA.p.x, this.barrA.body.position.y + this.slings[3].pointA.y, -(this.barrA.body.position.x + this.slings[3].pointA.x - this.barrA.p.x)];
        layer_0.fill(100, 0, 0);
        layer_0.beginShape();
        layer_0.vertex(E[0], E[1], E[2]);
        layer_0.vertex(F[0], F[1], F[2]);
        layer_0.vertex(G[0], G[1], G[2]);
        layer_0.vertex(H[0], H[1], H[2]);
        layer_0.endShape();
        layer_0.fill(180, 0, 0);
        layer_0.beginShape();
        layer_0.vertex(E[0], E[1], E[2]);
        layer_0.vertex(F[0], F[1], F[2]);
        layer_0.vertex(C[0], C[1], C[2]);
        layer_0.vertex(D[0], D[1], D[2]);
        layer_0.endShape();
        layer_0.fill(180, 0, 0);
        layer_0.beginShape();
        layer_0.vertex(A[0], A[1], A[2]);
        layer_0.vertex(B[0], B[1], B[2]);
        layer_0.vertex(G[0], G[1], G[2]);
        layer_0.vertex(H[0], H[1], H[2]);
        layer_0.endShape();
    }
    addWorld() {
        Matter.World.add(engine.world, [this.slings[0], this.slings[1], this.slings[2], this.slings[3]]);
    }
    removeWorld() {
        Matter.World.remove(engine.world, [this.slings[0], this.slings[1], this.slings[2], this.slings[3]]);
    }

}
/**
 * Classe para criar um grupo de objetos
 * @class Grupo
 */
class Grupo {
    /** Constroe Grupo, forncer o tamanho do array que irá possuir esse grupo
     * @param {number} length
     */
    constructor(length) {
        this.id = length;
        this.ativo = true;
        this.partes = [];
    }
    /**
     * Desenha os elementos do grupo
     */
    draw() {
        for (let element in this.partes) {
            this.partes[element].draw();
        }
    }
    removeWorld() {
        for (let element in this.partes) {
            this.partes[element].removeWorld();
        }
    }
}

function novoGrupo() {
    newId = getNewGrupoId();
    grupos[grupos.length] = new Grupo(newId);
    let ele = document.getElementById('dados_grupos');
    let id = newId;
    ele.innerHTML += '<div class="dados_grupo" id="div_grupo_' + id
        + '" ><p class="nome_grupo">Grupo ' + id + '<input class="deleta_grupo" id="deleta_grupo_' + id
        + '" type="submit" name="button" value="Excluir"/>'
        + '</p><p class="adicionar">Adicionar: <input class="adiciona_partes" id="adiciona_gerador_' + id
        + '" type="submit" name="button" value="Gerador"/><input class="adiciona_partes" id="adiciona_barramento_' + id
        + '" type="submit" name="button" value="Barramento"/><input class="adiciona_partes" id="adiciona_carga_' + id
        + '" type="submit" name="button" value="Carga"/></p></div>'


}

/**
 * Adiciona Item ao Grupo, "gerador" "barramento" "carga"
 * @method adiconaItemGrupo
 * @param {number} idGrupo 
 * @param {string} item 
 */
function adicionaItemGrupo(event) {
    let idGrupo = event.currentTarget.parametro[0];
    let item = event.currentTarget.parametro[1];
    let ele = document.getElementById('div_grupo_' + idGrupo);
    let idArrayGrupo = getIdArrayGrupo(idGrupo);
    let idItem = getNewPartesId(idGrupo);
    let idArrayItem = grupos[idArrayGrupo].partes.length;
    switch (item) {
        case 'gerador': {
            grupos[idArrayGrupo].partes[idArrayItem] = new Gerador(idItem * 300, -(idGrupo) * 500, idItem);

            ele.innerHTML += '<p class="item_grupo" id="item_'+idItem+'_grupo_'+idGrupo+'">'
                + idItem + ' - ' + grupos[idArrayGrupo].partes[idArrayItem].type + '<input class="exclui_partes" id="exclui_partes_'+idItem+'_'+idGrupo+'" type="submit" name="button" value="X"/></p>'
            break;
        }
        case 'barramento': {
            grupos[idArrayGrupo].partes[grupos[idArrayGrupo].partes.length] = new Barramento(idItem * 300, -(idGrupo) * 500, idItem);

            ele.innerHTML += '<p class="item_grupo" id="item_'+idItem+'_grupo_'+idGrupo+'">'
                + idItem + ' - ' + grupos[idArrayGrupo].partes[idArrayItem].type + '<input class="exclui_partes" id="exclui_partes_'+idItem+'_'+idGrupo+'" type="submit" name="button" value="X"/></p>'
            break;
        }
        case 'carga': {
            grupos[idArrayGrupo].partes[grupos[idArrayGrupo].partes.length] = new Carga(idItem * 300, -(idGrupo) * 500, idItem);

            ele.innerHTML += '<p class="item_grupo" id="item_'+idItem+'_grupo_'+idGrupo+'">'
                + idItem + ' - ' + grupos[idArrayGrupo].partes[idArrayItem].type + '<input class="exclui_partes" id="exclui_partes_'+idItem+'_'+idGrupo+'" type="submit" name="button" value="X"/></p>'

            break;
        }
    }
    return;
}
/**
 * Converte o ID do grupo para o ID do array correspondente
 * @param {number} idGrupo 
 * @returns ID array grupo
 */
function getIdArrayGrupo(idGrupo) {
    for (let element in grupos) {
        if (grupos[element].id == idGrupo) {
            return element;
        }
    }
    return;
}

/**
 * Converte o ID da parte para o ID do array correspondente
 * @param {number} idParte 
 * @param {number} idGrupo
 * @returns ID array parte
 */
function getIdArrayParte(idParte,idGrupo) {
    for (let element in grupos[getIdArrayGrupo(idGrupo)].partes) {
        if (grupos[getIdArrayGrupo(idGrupo)].partes[element].id == idParte) {
            return element;
        }
    }
    return;
}



/**
 * Pega o próximo ID livre na array grupos.
 * @returns próximo ID livre na array grupos
 */
function getNewGrupoId() {
    let ids = [-1];
    for (let i = 0; i < grupos.length; i++) {
        if (grupos[i].id > Math.max.apply(null, ids)) {
            ids.push(grupos[i].id)
        }
    }
    return Math.max.apply(null, ids) + 1;
}

/**
 * Pega o próximo ID livre na array partes.
 * @returns próximo ID livre na array partes
 */
function getNewPartesId(idGrupo) {
    let encontrado = false;
    let idProcurado = 0;
    while(encontrado==false){
        let teste=false;
        for(let elemento in grupos[getIdArrayGrupo(idGrupo)].partes){
            if(grupos[getIdArrayGrupo(idGrupo)].partes[elemento].id==idProcurado){
                teste=true;
            }           
        }
        if(teste){
            idProcurado++;
        }
        if(teste==false){
            encontrado=true;
        }
    }
    return idProcurado;
     /*
    let ids = [-1];
    for (let i = 0; i < grupos[getIdArrayGrupo(idGrupo)].partes.length; i++) {
        if (grupos[getIdArrayGrupo(idGrupo)].partes[i].id > Math.max.apply(null, ids)) {
            ids.push(grupos[getIdArrayGrupo(idGrupo)].partes[i].id)
        }
    }
    return Math.max.apply(null, ids) + 1;
    */
}

/**
 * Deleta um item do grupo utilizando parametro interno do botão
 * @param {*} event 
 */
function deletaGrupo(event) {
    let idGrupo = event.currentTarget.parametro;
    let idArrayGrupo = getIdArrayGrupo(idGrupo);
    grupos[idArrayGrupo].removeWorld();
    grupos[idArrayGrupo] = null;
    grupos.splice(idArrayGrupo, 1);
    let ele = document.getElementById('div_grupo_' + idGrupo);
    ele.remove();
}

/**
 * Deleta uma parte de um grupo utilizando parametro interno do botão
 * @param {*} event 
 */
function deletaParte(event) {
    let id = event.currentTarget.parametro;
    let idArrayGrupo = getIdArrayGrupo(id[0]);
    let idArrayParte = getIdArrayParte(id[1],id[0]);
    grupos[idArrayGrupo].partes[idArrayParte].removeWorld();
    grupos[idArrayGrupo].partes[idArrayParte] = null;
    grupos[idArrayGrupo].partes.splice(idArrayParte, 1);
    let ele = document.getElementById('item_'+id[1]+'_grupo_' + id[0]);
    ele.remove();
}

/**
 * Calcula média da posição Y do foco da camera com Base nos grupos existentes
 * @returns média do foco Y da camera
 */
function calculaMediaYFoco() {
    if (grupos.length > 0) {
        let yMin = grupos[0].id * 500;
        let yMax = grupos[grupos.length - 1].id * 500;
        let yMedio = -(yMin + yMax) / 2
        return yMedio;
    }
    return 0;

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
    },
    zomm: 1200, // Valor inicial do Zoom ( quanto maior, mais distante)
    att: function () {
        this.mouseDrag.lerp();
        this.posicao.x = this.zomm * sin(this.mouseDrag.drag_value_lerp[0] / 100);
        this.posicao.y = calculaMediaYFoco() + 10 * this.mouseDrag.drag_value_lerp[1];
        this.posicao.z = this.zomm * cos(this.mouseDrag.drag_value_lerp[0] / 100);
        this.foco.x = 300;
        this.foco.y = calculaMediaYFoco();
        this.foco.z = 0;
    },
    run: function (layer) {
        this.att();
        layer.camera(
            this.posicao.x,
            this.posicao.y,
            this.posicao.z,
            this.foco.x,
            this.foco.y,
            this.foco.z
        )
    },
    attZoom: function (event) {
        this.zomm += event.delta;
        this.zomm = Math.max(Math.min(3000, this.zomm), 100);
    },
    mouseDrag: {
        mouseTemp: [],
        drag_value: [],
        drag_total_value: [-25, -62],
        drag_total_value_temp: [-25, -62],
        drag_value_lerp: [100, -10],
        att: function () {
            this.drag_value = [-mouseX + this.mouseTemp[0], -mouseY + this.mouseTemp[1]];
            this.drag_total_value[0] = this.drag_total_value_temp[0] + 0.005 * this.drag_value[0];
            this.drag_total_value[1] = this.drag_total_value_temp[1] + 0.005 * this.drag_value[1];
            this.drag_total_value[1] = Math.max(Math.min(1000, this.drag_total_value[1]), -1000);
        },
        reset: function () {
            this.drag_total_value_temp = this.drag_total_value;
        },
        set: function () {
            this.mouseTemp = [mouseX, mouseY];
        },
        lerp: function () {
            if (Math.abs(this.drag_total_value[0] - this.drag_value_lerp[0]) > 1.5) {
                this.drag_value_lerp[0] = lerp(this.drag_value_lerp[0], this.drag_total_value[0], 0.1);
            } else {
                this.drag_value_lerp[0] = this.drag_total_value[0];
            }
            if (Math.abs(this.drag_total_value[1] - this.drag_value_lerp[1]) > 1.5) {
                this.drag_value_lerp[1] = lerp(this.drag_value_lerp[1], this.drag_total_value[1], 0.15);
            } else {
                this.drag_value_lerp[1] = this.drag_total_value[1];
            }
        },
    },
};

