const NUM_COL = 100;
const NUM_ROW = 70;
const TAM = 10;


let ctx = canvas.getContext('2d');

// ctx.fillStyle = 'black';
// ctx.fillRect(0,0, 1000, 700);
// ctx.fillStyle = 'black';
// ctx.fillRect(0,0,10,10);
// ctx.strokeStyle = 'white';
// ctx.strokeRect(0,0,10,10);

class Cell {
    constructor(x, y, width, height, estate, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.estate = estate;
        this.color = color;
    }

    printCell(ctx){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

}

const matriz  = new Array();

const inicializarArray = () => {
    let x = 0;
    let y = 0;
    for(let i=0; i<NUM_COL; i++){
            const filaMatriz = new Array(;
        for(let j=0; j<NUM_ROW; j++){
            const cell = new Cell(x, y, TAM, TAM, 0, 'black');
            filaMatriz.push(cell);
            x+=10;
        }
        matriz.push(filaMatriz);
        y+=10;
        x=0;
    }
};

const printMatriz = () => {
    for(let i=0; i<NUM_COL; i++){
        for(let j=0; j<NUM_ROW; j++){
            matriz[i][j].printCell();
        }
    }
};

inicializarArray();
printMatriz();


