/**
 * Classe para criar um objeto do tipo gerador. 
 * @class Gerador
 */
class Gerador {
    /**
    * Define o Gerador
    * @method constructor
    * @param {number} xPosition
    * @param {number} yPosition
    */
    constructor(xPosition, yPosition) {
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
};

/**
 * Classe para criar um objeto do tipo barramento elétrico
 * @class Barramento
 * @param {number} xPosition
 * @param {number} yPosition
 */
class Barramento {
    constructor(xPosition, yPosition) {
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
    };
    /**
    * Desenha o barramento
    * @method draw
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
    * @method addWorld
    */
    addWorld() {
        Matter.World.add(engine.world, [this.pontoFixo, this.body]);
    }
};


/**
 * Classe para criar um objeto do tipo barramento carga 
 * @class Carga
 * @param {number} xPosition
 * @param {number} yPosition
 */
class Carga {
    constructor(xPosition, yPosition) {
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
    };
    /**
    * Desenha a carga
    * @method draw
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
    * @method addWorld
    */
    addWorld() {
        Matter.World.add(engine.world, [this.pontoFixo, this.body]);
    }
};

/**
 * Classe para criar rede de transmissão entre dois barramentos 
 * @class Transmissao
 */
class Transmissao {
    /**
     * Infome os dois barramentos que deseja conectar e o valor da condutância ( máximo 1 )
     * @method constructor
     * @param {Barramento} barrA
     * @param {Barramento} barrB
     * @param {number <= 1} condutividade
     */
    constructor(barrA, barrB, condutividade) {
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
    }
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
}
/**
 * Classe para criar um grupo de objetos
 * @class Grupo
 */
 class Grupo{
    /** Constroe Grupo, forncer o tamanho do array que irá possuir esse grupo
     * @method constructor
     * @param {number} length
     */
    constructor(length){
        this.id=length;
        this.ativo=true;
        this.partes=[];
    }
    draw(){
        for (let element in this.partes){
            this.partes[element].draw();
        }
    }
 }

 function novoGrupo(){
    grupos[grupos.length]=new Grupo(grupos.length);
    grupos[grupos.length-1].partes[0]=new Gerador(0,-(grupos.length-1)*500);
    grupos[grupos.length-1].partes[0].addWorld();
 }
