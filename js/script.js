const NUM_COL = 90;
const NUM_ROW = 70;
const TAM = 10;

let ctx = canvas.getContext('2d');
let matriz  = new Array();
let activo = false;

class Cell {
    constructor(x, y, width, height, state, color){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.state = state;
        this.color = color;
    }

    printCell(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

  

}


const inicializarArray = () => {
    let x = 0;
    let y = 0;
    for(let i=0; i<NUM_ROW; i++){
            let filaMatriz = new Array();
        for(let j=0; j<NUM_COL; j++){
            let cell = new Cell(x, y, TAM, TAM, '0', 'grey');
            filaMatriz.push(cell);
            x+=10;
        }
        matriz.push(filaMatriz);
        y+=10;
        x=0;
    }
};

const printMatriz = () => {
    for(let i=0; i<NUM_ROW; i++){
        for(let j=0; j<NUM_COL; j++){
            matriz[i][j].printCell();
        }
    }
};


canvas.addEventListener('click', (e) => {

    const posicion = canvas.getBoundingClientRect();

    const x = e.clientX - posicion.x;
    const y = e.clientY - posicion.y;
    
    for(let i=0; i<NUM_ROW; i++){
        for(let j=0; j<NUM_COL; j++){
            const cell = matriz[i][j];
            if(isInRect(x, y, cell)) {
                if(cell.state == 0){
                    cell.color = 'white';
                    cell.state = 1;
                }else{
                    cell.color = 'grey';
                    cell.state = 0;
                }
                cell.printCell();
                matriz[i][j]=cell;
                break;
            }
        }
    }
});

const isInRect = (x, y, cell) =>{
    if( x > cell.x && x < (cell.x + TAM) && y > cell.y && y < (cell.y + TAM) ) 
        return true;
        else 
        return false;
    }

const estadoAleatorio = () => {
    
    for(let i=0; i<NUM_ROW; i++){
        for(let j=0; j<NUM_COL; j++){
            const ran  = Math.floor(Math.random()*2);
            if(ran===1){
                matriz[i][j].color = 'white';
                matriz[i][j].state = 1;
            }else{
                matriz[i][j].color = 'grey';
                matriz[i][j].state = 0;
            }
        }
    }
    printMatriz();
    
}

const nuevaGeneracion = () =>{
    for(let i=0; i<NUM_ROW; i++){
        for(let j=0; j<NUM_COL; j++){
            if(matriz[i][j].state == 2){
                matriz[i][j].state  = 0;
                matriz[i][j].color  = 'grey';
            }else if (matriz[i][j].state == -1){
                matriz[i][j].state  = 1;
                matriz[i][j].color  = 'white';
            }
        }
    }
};

const juegoDeLaVida = () => {
    
     activo = true;
     const interval = setInterval(() => {

        if(!activo) clearInterval(interval);
        
        for(let i=0; i<NUM_ROW; i++){
                for(let j=0; j<NUM_COL; j++){
                    if(matriz[i][j].state == 1){
                        if(celulasVivasAlrederor(i, j)<2 || 
                            celulasVivasAlrederor(i, j)>3){
                                matriz[i][j].state = 2;   
                        }
                    }else {

                        if(celulasVivasAlrederor(i, j)==3){
                            matriz[i][j].state = -1;
                    }
                }
            }
        }
        
        nuevaGeneracion();
        printMatriz();
    } , 200);
}

const celulasVivasAlrederor= (i, j) => {
    
    let vivasAlrededor = 0;
    
    if(i-1>=0) //arriba
    if(matriz[i-1][j].state>0){
            vivasAlrededor++;
            
        } 
        
    if( i+1<NUM_ROW) //abajo
    if(matriz[i+1][j].state>0){
            vivasAlrededor++;
            
        } 
        if( j+1<NUM_COL) //derecha
        if(matriz[i][j+1].state>0 ){
            vivasAlrededor++;
           
        } 

        if( j-1>=0) //izquierda
        if(matriz[i][j-1].state>0 ){
            vivasAlrededor++;
            
        } 
        if(j-1>=0 && i-1>=0) //arriba izquierda
        if(matriz[i-1][j-1].state>0){
            vivasAlrededor++;
            
        } 
        
    if( i-1>=0 && j+1<NUM_COL) //arriba derecha
    if(matriz[i-1][j+1].state>0){
            vivasAlrededor++;
            
        } 
        if( i+1<NUM_ROW && j-1>=0) //abajo izquierda
        if(matriz[i+1][j-1].state>0){
            vivasAlrededor++;
            
        } 
    if( i+1<NUM_ROW && j+1<NUM_COL) //abajo derecha
         if(matriz[i+1][j+1].state>0){
             vivasAlrededor++;
           
            } 
            return vivasAlrededor;
}


const stop1 = () =>{
    activo = false;

};

stopInterval.addEventListener('click',  stop1);
random.addEventListener('click', estadoAleatorio);

start.addEventListener('click', juegoDeLaVida);


inicializarArray();

printMatriz();


